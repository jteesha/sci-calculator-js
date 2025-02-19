"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const trigo = document.querySelector(".trigo");
    const func = document.querySelector(".func");
    const secondBtn = document.querySelector(".second");
    const row1 = document.querySelector(".row1");
    const row2 = document.querySelector(".row2");
    const display = document.querySelector(".display");
    const history = document.querySelector(".history");
    const buttons = document.querySelectorAll(".buttons button, .row1 button, .row2 button");
    const trigoSecond = document.querySelector(".trigo-second");

    let currentInput = "";
    let secondFunction = false;
    let trigono = false;
    let memoryValue = 0;

    trigo.addEventListener("click", () => row1.style.display = row1.style.display === "none" ? "grid" : "none");
    func.addEventListener("click", () => row2.style.display = row2.style.display === "none" ? "grid" : "none");

    secondBtn.addEventListener("click", function () {
        secondFunction = !secondFunction;
        toggleSecondFunctions();
    });

    trigoSecond.addEventListener("click", function () {
        trigono = !trigono;
        trigoToggle();
    });

    function toggleSecondFunctions() {
        document.querySelectorAll(".second-toggle").forEach(button => {
            const primary = button.getAttribute("data-primary");
            const secondary = button.getAttribute("data-secondary");
            button.textContent = secondFunction ? secondary : primary;
        });
    }
    function trigoToggle() {
        document.querySelectorAll(".function-toggle").forEach(button => {
        const primary = button.getAttribute("data-primary");
        const secondary = button.getAttribute("data-secondary");
        button.textContent = trigono ? secondary : primary;
      });
    };
  
    function updateDisplay() {
        display.value = currentInput.replace(/Math\.\w+\(|\)/g, "").replace(/\^/g, "^");
    }
    function updateHistory(expression, result) {
        history.value = `${result}`;
    }

    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    function decimalToDMS(decimalDegrees) {
        let degrees = Math.floor(decimalDegrees);
        let minutesDecimal = (decimalDegrees - degrees) * 60;
        let minutes = Math.floor(minutesDecimal);
        let seconds = Math.round((minutesDecimal - minutes) * 60);
        return `${degrees}° ${minutes}' ${seconds}"`;
    }

    function evaluateExpression() {
        try {
            currentInput = currentInput.replace(/(\d+)\s*%\s*(\d+)/g, '($1 % $2)');
            currentInput = Function('return ' + currentInput)();
        } catch {
            currentInput = "Error";
        }
        updateDisplay();
    }
    
 function inverseTrigFunctions(value, func) {
        const radToDeg = 180 / Math.PI; 
    
        if (isNaN(value)) {
            return "Error: Invalid input";
        }
    
        switch (func) {
            case 'sin⁻¹':
                if (value < -1 || value > 1) return "Error: Input out of range for sin⁻¹";
                return Math.asin(value) * radToDeg;  
            case 'cos⁻¹':
                if (value < -1 || value > 1) return "Error: Input out of range for cos⁻¹";
                return Math.acos(value) * radToDeg;  
            case 'tan⁻¹':
                return Math.atan(value) * radToDeg;  
            case 'sec⁻¹':
                if (value <= -1 || value >= 1) return Math.acos(1 / value) * radToDeg;  
                return "Error: Input out of range for sec⁻¹";
            case 'csc⁻¹':
                if (value <= -1 || value >= 1) return Math.asin(1 / value) * radToDeg;  
                return "Error: Input out of range for csc⁻¹";
            case 'cot⁻¹':
                return Math.atan(1 / value) * radToDeg;  
            default:
                return "Error: Invalid function";
        }
    }
    function evaluateExpression(expression) {
        try {
            expression = expression.replace(/(\d+)\^(\d+)/g, "Math.pow($1,$2)");
            expression = expression.replace(/factorial\((\d+)\)/g, (match, num) => factorial(parseInt(num)));

            let result = Function("Math", "return " + expression)(Math);

            updateHistory(expression, result);

            return result;
        } catch (error) {
            return "Error";
        }
    }

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let buttonText = button.textContent.trim();


            if (button.classList.contains("trigo") || button.classList.contains("func") || button.classList.contains("second") || button.classList.contains("trigo-second")) {
                return; 
            }
    


            if (buttonText === "=") {
                let result = evaluateExpression(currentInput).toString();
                currentInput = result;
                updateDisplay();
                return;
            }

            if (buttonText === "clear") {
                currentInput = "";
                history.value = "";
                updateDisplay();
                return;
            }

            if (buttonText === "C") {
                currentInput = currentInput.slice(0, -1);
                updateDisplay();
                return;
            }

            if (buttonText === "MC") {
                memoryValue = 0;
                alert("Memory Cleared");
                return;
            }

            if (buttonText === "MR") {
                currentInput += memoryValue;
                updateDisplay();
                return;
            }

            if (buttonText === "MS") {
                memoryValue = parseFloat(currentInput) || 0;
                alert(`Stored in Memory: ${memoryValue}`);
                return;
            }

            if (buttonText === "M+") {
                memoryValue += parseFloat(currentInput) || 0;
                alert(`Memory Updated: ${memoryValue}`);
                return;
            }

            if (buttonText === "M-") {
                memoryValue -= parseFloat(currentInput) || 0;
                alert(`Memory Updated: ${memoryValue}`);
                return;
            }

            if (buttonText === "rand") {
                currentInput = Math.random().toFixed(6).toString();
                updateDisplay();
                return;
            }

            if (buttonText === "dms") {
                let decimalValue = parseFloat(currentInput);
                if (isNaN(decimalValue)) {
                    alert("Invalid input for DMS conversion");
                    return;
                }
                currentInput = decimalToDMS(decimalValue);
                updateDisplay();
                return;
            }

            if (buttonText === "|x|") {
                currentInput = `Math.abs(${currentInput})`;
                updateDisplay();
                return;
            }

            if (buttonText === "1/x") {
                currentInput = `(1/(${currentInput}))`;
                updateDisplay();
                return;
            }

            

            if (buttonText === "exp") {
                currentInput = `Math.exp(${currentInput})`;
                updateDisplay();
                return;
            }

            if (buttonText === "pie") {
                currentInput += "Math.PI";
                updateDisplay();
                return;
            }

            if (buttonText === "e") {
                currentInput += "Math.E";
                updateDisplay();
                return;
            }

            if (buttonText === "10^x") {
                currentInput = `Math.pow(10, ${currentInput})`;
                updateDisplay();
                return;
            }

            if (buttonText === "x²") {
                currentInput = `Math.pow(${currentInput}, 2)`;
                updateDisplay();
                return;
            }
            if (buttonText === "(") {
                currentInput += "(";
                updateDisplay();
                return;
            }

            if (buttonText === ")") {
                currentInput += ")";
                updateDisplay();
                return;
            }
            if (buttonText === "x³") {
                currentInput = `Math.pow(${currentInput}, 3)`;
                updateDisplay();
                return;
            }

            if (buttonText === "∛x") {
                currentInput = `Math.cbrt(${currentInput})`;
                updateDisplay();
                return;
            }

            if (buttonText === "x^y") {
                currentInput += "^";
                updateDisplay();
                return;
            }
            if (buttonText === "√x") {
                currentInput = `Math.sqrt(${currentInput})`;
                updateDisplay();
                return;
            }

            if (buttonText === "e^x") {
                currentInput = `Math.exp(${currentInput})`;
                updateDisplay();
                return;
            }

            if (buttonText === "y√x") {
                let values = currentInput.split("");
                if (values.length !== 2) {
                    alert("Enter in format: x,y for y√x");
                    return;
                }
                currentInput = `Math.pow(${values[0]}, 1/${values[1]})`;
                updateDisplay();
                return;
            }

            if (buttonText === "log10x") {
                let values = currentInput.split("");
                if (values.length !== 2) {
                    alert("Enter in format: x,y for log(x) base y");
                    return;
                }
                currentInput = `(Math.log(${values[0]}) / Math.log(${values[1]}))`;
                updateDisplay();
                return;
            }
            if (buttonText === "2^x") {
                currentInput = `Math.pow(2, ${currentInput})`;
                updateDisplay();
                return;
            }

            if (buttonText === "n!") {
                currentInput = `factorial(${currentInput})`;
                updateDisplay();
                return;
            }
            if (["sin⁻¹", "cos⁻¹", "tan⁻¹", "sec⁻¹", "csc⁻¹", "cot⁻¹"].includes(buttonText)) {
                currentInput = inverseTrigFunctions(parseFloat(currentInput), buttonText).toString();
                updateDisplay();
                return;
            }
            if (buttonText === "n!") {
                currentInput = `inverseTrigFunctions(${currentInput})`;
                updateDisplay();
                return;
            }
            if (["sin", "cos", "tan", "log", "ln", "√", "sinh", "cosh", "tanh", "sec", "csc", "cot"].includes(buttonText)) {
                const mathFunc = {
                    "sin": "Math.sin",
                    "cos": "Math.cos",
                    "tan": "Math.tan",
                    "log": "Math.log10",
                    "ln": "Math.log",
                    "√": "Math.sqrt",
                    "sinh": "Math.sinh",
                    "cosh": "Math.cosh",
                    "tanh": "Math.tanh",
                    "sec": "1/Math.cos",
                    "csc": "1/Math.sin",
                    "cot": "1/Math.tan"
                }[buttonText];

                currentInput = `${mathFunc}(${currentInput})`;
                updateDisplay();
                return;
            }

            currentInput += buttonText;
            updateDisplay();
        });
    });

    display.addEventListener("input", function () {
        currentInput = display.value;
    });

});
