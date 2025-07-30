import { GoogleGenAI } from "@google/genai"
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
dotenv.config();
let ai = new GoogleGenAI({apiKey: process.env.API_KEY});

async function AIProblem() 
{
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        temperature: 0.3,
        contents: `Reminder: Respond with raw valid JSON only. Do not use any markdown formatting like \`\`\`json or \`\`\`.
        You are an expert at creating multiple-choice problems on the topic of linear, quadratic, logarithmic, exponential, radical, and rational functions AND linear and quadratic inequalities
        Generate 30 moderately hard different multiple-choice equations/inequalities consisting of only linear, quadratic, logarithmic, exponential, radical, and rational functions and constants AND linear and quadratic inequalities and constants. List the equation's real solutions(rounded to three decimal places), if it has any.
        3 problems must be about linear equation word problems, 3 problems must be about quadratic equation word problems, 3 problems must be about linear inequalities, 3 problems must be about quadratic inequalities, 3 problems must be about linear functions, 3 problems must be about quadratic functions, 3 problems must be about logarithmic functions, 3 problems must be about exponential functions, 3 problems must be about radical functions, and 3 problems must be about rational functions.
        Make sure that the problems in the json aren't grouped by type, but rather are randomly mixed together.
        Make sure to just provide the answer. Do not begin with "The answer is" or any other phrase.
        Include a thorough explanation of the answer.
        Avoid using latex or any other special characters.
        Keep explanations on a single line without line breaks or special formatting.
        Do not list problem number next to the problem.
        Additionally, make sure that you respond in a JSON format with the following structure:
        [
            {
                "question": "Solve the equation here",
                "A": "Choice A",
                "B": "Choice B",
                "C": "Choice C",
                "D": "Choice D",
                "E": "Choice E",
                "answer": "A, B, C, D, or E",
                "explanation": "Explanation of the answer"
            },
            {
                "question": "Solve the equation here",
                "A": "Choice A",
                "B": "Choice B",
                "C": "Choice C",
                "D": "Choice D",
                "E": "Choice E",
                "answer": "A, B, C, D, or E",
                "explanation": "Explanation of the answer"
            }
        ]`,
    });
    return response.text.substring(response.text.indexOf('['), response.text.lastIndexOf(']') + 1).trim();
}

async function AIProblem2() //Coordinate Geometry
{
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        temperature: 0.3,
        contents: `Reminder: Respond with raw valid JSON only. Do not use any markdown formatting like \`\`\`json or \`\`\`.
        You are an expert at creating multiple-choice problems on the topic of Geometry, especially those of parallelograms, circles, triangles, and lines.
        Generate 30 moderately hard non-word multiple-choice with 4 PLAUSIBLE DISTRACTOR CHOICES about parallelograms, circles, triangles, and lines that have only one definitive answer and must satisfy the following criteria:
        7-8 problems must be about parallelograms, 7-8 about circles, 7-8 about triangles, and 7-8 about lines.
        For each type of problem, use the following criteria:
        parallelograms: -finding 4th point of a parallelogram given 3 points \n -using the fact that the diagonals of the parallelogram bisect each other
        circles: -finding the radius of a circle given its equation \n -finding the center of a circle given its equation \n -finding the equation of a circle given its center and radius
        triangles: -finding the median/equation of a median of a triangle \n -finding the centroid of a triangle \n -finding the circumcenter of a triangle \n -using the fact that the centroid divides each median in a 2:1 ratio
        lines: -finding the point that is a fraction of the distance between two points
        Make sure that the problem is solvable and has a definitive answer. Round all answers to three decimal places, if applicable. 
        Include a thorough explanation of the answer.
        Make sure that the problems in the json aren't grouped by type, but rather are randomly mixed together.
        Make sure to just provide the answer. Do not begin with "The answer is" or any other phrase.
        Avoid using latex or any other special characters.
        Keep explanations on a single line without line breaks or special formatting.
        Do not list problem number next to the problem.
        Additionally, make sure that you respond in a JSON format with the following structure:
        [
            {
                "question": "Solve the equation here",
                "A": "Choice A",
                "B": "Choice B",
                "C": "Choice C",
                "D": "Choice D",
                "E": "Choice E",
                "answer": "A, B, C, D, or E",
                "explanation": "Explanation of the answer"
            },
            {
                "question": "Solve the equation here",
                "A": "Choice A",
                "B": "Choice B",
                "C": "Choice C",
                "D": "Choice D",
                "E": "Choice E",
                "answer": "A, B, C, D, or E",
                "explanation": "Explanation of the answer"
            }
        ]`,
    });
    return response.text.substring(response.text.indexOf('['), response.text.lastIndexOf(']') + 1).trim();
}

