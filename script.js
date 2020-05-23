// Calculator logic

class Calculator {
  constructor(pastOperandTextDisplay, presentOperandTextDisplay, readyToreset) {
    this.pastOperandTextDisplay = pastOperandTextDisplay;
    this.presentOperandTextDisplay = presentOperandTextDisplay;
    this.readyToreset = false;
    this.clear();
  }

  // All clear function
  clear() {
    this.presentOperand = "";
    this.pastOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }
  //append number
  appendNumber(number) {
    if (number === null) return;
    this.presentOperand = this.presentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  // append Decimal
  appendDecimal(decimal) {
    if (this.presentOperand === "." || this.presentOperand.includes(".")) {
      return;
    } else {
      this.presentOperand = this.presentOperand.toString() + decimal.toString();
      this.updateDisplay();
    }
  }

  chooseOperation(operation) {
    if (this.presentOperand === "") return;
    this.compute();
    this.operation = operation;
    this.pastOperand = this.presentOperand;
    this.presentOperand = "";
    this.updateDisplay();
  }

  compute() {
    let present = parseFloat(this.presentOperand);
    let past = parseFloat(this.pastOperand);

    if (isNaN(present) || isNaN(past)) return;

    let result;

    switch (this.operation) {
      case "+":
        result = present + past;
        break;
      case "-":
        result = past - present;
        break;
      case "*":
        result = past * present;
        break;
      case "/":
        result = past / present;
        break;
      default:
        return;
    }

    this.presentOperand = result;
    this.pastOperand = "";
    this.operation = undefined;
    this.readyToreset = true;
    this.updateDisplay();
  }

  delete() {
    this.presentOperand = this.presentOperand.slice(0, -1);
    this.updateDisplay();
  }
  updateDisplay() {
    this.presentOperandTextDisplay.innerText = this.presentOperand;
    this.pastOperandTextDisplay.innerText = `${this.pastOperand} ${
      this.operation ? this.operation : ""
    } `;
  }
  signChange() {
    let present = parseFloat(this.presentOperand);
    present = present > 0 ? -Math.abs(present) : present;
    this.presentOperand = present;
    this.updateDisplay();
    console.log(present);
  }
}

let numbers = document.querySelectorAll("[data-number]");
let operations = document.querySelectorAll("[data-operation]");
let deleteButton = document.querySelector("[data-delete]");
let pastOperandTextDisplay = document.querySelector("[data-previous-operand]");
let presentOperandTextDisplay = document.querySelector(
  "[data-present-operand]"
);
let allClearButton = document.querySelector("[data-all-clear]");
let equalsButton = document.querySelector("[data-equals");
let decimalButton = document.querySelector("[data-decimal]");
let signChangeButton = document.querySelector("[data-sign-change]");

let calculator = new Calculator(
  pastOperandTextDisplay,
  presentOperandTextDisplay
);

allClearButton.addEventListener("click", (e) => {
  calculator.clear();
});

numbers.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (
      calculator.presentOperand !== "" &&
      calculator.pastOperand === "" &&
      calculator.readyToreset
    ) {
      calculator.clear();
    }
    let presentNumber;
    calculator.appendNumber(button.innerText);
    calculator.readyToreset = false;
  });
});

decimalButton.addEventListener("click", (e) => {
  calculator.appendDecimal(e.target.textContent);
});

operations.forEach((button) => {
  button.addEventListener("click", (e) => {
    calculator.chooseOperation(button.textContent);
  });
});

equalsButton.addEventListener("click", (e) => {
  calculator.compute();
});

deleteButton.addEventListener("click", (e) => {
  calculator.delete();
});

signChangeButton.addEventListener("click", (e) => {
  calculator.signChange();
});

window.addEventListener("keydown", (e) => {
  // if(e.key === '9'){
  //     calculator.appendNumber('9');
  // }
  function clearAfterResult(number) {
    if (
        calculator.presentOperand !== "" &&
        calculator.pastOperand === "" &&
        calculator.readyToreset
      ) {
        calculator.clear();
      }
      return calculator.appendNumber(number);
  }
 
  
  switch (e.key) {
    case "9":
        
    //   calculator.appendNumber("9");
        clearAfterResult("9");
      break;
    case "8":
      calculator.appendNumber("8");
      break;
    case "7":
      calculator.appendNumber("7");
      break;
    case "6":
      calculator.appendNumber("6");
      break;
    case "5":
      calculator.appendNumber("5");
      break;
    case "4":
      calculator.appendNumber("4");
      break;
    case "3":
      calculator.appendNumber("3");
      break;
    case "2":
      calculator.appendNumber("2");
      break;
    case "1":
      calculator.appendNumber("1");
      break;
    case "0":
      calculator.appendNumber("0");
      break;
    case ".":
      calculator.appendDecimal(".");
      break;
    case "*":
      calculator.chooseOperation("*");
      break;
    case "/":
      calculator.chooseOperation("/");
      break;
    case "-":
      calculator.chooseOperation("-");
      break;
    case "+":
      calculator.chooseOperation("+");
      break;
    case "Enter":
        calculator.compute();
        // calculator.readyToreset = true;
        console.log(calculator.readyToreset);
    default:
  }

});
