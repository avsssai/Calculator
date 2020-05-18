// let keypad = document.getElementById('keypad');
// let initialNumber = '0';
// let keypadScreenNumber = "0";


// let number1 = '0';
// let number2 = '0';
// let operator = null;

// // keypad.textContent = keypadNumber;
// let presentKeypadScreen  = document.getElementById('present');

// presentKeypadScreen.textContent = keypadScreenNumber;

// let ac = document.getElementById('acbutton');

// // ac button functionality
// ac.addEventListener('click',clear);

// function clear(e) {
//     keypadScreenNumber = initialNumber;
//     presentKeypadScreen.textContent = initialNumber;
//     console.log(initialNumber);

// }

// // keypad button clicks displaying number

// keypad.addEventListener('click',(e) => {
    
//     if(e.target.type === 'submit' && e.target.value !== ''){
//         keypadScreenNumber += e.target.value;
//         let zeroRemoved = keypadScreenNumber.slice(1);
//         presentKeypadScreen.textContent = zeroRemoved;
//     }
// })

// function add(num1,num2) {
//     return num1 + num2;
// };

// keypad.addEventListener('mousedown',(e)=>{
//     if(e.target.type === 'submit' && e.target.name === 'add'){
//         console.log('addition');
//         number1 = keypadScreenNumber;
//         operator = e.type.name;

//         // keypadScreenNumber = number2;
//     }
    
// })
 

//CALCULATOR LOGIC

class Calculator {
    constructor(previousOperandTextElement,presentOperandTextElement){
        this.presentOperandTextElement = presentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.allClear();
    }
    allClear() {
        this.presentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }


    deleteNumber() {
        this.presentOperand = this.presentOperand.slice(0,-1);
    }
    appendDecimalPoint () {
        if(this.presentOperand === '.' || this.presentOperand.includes('.')) return;
        this.presentOperand += decimalButton.innerText;
    }
    appendNumber(number) {
        this.presentOperand += number;
    }
    chooseOperation(operation) {

    }

    compute() {

    }

    updateDisplay() {
        this.presentOperandTextElement.innerText = this.presentOperand;
    }



}

let numbers = document.querySelectorAll('[data-number]');
let equalsButton = document.querySelector('[data-equals]');
let deleteButton = document.querySelector('[data-delete]');
let operationButtons = document.querySelectorAll('[data-operation]');
let decimalButton = document.querySelector('[data-decimal]');
let allClearButton = document.querySelector('[data-all-clear]');
let previousOperandTextElement = document.querySelector('[data-previous-operand]');
let presentOperandTextElement = document.querySelector('[data-present-operand]');


let calculator = new Calculator(previousOperandTextElement,presentOperandTextElement);

numbers.forEach(button => {
    button.addEventListener('click',(e) => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

decimalButton.addEventListener('click',(e) =>{
    calculator.appendDecimalPoint(decimalButton.innerText);
    calculator.updateDisplay();
})

allClearButton.addEventListener('click',(e) => {
    calculator.allClear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click',(e) => {
    calculator.deleteNumber();
    calculator.updateDisplay()
})