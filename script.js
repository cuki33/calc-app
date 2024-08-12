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
        handleNumber(button.textContent);
    });
});

// Add event listeners for operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleOperator(button.textContent);
    });
});

// Event listener for equal button
equalButton.addEventListener('click', handleEqual);

// Event listener for clear button
clearButton.addEventListener('click', clear);

// Function to handle number input
function handleNumber(number) {
    if (shouldResetDisplay) {
        resetDisplay();
    }
    appendNumber(number);
}

// Function to handle operator input
function handleOperator(operator) {
    if (currentOperator && firstNumber !== null) {
        // Calculate the result of the previous operation
        secondNumber = parseFloat(display.textContent);
        firstNumber = operate(currentOperator, firstNumber, secondNumber);
        display.textContent = roundResult(firstNumber);
    } else {
        // Set the first number
        firstNumber = parseFloat(display.textContent);
    }
    currentOperator = operator;
    shouldResetDisplay = true;
}

// Function to handle equal button
function handleEqual() {
    if (currentOperator && firstNumber !== null) {
        secondNumber = parseFloat(display.textContent);
        const result = operate(currentOperator, firstNumber, secondNumber);
        display.textContent = roundResult(result);
        firstNumber = result; // Update firstNumber for further operations
        currentOperator = ''; // Reset operator
    }
    shouldResetDisplay = true;
}

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

// Add keyboard support
window.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key)) { // If the key is a number
        handleNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') { // If the key is an operator
        handleOperator(key);
    } else if (key === 'Enter' || key === '=') { // If the key is Enter or =
        event.preventDefault(); // Prevent the form submission if Enter is pressed
        handleEqual();
    } else if (key === 'Backspace') { // If the key is Backspace (acts as clear)
        clear();
    } else if (key === 'Escape') { // If the key is Escape (acts as clear)
        clear();
    }
});
