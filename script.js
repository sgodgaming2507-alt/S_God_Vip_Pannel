// History store karne ke liye array
let historyLog = [];

function makePrediction() {
    const inputVal = document.getElementById('userInput').value;
    const resultDiv = document.getElementById('result');

    if(inputVal.trim() === "") {
        resultDiv.style.color = "#f87171";
        resultDiv.innerHTML = "Please enter a valid value!";
        return;
    }

    // Result ko history mein add karein
    historyLog.push(inputVal.toUpperCase());
    
    // Pattern analysis logic
    let prediction = analyzePattern();
    
    resultDiv.style.color = "#4ade80";
    resultDiv.innerHTML = `
        <p>Input: ${inputVal}</p>
        <p style="color: #38bdf8;">Next Predicted Trend: <strong>${prediction}</strong></p>
    `;
}

function analyzePattern() {
    if (historyLog.length < 3) {
        const outcomes = ["BIG", "SMALL", "WIN", "LOSS", "RED", "GREEN"];
        return outcomes[Math.floor(Math.random() * outcomes.length)];
    }

    let last = historyLog[historyLog.length - 1];
    let secondLast = historyLog[historyLog.length - 2];

    if (last === secondLast) {
        return last === "BIG" ? "SMALL" : "BIG";
    } else {
        let bigCount = historyLog.filter(item => item === "BIG").length;
        let smallCount = historyLog.filter(item => item === "SMALL").length;
        return bigCount > smallCount ? "SMALL" : "BIG";
    }
}