async function AIProblem3() //Trigonometry
{
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        temperature: 0.3,
        contents: `Reminder: Respond with raw valid JSON only. Do not use any markdown formatting like \`\`\`json or \`\`\`.
        You are an expert at creating multiple-choice problems on the topic of Trigonometry.
        Generate 30 moderately hard non-word multiple-choice problems with 4 PLAUSIBLE DISTRACTOR CHOICES about trigonometry that have only one definitive answer and must satisfy the following criteria:
        Each problem must be about one of the following topics:
        - using sum and difference formulas
        - using double angle formulas
        - using half angle formulas
        - using sum to product formulas
        - using product to sum formulas
        - using inverse trigonometric functions
        - solving an equation involving sine, cosine, tangent, cotangent, secant, and cosecant
        - solving a trigonometric equation
        - using law of sines
        - using law of cosines
        Make sure that the problem is solvable and has a definitive answer. Round all answers to three decimal places, if applicable. 
        Include a thorough explanation of the answer.
        Make sure that the problems in the json aren't grouped by type, but rather are randomly mixed together.
        Make sure to just provide the answer. Do not begin with "The answer is" or any other phrase.
        Avoid using latex or any other special characters.
        Keep explanations on a single line without line breaks or special formatting.
        Do not list problem number next to the problem.
        Additionally, make sure that you respond in a JSON format with the following structure:
        [
            {
                "question": "Solve the equation here",
                "A": "Choice A",
                "B": "Choice B",
                "C": "Choice C",
                "D": "Choice D",
                "E": "Choice E",
                "answer": "A, B, C, D, or E",
                "explanation": "Explanation of the answer"
            },
            {
                "question": "Solve the equation here",
                "A": "Choice A",
                "B": "Choice B",
                "C": "Choice C",
                "D": "Choice D",
                "E": "Choice E",
                "answer": "A, B, C, D, or E",
                "explanation": "Explanation of the answer"
            }
        ]`,
    });
    return response.text.substring(response.text.indexOf('['), response.text.lastIndexOf(']') + 1).trim();
}

async function AIProblem4() //Polynomials and Functions
{
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        temperature: 0.3,
        contents: `Reminder: Respond with raw valid JSON only. Do not use any markdown formatting like \`\`\`json or \`\`\`.
        You are an expert at creating multiple-choice problems on the topic of Polynomials, Polynomial Factoring, Complex Numbers, Functions, and Transformations of Functions.
        Generate 30 moderately hard non-word multiple-choice problems with 4 PLAUSIBLE DISTRACTOR CHOICES about Polynomials, Polynomial Factoring, Complex Numbers, Functions, and Transformations of Functions that have only one definitive answer and must satisfy the following criteria:
        6 problems must be about polynomials, 6 problems must be about polynomial factoring, 6 problems must be about complex numbers, 6 problems must be about functions, and 6 problems must be about transformations of functions.
        For each type of problem, use the following criteria:
        polynomials: -adding, subtracting, multiplying, and dividing polynomials
        polynomial factoring: -factoring polynomials using rational root theorem and factor theorem
        complex numbers: -adding, subtracting, multiplying, and dividing complex numbers
        functions:-finding the domain and range of functions \n -finding the inverse of a function
        transformations of functions: -shifting, stretching, and reflecting functions
        Make sure that the problem is solvable and has a definitive answer. Round all answers to three decimal places, if applicable. 
        Include a thorough explanation of the answer.
        Make sure that the problems in the json aren't grouped by type, but rather are randomly mixed together.
        Make sure to just provide the answer. Do not begin with "The answer is" or any other phrase.
        Avoid using latex or any other special characters.
        Keep explanations on a single line without line breaks or special formatting.
        Do not list problem number next to the problem.
        Additionally, make sure that you respond in a JSON format with the following structure:
        [
            {
                "question": "Solve the equation here",
                "A": "Choice A",
                "B": "Choice B",
                "C": "Choice C",
                "D": "Choice D",
                "E": "Choice E",
                "answer": "A, B, C, D, or E",
                "explanation": "Explanation of the answer"
            },
            {
                "question": "Solve the equation here",
                "A": "Choice A",
                "B": "Choice B",
                "C": "Choice C",
                "D": "Choice D",
                "E": "Choice E",
                "answer": "A, B, C, D, or E",
                "explanation": "Explanation of the answer"
            }
        ]`,
    });
    return response.text.substring(response.text.indexOf('['), response.text.lastIndexOf(']') + 1).trim();
}

