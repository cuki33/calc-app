// Variables to store values
let firstNumber = null;
let currentOperator = '';
let shouldResetDisplay = false;

// Display element
const display = document.getElementById('display');

// Button elements
const numberButtons = document.querySelectorAll('button:not(.operator):not(.equal):not(.clear)');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');

// Add event listeners for number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (shouldResetDisplay) {
            resetDisplay();
        }
        appendNumber(button.textContent);
    });
});

// Add event listeners for operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperator && firstNumber !== null) {
            // Calculate the result of the previous operation
            secondNumber = parseFloat(display.textContent);
            firstNumber = operate(currentOperator, firstNumber, secondNumber);
            display.textContent = roundResult(firstNumber);
        } else {
            // Set the first number
            firstNumber = parseFloat(display.textContent);
        }
        currentOperator = button.textContent;
        shouldResetDisplay = true;
    });
});

// Event listener for equal button
equalButton.addEventListener('click', () => {
    if (currentOperator && firstNumber !== null) {
        secondNumber = parseFloat(display.textContent);
        const result = operate(currentOperator, firstNumber, secondNumber);
        display.textContent = roundResult(result);
        firstNumber = result; // Update firstNumber for further operations
        currentOperator = ''; // Reset operator
    }
    shouldResetDisplay = true;
});

// Event listener for clear button
clearButton.addEventListener('click', clear);

// Function to append number to display
function appendNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = number;
    } else {
        display.textContent += number;
    }
    shouldResetDisplay = false;
}

// Function to reset the display
function resetDisplay() {
    display.textContent = '';
    shouldResetDisplay = false;
}

// Function to clear the calculator
function clear() {
    display.textContent = '0';
    firstNumber = null;
    currentOperator = '';
    shouldResetDisplay = false;
}

// Function to handle the calculator operations
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            if (b === 0) {
                handleDivisionByZero();
                return 0; // Return 0 to prevent further calculation with an error
            }
            return divide(a, b);
        default:
            return "Invalid operator";
    }
}

// Function to handle division by zero
function handleDivisionByZero() {
    display.textContent = "Error: Div by 0";
    firstNumber = null;
    currentOperator = '';
    shouldResetDisplay = true;
}

// Function to round results
function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

// Basic math operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
