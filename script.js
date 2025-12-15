const expressionE1 = document.getElementById("expression");
const resultE1 = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

let expression = "";

buttons.forEach(btn => {
    btn.addEventListener("click", () => handleButton(btn));
});

function handleButton(btn) {
    const val = btn.dataset.val;
    const op = btn.dataset.op;

    if (val !== undefined) {
        addValue(val);
    }  else if (op !== undefined) {
        handleOperation(op);
    }
}

function addValue(value) {
    //removes leading zero and forms the user's expression
    if (expression === '0') expression = "";

    expression += value;
    updateDisplay();
}

function handleOperation(op) {
    switch(op) {
        case "clear":
            expression = "";
            resultE1.textContent ="0";
            updateDisplay();
            break;
        
        case "back":
            expression = expression.slice(0, -1);
            updateDisplay();
            break;

        case "percent":
            if (expression) {
                expression = (parseFloat(expression) /100).toString();
                updateDisplay();
            }
            break;

        case "toggle":
            toggleSign();
            break;
            
        case "equals":
            calculateResult();
            break;

        default:
            expression += op;
            updateDisplay();
    }
}

function toggleSign() {
    if (!expression) return;

    if (!isNaN(expression)) {
        expression = (parseFloat(expression) * -1).toString();
        updateDisplay();
        return;
    }

    let match = expression.match(/(-?\d+\.?\d*)$/);
    if (match) {
        let num = match[0];
        let toggled = (parseFloat(num) * -1).toString();
        expression = expression.replace(/(-?\d+\.?\d*)$/, toggled);
        updateDisplay();
    }
}

function calculateResult() {
    if (!expression) return;

    try {
        let cleaned = expression.replace(/x/g, "*");
        let answer = eval(cleaned);
        resultE1.textContent = answer;
     } catch {
        resultE1.textContent= "Error";
     }
}

function updateDisplay() {
    expressionE1.textContent = expression || "0";
}

