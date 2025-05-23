export function generateNthTermSequenceProblem()
{
    const types = ["Arithmetic", "Geometric"];
    const type = types[Math.floor(Math.random() * types.length)];
    const questions = ["nth term given two other terms", "nth term given a and d", "nth term given one term and d"]
    const question = questions[Math.floor(Math.random() * questions.length)];
    const a = Math.floor(Math.random() * 41) - 20; 
    const n = Math.floor(Math.random() * 30) + 1;
    let r = 0;
    while (r === 0) 
    {
        r = Math.floor(Math.random() * 11) - 5; 
    }
    let answer = 0;

    const q = Math.floor(Math.random()) + 1;
    if(type == "Arithmetic")
    {
        answer = a + (n - 1) * r;
        if(question == "nth term given two other terms")
        {
            let termOne = n;
            let termTwo = n;
            while(termOne == n || termTwo == n)
            {
                termOne = Math.floor(Math.random() * 30) + 1;
                termTwo = Math.floor(Math.random() * 30) + 1;
            }
            if(q == 1)
            {
                return {
                    question: `What term is ${answer} in the arithmetic sequence with ${termOne}th term ${a + (termOne - 1) * r} and ${termTwo}th term ${a + (termTwo - 1) * r}?`,
                    answer: n
                };
            }
            else
            {
                return {
                    question: `What is the ${n}th term of the arithmetic sequence with ${termOne}th term ${a + (termOne - 1) * r} and ${termTwo}th term ${a + (termTwo - 1) * r}?`,
                    answer: answer
                };
            }
            
        }
        else if(question == "nth term given a and d")
        {
            if(q == 1)
            {
                return {
                    question: `What term is ${answer} in the arithmetic sequence with first term ${a} and common difference ${r}?`,
                    answer: n
                };
            }
            else
            {
                return {
                    question: `What is the ${n}th term of the arithmetic sequence with first term ${a} and common difference ${r}?`,
                    answer: answer
                };
            }
        }
        else if(question == "nth term given one term and d")
        {
            let term = n;
            while(term == n)
            {
                term = Math.floor(Math.random() * 30) + 1;
            }
            if(q == 1)
            {
                return {
                    question: `What term is ${answer} in the arithmetic sequence with ${term}th term ${a + (term - 1) * r} and common difference ${r}?`,
                    answer: n
                };
            }
            else
            {
                return {
                    question: `What is the ${n}th term of the arithmetic sequence with ${term}th term ${a + (term - 1) * r} and common difference ${r}?`,
                    answer: answer
                };
            }
        }
    }

    else if(type == "Geometric")
    {
        answer = a * Math.pow(r, n - 1);
        if(question == "nth term given two other terms")
        {
            let termOne = n;
            let termTwo = n;
            while(termOne == n || termTwo == n)
            {
                termOne = Math.floor(Math.random() * 30) + 1;
                termTwo = Math.floor(Math.random() * 30) + 1;
            }
            if(q == 1)
            {
                return {
                    question: `What term is ${answer} in the geometric sequence with ${termOne}th term ${a * Math.pow(r, termOne - 1)} and ${termTwo}th term ${a * Math.pow(r, termTwo - 1)}?`,
                    answer: n
                };
            }
            else
            {
                return {
                    question: `What is the ${n}th term of the geometric sequence with ${termOne}th term ${a * Math.pow(r, termOne - 1)} and ${termTwo}th term ${a * Math.pow(r, termTwo - 1)}?`,
                    answer: answer
                };
            }
        }
        else if(question == "nth term given a and d")
        {
            if(q == 1)
            {
                return {
                    question: `What term is ${answer} in the geometric sequence with first term ${a} and common ratio ${r}?`,
                    answer: n
                };
            }
            else
            {
                return {
                    question: `What is the ${n}th term of the geometric sequence with first term ${a} and common ratio ${r}?`,
                    answer: answer
                };
            }
        }
        else if(question == "nth term given one term and d")
        {
            let term = n;
            while(term == n)
            {
                term = Math.floor(Math.random() * 30) + 1;
            }
            if(q == 1)
            {
                return {
                    question: `What term is ${answer} in the geometric sequence with ${term}th term ${a * Math.pow(r, term - 1)} and common ratio ${r}?`,
                    answer: n
                };
            }
            else
            {
                return {
                    question: `What is the ${n}th term of the geometric sequence with ${term}th term ${a * Math.pow(r, term - 1)} and common ratio ${r}?`,
                    answer: answer
                };
            }
        }

    }
}

