//CALCULATOR LOGIC

class Calculator {
    constructor(previousOperandTextElement,presentOperandTextElement,readyToReset){
        this.presentOperandTextElement = presentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.readyToReset = false;
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
        this.presentOperand = this.presentOperand.toString() + decimalButton.innerText;
    }
    appendNumber(number) {
        this.presentOperand = this.presentOperand.toString() +  number.toString();
    }
    chooseOperation(operation) {
        if(this.presentOperand === '') return;
        if(this.previousOperand !== ''){
            // if there is already an operand, and we press an operation button,
            // we need to compute the value first before entering a new value.
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.presentOperand;
        this.presentOperand = '';
        
    }
    displayFormat(number) {
        let stringNumber = number.toString();
        let integerPart = parseFloat(stringNumber.split('.')[0]);
        let decimalPart = stringNumber.split('.')[1];

        let integerDisplay;
        if(isNaN(integerPart)){
            integerDisplay = '';
        }else {
            integerDisplay = integerPart.toLocaleString('en',{maximumFractionDigits:0});
        }

        if(decimalPart != null){
            return `${integerDisplay}.${decimalPart}`
        }else{
            return `${integerDisplay}`;
        }
        
    }

    compute() {
        let computation;
        let present = parseFloat(this.presentOperand);
        let past = parseFloat(this.previousOperand);

        if(isNaN(present) || isNaN(past)) return;

        switch(this.operation){
            case '+':
                computation = past + present;
                break;
            case '-':
                computation = past - present;
                break;

            case '*':
                computation = past * present;
                computation = computation.toFixed(2);
                break;

            case '/':
                computation = past / present;
                computation = computation.toFixed(2);
                break;
            default:
                return;
            
        }

        this.presentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined;
        this.readyToReset = true;
    }

    updateDisplay() {
        this.presentOperandTextElement.innerText = this.displayFormat(this.presentOperand);
        this.previousOperandTextElement.innerText = this.operation ? `${this.displayFormat(this.previousOperand)} ${this.operation}` : '';
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
        if(calculator.previousOperand === '' && calculator.presentOperand !== '' && calculator.readyToReset){
            calculator.presentOperand = '';
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();

    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',(e)=>{
        calculator.chooseOperation(button.innerText);
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

equalsButton.addEventListener('click',(e)=>{
    calculator.compute();
    calculator.updateDisplay();
})