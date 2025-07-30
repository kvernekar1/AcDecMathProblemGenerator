export async function generateEquationProblem() {
  try {
    const response = await fetch('/generate-problem1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Failed to get problem: ${response.status}`);
    }

    const problem = await response.json();

    return {
        question: problem.question,
        A: problem.A,
        B: problem.B,
        C: problem.C,
        D: problem.D,
        E: problem.E,
        answer: problem.answer,
        explanation: problem.explanation || "No explanation available."
    };

  } catch (error) {
    console.error('Error fetching problem:', error);
    throw error;
  }
}

export async function generateCoordinateGeometryProblem()
{
    try {
    const response = await fetch('/generate-problem2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Failed to get problem: ${response.status}`);
    }

    const problem = await response.json();

    return {
        question: problem.question,
        A: problem.A,
        B: problem.B,
        C: problem.C,
        D: problem.D,
        E: problem.E,
        answer: problem.answer,
        explanation: problem.explanation || "No explanation available."
    };

  } catch (error) {
    console.error('Error fetching problem:', error);
    throw error;
  }
}

export async function generateTrigonometryProblem()
{
    try {
        const response = await fetch('/generate-problem3', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Failed to get problem: ${response.status}`);
        }

        const problem = await response.json();

        return {
            question: problem.question,
            A: problem.A,
            B: problem.B,
            C: problem.C,
            D: problem.D,
            E: problem.E,
            answer: problem.answer,
            explanation: problem.explanation || "No explanation available."
        };

    } catch (error) {
        console.error('Error fetching problem:', error);
        throw error;
    }
}

export async function generateFunctionProblem()
{
    try {
        const response = await fetch('/generate-problem4', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(`Failed to get problem: ${response.status}`);
        }
        const problem = await response.json();
        return {
            question: problem.question,
            A: problem.A,
            B: problem.B,
            C: problem.C,
            D: problem.D,
            E: problem.E,
            answer: problem.answer,
            explanation: problem.explanation || "No explanation available."
        };
    } catch (error) {
        console.error('Error fetching problem:', error);
        throw error;
    }
}
