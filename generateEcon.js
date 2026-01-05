import { GoogleGenAI } from "@google/genai"
import { Pool } from 'pg'
import dotenv from 'dotenv'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'

dotenv.config();

const economics = await new PDFLoader('Economics-Resource-Guide.pdf').load();

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
- Since this is for the Economics subject, focus on topics such as economic theories, principles, market structures, influential economists, and significant economic events.
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
let section = 2;
const prompts = [];
const sections = [];

for (const chunk of economics) {
  if (page > 135) {
    break;
  }
  if (page < 10) {
    page++;
    continue;
  }
  if (page >= 112) {
    section = 4;
  } 
  else if (page >= 62) {
    section = 3;
  } 
  const contextText = chunk.pageContent || chunk.toString();
  
  const prompt = promptTemplate
    .replace('{subject}', 'Economics')
    .replace('{questions}', '30')
    .replace('{context}', contextText);

  prompts.push(prompt);
  sections.push(section);
  page++;
}

const requests = prompts.map((prompt) => ({
  contents: [
    {
      role: 'user',
      parts: [{ text: prompt }]
    }
  ],
}));

console.log(requests);

const model = await ai.batches.create({
    model: 'gemini-2.5-flash',
    src: requests,
    config: {
        displayName: 'Economics Test Generation Batch',
        temperature: 0.3
    }
});

console.log('Batch job created:', model.name);
let batchState;
while(true) 
{
    try 
    {
        const batchJob = await ai.batches.get({ name: model.name });

        if (batchJob.state === 'JOB_STATE_SUCCEEDED') 
        {
            console.log('Found completed batch:', batchJob.displayName);
            console.log(batchJob);

            console.log("Results are inline:");
            for (let i = 0; i < batchJob.dest.inlinedResponses.length; i++) 
            {
                const inlineResponse = batchJob.dest.inlinedResponses[i];
                let data;
                try 
                {
                    data = JSON.parse(inlineResponse.response.candidates[0].content.parts[0].text);
                } 

                catch (e) 
                {
                    console.log("Failed to parse JSON from model response:");
                    continue;
                }

                if (typeof data === 'object' && !Array.isArray(data)) 
                {
                    data = [data];
                }
                if (!Array.isArray(data)) 
                {
                    console.log("Unexpected JSON structure, skipping chunk");
                    continue;
                }

                const rows = [];
                for (const item of data) 
                {
                    const q = item.question;
                    const a = item.a;
                    const b = item.b;
                    const c = item.c;
                    const d = item.d;
                    const e = item.e;
                    const ans = item.answer;
                    const expl = item.explanation || '';

                    if (!q || !ans) 
                    {
                        continue;
                    }
                    rows.push([q, a, b, c, d, e, ans, expl, 'Music', sections[i]]);
                }

                if (rows.length > 0) 
                {
                    for (const row of rows) 
                    {
                        await client.query(
                            `INSERT INTO questions (question, a, b, c, d, e, answer, explanation, subject, section)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                            row
                        );
                    }
                    console.log(`Inserted ${rows.length} questions from a chunk.`);
                }
            } 
        }
        else 
        {
            console.log(`Job did not succeed. Final state: ${batchJob.state}`);
            if (batchJob.error) 
            {
                console.error(`Error: ${typeof batchJob.error === 'string' ? batchJob.error : batchJob.error.message || JSON.stringify(batchJob.error)}`);
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
        if(batchJob.state === 'JOB_STATE_SUCCEEDED' || batchJob.state === 'JOB_STATE_FAILED')
        {
            batchState = batchJob.state;
            break;
        }
    }
    
    catch (error) 
    {
        console.error(`An error occurred while processing job ${jobName}:`, error);
    }

}
if(batchState === 'JOB_STATE_SUCCEEDED')
{
    console.log('Batch job completed successfully.');
}
else
{
    console.log('Batch job failed.');
}

client.release();
console.log('Process completed.');