export function generateMeanMedianModeRangeVarianceStdDev()
{
    const dataSet = [];
    const dataSetLength = Math.floor(Math.random() * 6) + 5;
    for(let i = 0; i < dataSetLength; i++)
    {
        dataSet.push(Math.floor(Math.random() * 201) - 100);
    }
    const questions = ["mean", "median", "range", "variance", "standard deviation"];
    const question = questions[Math.floor(Math.random() * questions.length)];
    let answer = 0;
    if(question == "mean")
    {
        for(let i = 0; i < dataSet.length; i++)
        {
            answer += dataSet[i];
        }
        answer /= dataSet.length;
    }
    else if(question == "median")
    {
        dataSet.sort((a, b) => a - b);
        if(dataSet.length % 2 == 0)
        {
            answer = (dataSet[dataSet.length / 2] + dataSet[dataSet.length / 2 - 1]) / 2;
        }
        else
        {
            answer = dataSet[Math.floor(dataSet.length / 2)];
        }
    }
    else if(question == "mode")
    {
        let modeMap = {};
        let maxCount = 0;
        for(let i = 0; i < dataSet.length; i++)
        {
            const num = dataSet[i];
            modeMap[num] = (modeMap[num] || 0) + 1;
            if(modeMap[num] > maxCount)
            {
                maxCount = modeMap[num];
                answer = num;
            }
        }
    }
    else if(question == "range")
    {
        const min = Math.min(...dataSet);
        const max = Math.max(...dataSet);
        answer = max - min;
    }
    else if(question == "variance")
    {
        const mean = dataSet.reduce((acc, val) => acc + val, 0) / dataSet.length;
        answer = dataSet.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / dataSet.length;
    }
    else if(question == "standard deviation")
    {
        const mean = dataSet.reduce((acc, val) => acc + val, 0) / dataSet.length;
        const variance = dataSet.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / dataSet.length;
        answer = Math.sqrt(variance);
    }

    return{
        question: `What is the ${question} of the data set ${dataSet.join(", ")}?`,
        answer: answer.toFixed(3) 

    }
}

export function generateExpectedValueVarianceStdDev()
{
    let dataSet = [];
    const dataSetLength = Math.floor(Math.random() * 6) + 5;
    for(let i = 0; i < dataSetLength; i++)
    {
        dataSet.push(Math.floor(Math.random() * 201) - 100);
    }
    let probabilities = [];
    let sum = 0;
    probabilities = generateNumbersThatSumToTarget(dataSetLength);

    for(let i = 0; i < dataSetLength; i++)
    {
        probabilities[i] /= 20;
    }
    
    const questions = ["expected value", "variance", "standard deviation"];
    const question = questions[Math.floor(Math.random() * questions.length)];
    let answer = 0;
    if(question == "expected value")
    {
        for(let i = 0; i < dataSet.length; i++)
        {
            answer += dataSet[i] * probabilities[i];
        }
    }
    else if(question == "variance")
    {
        const mean = dataSet.reduce((acc, val) => acc + val * probabilities[dataSet.indexOf(val)], 0);
        answer = dataSet.reduce((acc, val) => acc + Math.pow(val - mean, 2) * probabilities[dataSet.indexOf(val)], 0);
    }

    else if(question == "standard deviation")
    {
        const mean = dataSet.reduce((acc, val) => acc + val * probabilities[dataSet.indexOf(val)], 0);
        const variance = dataSet.reduce((acc, val) => acc + Math.pow(val - mean, 2) * probabilities[dataSet.indexOf(val)], 0);
        answer = Math.sqrt(variance);
    }

    return{
        question: `What is the ${question} of the data set ${dataSet.join(", ")} with probabilities ${probabilities.join(", ")}?`,
        answer: answer.toFixed(3) 
    }
}

function generateNumbersThatSumToTarget(n) 
{
    const cuts = new Set();
    while (cuts.size < n - 1) {
        cuts.add(Math.floor(Math.random() * (20 - 1)) + 1);
    }

    const sortedCuts = Array.from(cuts).sort((a, b) => a - b);

    const parts = [];
    let prev = 0;
    for (const cut of sortedCuts) {
        parts.push(cut - prev);
        prev = cut;
    }
    parts.push(20 - prev); 

    return parts;    
}
  


