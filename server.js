import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to PostgreSQL database');
    release();
  }
});

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

app.get('*', (req, res) => 
{
  if (!req.path.startsWith('/generate-problem')) {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

async function getRandomProblem(tableName) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT question, a, b, c, d, e, answer, explanation FROM ${tableName} ORDER BY RANDOM() LIMIT 1`
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

async function getProblemsCount(tableName) {
  const client = await pool.connect();
  try {
    const result = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
    return parseInt(result.rows[0].count);
  } finally {
    client.release();
  }
}

function regenerateProblems() {
  return new Promise((resolve, reject) => {
    const subprocess = spawn('node', ['./src/generateProblems.js'], { cwd: __dirname });

    subprocess.stdout.on('data', data => {
      console.log(`${data}`);
    });

    subprocess.stderr.on('data', data => {
      console.error(`generateProblems stderr: ${data}`);
    });

    subprocess.on('close', code => {
      if (code === 0) {
        console.log('Problems regenerated successfully.');
        resolve();
      } else {
        reject(new Error(`generateProblems exited with code ${code}`));
      }
    });
  });
}

app.post('/generate-problem1', async (req, res) => {
  try {
    const count = await getProblemsCount('equations');
    
    if (count === 0) {
      await regenerateProblems();
      const newCount = await getProblemsCount('equations');
      
      if (newCount === 0) {
        return res.status(500).json({ message: 'No problems available after regeneration.' });
      }
    }

    const problem = await getRandomProblem('equations');
    
    if (!problem) {
      return res.status(500).json({ message: 'No problem found in equations table.' });
    }

    res.json(problem);

  } catch (error) {
    console.error('Error generating problem from equations:', error);
    res.status(500).json({ message: 'Server error generating problem.' });
  }
});


app.post('/generate-problem2', async (req, res) => {
  try {
    const count = await getProblemsCount('functions');
    
    if (count === 0) {
      await regenerateProblems();
      const newCount = await getProblemsCount('functions');
      
      if (newCount === 0) {
        return res.status(500).json({ message: 'No problems available after regeneration.' });
      }
    }

    const problem = await getRandomProblem('functions');
    
    if (!problem) {
      return res.status(500).json({ message: 'No problem found in functions table.' });
    }

    res.json(problem);

  } catch (error) {
    console.error('Error generating problem from functions:', error);
    res.status(500).json({ message: 'Server error generating problem.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post('/generate-problem3', async (req, res) => {
  try {
    const count = await getProblemsCount('geometry');
    
    if (count === 0) {
      await regenerateProblems();
      const newCount = await getProblemsCount('geometry');
      
      if (newCount === 0) {
        return res.status(500).json({ message: 'No problems available after regeneration.' });
      }
    }

    const problem = await getRandomProblem('geometry');
    
    if (!problem) {
      return res.status(500).json({ message: 'No problem found in geometry table.' });
    }

    res.json(problem);

  } catch (error) {
    console.error('Error generating problem from geometry:', error);
    res.status(500).json({ message: 'Server error generating problem.' });
  }
});

app.post('/generate-problem4', async (req, res) => {
  try {
    const count = await getProblemsCount('trigonometry');
    
    if (count === 0) {
      await regenerateProblems();
      const newCount = await getProblemsCount('trigonometry');
      
      if (newCount === 0) {
        return res.status(500).json({ message: 'No problems available after regeneration.' });
      }
    }

    const problem = await getRandomProblem('trigonometry');
    
    if (!problem) {
      return res.status(500).json({ message: 'No problem found in trigonometry table.' });
    }

    res.json(problem);

  } catch (error) {
    console.error('Error generating problem from trigonometry:', error);
    res.status(500).json({ message: 'Server error generating problem.' });
  }
});