for(let i = 0; i < 5; i++)
{
    try {
        const problem = await AIProblem();
        const questionBank = JSON.parse(problem);
        const filePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../problems.json');
        let existingProblems = [];
        try {
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                if (fileContent.trim()) {
                    existingProblems = JSON.parse(fileContent);
                }
            }
        } catch (error) {
            console.error('Error reading existing problems file:', error);
        }

        const combinedProblems = [...existingProblems, ...questionBank];

        fs.writeFileSync(
            filePath,
            JSON.stringify(combinedProblems, null, 2),
        );
        console.log(`Successfully generated and saved AIProblem batch ${i + 1}`);
    } catch (error) {
        console.error(`Failed to generate AIProblem batch ${i + 1}:`, error);
    }
}

for(let i = 0; i < 5; i++)
{
    try {
        const problem = await AIProblem2();
        const questionBank = JSON.parse(problem);
        const filePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../problems2.json');
        let existingProblems = [];
        try {
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                if (fileContent.trim()) {
                    existingProblems = JSON.parse(fileContent);
                }
            }
        } catch (error) {
            console.error('Error reading existing problems file:', error);
        }

        const combinedProblems = [...existingProblems, ...questionBank];

        fs.writeFileSync(
            filePath,
            JSON.stringify(combinedProblems, null, 2),
        );
        console.log(`Successfully generated and saved AIProblem2 batch ${i + 1}`);
    } catch (error) {
        console.error(`Failed to generate AIProblem2 batch ${i + 1}:`, error);
    }
}

ai = new GoogleGenAI({apiKey: process.env.API_KEY2});

for(let i = 0; i < 5; i++)
{
    try {
        const problem = await AIProblem3();
        const questionBank = JSON.parse(problem);
        const filePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../problems3.json');
        let existingProblems = [];
        try {
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                if (fileContent.trim()) {
                    existingProblems = JSON.parse(fileContent);
                }
            }
        } catch (error) {
            console.error('Error reading existing problems file:', error);
        }

        const combinedProblems = [...existingProblems, ...questionBank];

        fs.writeFileSync(
            filePath,
            JSON.stringify(combinedProblems, null, 2),
        );
        console.log(`Successfully generated and saved AIProblem3 batch ${i + 1}`);
    } catch (error) {
        console.error(`Failed to generate AIProblem3 batch ${i + 1}:`, error);
    }
}


for(let i = 0; i < 5; i++)
{
    try {
        const problem = await AIProblem4();
        const questionBank = JSON.parse(problem);
        const filePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../problems4.json');
        let existingProblems = [];
        try {
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                if (fileContent.trim()) {
                    existingProblems = JSON.parse(fileContent);
                }
            }
        } catch (error) {
            console.error('Error reading existing problems file:', error);
        }

        const combinedProblems = [...existingProblems, ...questionBank];

        fs.writeFileSync(
            filePath,
            JSON.stringify(combinedProblems, null, 2),
        );
        console.log(`Successfully generated and saved AIProblem4 batch ${i + 1}`);
    } catch (error) {
        console.error(`Failed to generate AIProblem4 batch ${i + 1}:`, error);
    }
}
console.log("Generation process completed. Check above logs for any failures.");