import { GoogleGenAI } from "@google/genai"
import { Pool } from 'pg'
import dotenv from 'dotenv'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'

dotenv.config();

const art = await new PDFLoader('Art-Resource-Guide.pdf').load();

let ai = new GoogleGenAI({apiKey: process.env.API_KEY});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const client = await pool.connect();

const promptTemplate = `
You are an expert at generating Academic Decathlon tests, particularly for the {subject} subject.
Your task: create {questions} multiple-choice questions strictly based on the content below:
---
{context}
---
Guidelines:
- Be specific and factually grounded in the provided content only.
- You may include roman numeral multiple-choice questions when appropriate.
- Provide five options labeled A, B, C, D, E. Only one option should be correct.
- Make sure these questions are challenging and are relevant to the subject matter.
- Don't ask questions about content not present in the provided text or anything related to how this guide was created.
- Return ONLY valid JSON (no markdown fences). The output must be a JSON array of objects with these keys:
    question, a, b, c, d, e, answer, explanation.

Example (structure only):
[
    {{
        "question": "...",
        "a": "...",
        "b": "...",
        "c": "...",
        "d": "...",
        "e": "...",
        "answer": "A",
        "explanation": "..."
    }}
]

There must be NOTHING before and after the json, so no \`\`\`json should be there at all.
`;

let page = 1;
let section = 1;

for (const chunk of art) {
  if (page > 114) {
    break;
  }
  if (page < 6) {
    page++;
    continue;
  }
  if (page >= 103) {
    section = 5;
  } else if (page >= 86) {
    section = 4;
  } else if (page >= 65) {
    section = 3;
  } else if (page >= 48) {
    section = 2;
  }

  const contextText = chunk.pageContent || chunk.toString();
  
  const prompt = promptTemplate
    .replace('{subject}', 'Art')
    .replace('{questions}', '30')
    .replace('{context}', contextText);

    try {
        const model = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        temperature: 0.3,
        contents: prompt
    });

    const responseText = model.text.substring(model.text.indexOf('['), model.text.lastIndexOf(']') + 1).trim();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.log("Failed to parse JSON from model response:");
      continue;
    }

    if (typeof data === 'object' && !Array.isArray(data)) {
      data = [data];
    }
    if (!Array.isArray(data)) {
      console.log("Unexpected JSON structure, skipping chunk");
      continue;
    }

    const rows = [];
    for (const item of data) {
      const q = item.question;
      const a = item.a;
      const b = item.b;
      const c = item.c;
      const d = item.d;
      const e = item.e;
      const ans = item.answer;
      const expl = item.explanation || '';
      
      if (!q || !ans) {
        continue;
      }
      rows.push([q, a, b, c, d, e, ans, expl, 'Art', section]);
    }

    if (rows.length > 0) {
      for (const row of rows) {
        await client.query(
          `INSERT INTO questions (question, a, b, c, d, e, answer, explanation, subject, section)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          row
        );
      }
      console.log(`Inserted ${rows.length} questions from a chunk.`);
    }
  } catch (error) {
    console.error('Error processing chunk:', error);
  }

  page++;
}

client.release();
console.log('Process completed.');