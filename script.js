// History store karne ke liye array
let historyLog = [];

function addResultAndPredict(result) {
    // Result ko history mein add karein (Jaise: 'BIG', 'SMALL' ya 'RED', 'GREEN')
    historyLog.push(result.toUpperCase());
    
    // Agar history mein kam se kam 3 entries hain, tabhi pattern analyze hoga
    let prediction = analyzePattern();
    
    document.getElementById('result').innerHTML = `
        <p>History: ${historyLog.join(', ')}</p>
        <p style="color: #38bdf8;">Next Predicted Trend: <strong>${prediction}</strong></p>
    `;
}

function analyzePattern() {
    if (historyLog.length < 3) {
        // Agar data kam hai toh random fallback
        return "Analyzing... (Need more data)";
    }

    // Last 3 results ko check karte hain
    let last = historyLog[historyLog.length - 1];
    let secondLast = historyLog[historyLog.length - 2];
    let thirdLast = historyLog[historyLog.length - 3];

    // Pattern Logic: Agar pichle 3 same aaye hain, toh opposite ya trend follow hoga
    if (last === secondLast && secondLast === thirdLast) {
        // Trend reversal logic
        return last === "BIG" ? "SMALL" : "BIG";
    } else {
        // Frequency-based calculation (Last outcome ko zyada weight dena)
        let bigCount = historyLog.filter(item => item === "BIG").length;
        let smallCount = historyLog.filter(item => item === "SMALL").length;

        // Jo kam ya zyada aa raha hai uske hisab se balance prediction
        return bigCount > smallCount ? "SMALL" : "BIG";
    }
}
