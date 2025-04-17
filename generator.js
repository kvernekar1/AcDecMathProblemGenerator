import { GoogleGenAI } from 'https://cdn.jsdelivr.net/npm/@google/genai@0.7.0/+esm'
        
const ai = new GoogleGenAI({apiKey: "AIzaSyCEc4hZrMP6mgUjwho0qu3Qth0ZxlfK2uk"})

export function generateNthTermSequenceProblem()
{
    const types = ["Arithmetic", "Geometric"];
    const type = types[Math.floor(Math.random() * types.length)];
    const questions = ["nth term given two other terms", "nth term given a and d", "nth term given one term and d"]
    const question = questions[Math.floor(Math.random() * questions.length)];
    const a = Math.floor(Math.random() * 41) - 20; 
    let n = Math.floor(Math.random() * 30) + 1;
    let r = 0;
    while (r === 0) 
    {
        r = (Math.floor(Math.random() * 41) - 20)/10.0;
    }
    let answer = 0;
    const q = Math.floor(Math.random()) + 1;
    if(type == "Arithmetic")
    {
        answer = smartRound(a + (n - 1) * r);
        if(question == "nth term given two other terms")
        {
            let termOne = n;
            let termTwo = n;
            while(termOne == n || termTwo == n)
            {
                termOne = Math.floor(Math.random() * 30) + 1;
                termTwo = Math.floor(Math.random() * 30) + 1;
            }
            const ans1 = smartRound(a + (termOne - 1) * r);
            const ans2 = smartRound(a + (termTwo - 1) * r);
            if(q == 1)
            {
                return {
                    question: `What term is ${answer} in the arithmetic sequence with ${termOne}th term ${ans1} and ${termTwo}th term ${ans2}?`,
                    answer: n
                };
            }
            else
            {
                return {
                    question: `What is the ${n}th term of the arithmetic sequence with ${termOne}th term ${ans1} and ${termTwo}th term ${ans2}?(Round to 3 decimal places)`,
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
                    question: `What is the ${n}th term of the arithmetic sequence with first term ${a} and common difference ${r}?(Round to 3 decimal places)`,
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
            const ans = smartRound(a + (term - 1) * r);
            if(q == 1)
            {
                return {
                    question: `What term is ${answer} in the arithmetic sequence with ${term}th term ${ans} and common difference ${r}?`,
                    answer: n
                };
            }
            else
            {
                return {
                    question: `What is the ${n}th term of the arithmetic sequence with ${term}th term ${ans} and common difference ${r}?(Round to 3 decimal places)`,
                    answer: answer
                };
            }
        }
    }

    else if(type == "Geometric")
    {
        n = Math.floor(Math.random() * 10) + 1;
        answer = smartRound(a * Math.pow(r, n - 1));
        if(question == "nth term given two other terms")
        {
            let termOne = n;
            let termTwo = n;
            while(termOne == n || termTwo == n || termOne == termTwo)
            {
                termOne = Math.floor(Math.random() * 10) + 1;
                termTwo = Math.floor(Math.random() * 10) + 1;
            }
            const ans1 = smartRound(a * Math.pow(r, termOne - 1));
            const ans2 = smartRound(a * Math.pow(r, termTwo - 1));
            if(q == 1)
            {
                return {
                    question: `What term is ${answer} in the geometric sequence with ${termOne}th term ${ans1} and ${termTwo}th term ${ans2}?`,
                    answer: n
                };
            }
            else
            {
                return {
                    question: `What is the ${n}th term of the geometric sequence with ${termOne}th term ${ans1} and ${termTwo}th term ${ans2}?(Round to 3 decimal places)`,
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
                    question: `What is the ${n}th term of the geometric sequence with first term ${a} and common ratio ${r}?(Round to 3 decimal places)`,
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
            const ans = smartRound(a * Math.pow(r, term - 1));
            if(q == 1)
            {
                return {
                    question: `What term is ${answer} in the geometric sequence with ${term}th term ${ans} and common ratio ${r}?`,
                    answer: n
                };
            }
            else
            {
                return {
                    question: `What is the ${n}th term of the geometric sequence with ${term}th term ${ans} and common ratio ${r}?(Round to 3 decimal places)`,
                    answer: answer
                };
            }
        }

    }
}

export function generateMeanMedianModeRangeVarianceStdDev()
{
    //make a data set that is between 5 and 10 numbers long and has values from -100 to 100
    const dataSet = [];
    const dataSetLength = Math.floor(Math.random() * 6) + 5;
    for(let i = 0; i < dataSetLength; i++)
    {
        dataSet.push(Math.floor(Math.random() * 201) - 100);
    }
    const questions = ["mean", "median", "mode", "range", "variance", "standard deviation"];
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
        question: `What is the ${question} of the data set ${dataSet.join(", ")}?(Round to 3 decimal places)`,
        answer: smartRound(answer) 

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
        //find the variance of the expected value and probability data
        const mean = dataSet.reduce((acc, val) => acc + val * probabilities[dataSet.indexOf(val)], 0);
        answer = dataSet.reduce((acc, val) => acc + Math.pow(val - mean, 2) * probabilities[dataSet.indexOf(val)], 0);
    }

    else if(question == "standard deviation")
    {
        //find the standard deviation of the expected value and probability data
        const mean = dataSet.reduce((acc, val) => acc + val * probabilities[dataSet.indexOf(val)], 0);
        const variance = dataSet.reduce((acc, val) => acc + Math.pow(val - mean, 2) * probabilities[dataSet.indexOf(val)], 0);
        answer = Math.sqrt(variance);
    }

    return{
        question: `What is the ${question} of the data set ${dataSet.join(", ")} with probabilities ${probabilities.join(", ")}?(Round to 3 decimal places)`,
        answer: smartRound(answer) 
    }
}

function generateNumbersThatSumToTarget(n) 
{
    const cuts = new Set();
    while (cuts.size < n - 1) {
        cuts.add(Math.floor(Math.random() * (20 - 1)) + 1);
    }

    // Convert to sorted array
    const sortedCuts = Array.from(cuts).sort((a, b) => a - b);

    // Use the cuts to create partitions
    const parts = [];
    let prev = 0;
    for (const cut of sortedCuts) {
        parts.push(cut - prev);
        prev = cut;
    }
    parts.push(20 - prev); // Last segment

    return parts;    
}

function smartRound(num, epsilon = 1e-10) {
    const ans =  Math.abs(num) < epsilon ? 0 : parseFloat(num.toPrecision(15));
    if (hasMoreThanThreeDecimals(ans)) {
        return parseFloat(ans.toFixed(3));
    }
    return ans;
}

function hasMoreThanThreeDecimals(num) {
    const str = num.toString();
    if (str.includes(".")) {
      const decimalPart = str.split(".")[1];
      return decimalPart.length > 3;
    }
    return false;
  }
  

  


