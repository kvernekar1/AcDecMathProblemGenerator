import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const problemsPath = path.join(__dirname, 'problems.json');
const problemsPath2 = path.join(__dirname, 'problems2.json');
const problemsPath3 = path.join(__dirname, 'problems3.json');
const problemsPath4 = path.join(__dirname, 'problems4.json');

function loadProblems() {
  const data = fs.readFileSync(problemsPath, 'utf8');
  return JSON.parse(data);
}

function loadProblems2() {
  const data = fs.readFileSync(problemsPath2, 'utf8');
  return JSON.parse(data);
}

function loadProblems3() {
  const data = fs.readFileSync(problemsPath3, 'utf8');
  return JSON.parse(data);
}

function loadProblems4() {
  const data = fs.readFileSync(problemsPath4, 'utf8');
  return JSON.parse(data);
}

function saveProblems(problems) {
  fs.writeFileSync(problemsPath, JSON.stringify(problems, null, 2));
}

function saveProblems2(problems) {
  fs.writeFileSync(problemsPath2, JSON.stringify(problems, null, 2));
}

function saveProblems3(problems) {
  fs.writeFileSync(problemsPath3, JSON.stringify(problems, null, 2));
}

function saveProblems4(problems) {
  fs.writeFileSync(problemsPath4, JSON.stringify(problems, null, 2));
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
  console.log('Received request to generate problem');
  try {
    let problems = loadProblems();

    if (problems.length === 0) {
      await regenerateProblems();
      problems = loadProblems();
      if (problems.length === 0) {
        return res.status(500).json({ message: 'No problems available after regeneration.' });
      }
    }

    const problem = problems.shift();

    saveProblems(problems);

    if (problems.length < 100) {
      console.log('Less than 100 problems left, regenerating...');
      regenerateProblems().catch(err => {
        console.error('Failed to regenerate problems:', err);
      });
    }

    res.json(problem);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error generating problem.' });
  }
});


app.post('/generate-problem2', async (req, res) => {
  console.log('Received request to generate problem');
  try {
    let problems = loadProblems2();

    if (problems.length === 0) {
      await regenerateProblems();
      problems = loadProblems2();
      if (problems.length === 0) {
        return res.status(500).json({ message: 'No problems available after regeneration.' });
      }
    }

    const problem = problems.shift();

    saveProblems2(problems);

    if (problems.length < 100) {
      console.log('Less than 100 problems left, regenerating...');
      regenerateProblems().catch(err => {
        console.error('Failed to regenerate problems:', err);
      });
    }

    res.json(problem);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error generating problem.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post('/generate-problem3', async (req, res) => {
  console.log('Received request to generate problem');
  try {
    let problems = loadProblems3();

    if (problems.length === 0) {
      await regenerateProblems();
      problems = loadProblems3();
      if (problems.length === 0) {
        return res.status(500).json({ message: 'No problems available after regeneration.' });
      }
    }

    const problem = problems.shift();

    saveProblems3(problems);

    if (problems.length < 100) {
      console.log('Less than 100 problems left, regenerating...');
      regenerateProblems().catch(err => {
        console.error('Failed to regenerate problems:', err);
      });
    }

    res.json(problem);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error generating problem.' });
  }
});

app.post('/generate-problem4', async (req, res) => {
  console.log('Received request to generate problem');
  try {
    let problems = loadProblems4();

    if (problems.length === 0) {
      await regenerateProblems();
      problems = loadProblems4();
      if (problems.length === 0) {
        return res.status(500).json({ message: 'No problems available after regeneration.' });
      }
    }

    const problem = problems.shift();

    saveProblems4(problems);

    if (problems.length < 100) {
      console.log('Less than 100 problems left, regenerating...');
      regenerateProblems().catch(err => {
        console.error('Failed to regenerate problems:', err);
      });
    }

    res.json(problem);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error generating problem.' });
  }
});

