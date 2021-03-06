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
        // result = result.toFixed(2);

        break;
      case "-":
        result = past - present;
        // result = result.toFixed(2);

        break;
      case "*":
        result = past * present;
        console.log(typeof result);
        result = result.toFixed(2);
        break;
      case "/":
        result = past / present;
        console.log(result);
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
    console.log(typeof this.presentOperand);

    this.presentOperand = this.presentOperand.toString().slice(0, -1);
  
    this.updateDisplay();
  }
  displayFormat(number) {
    let stringNumber = number.toString();
    let numberSplit = stringNumber.split(".");
    let integerPart = parseFloat(numberSplit[0]);
    let decimalPart = numberSplit[1];
    let integerDisplay;
    if (isNaN(integerPart)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerPart.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalPart != null) {
      if (decimalPart === "00") {
        return `${integerDisplay}`;
      } else {
        return `${integerDisplay}.${decimalPart}`;
      }
    } else {
      return `${integerDisplay}`;
    }
  }
  updateDisplay() {
    // console.log(typeof this.presentOperand, typeof this.pastOperand);
    this.presentOperandTextDisplay.innerText = this.displayFormat(
      this.presentOperand
    );
    this.pastOperandTextDisplay.innerText = ` ${this.displayFormat(
      this.pastOperand
    )} ${this.operation ? this.operation : ""} `;
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
  allClearButton.blur();
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
  console.log(document.activeElement);

  calculator.delete();
  calculator.readyToreset = false;
});

signChangeButton.addEventListener("click", (e) => {
  calculator.signChange();
});

function clearAfterResult(number) {
  if (
    calculator.presentOperand !== "" &&
    calculator.pastOperand === "" &&
    calculator.readyToreset
  ) {
    calculator.clear();
  }
  calculator.readyToreset = false;
  calculator.appendNumber(number);
  // window.focus();
}

window.addEventListener("keyup", (e) => {
  // if(e.key === '9'){
  //     calculator.appendNumber('9');
  // }

  switch (e.key) {
    case "9":
      clearAfterResult("9");

      break;
    case "8":
      clearAfterResult("8");

      break;
    case "7":
      clearAfterResult("7");
      break;
    case "6":
      clearAfterResult("6");
      break;
    case "5":
      clearAfterResult("5");
      break;
    case "4":
      clearAfterResult("4");
      break;
    case "3":
      clearAfterResult("3");
      break;
    case "2":
      clearAfterResult("2");
      break;
    case "1":
      clearAfterResult("1");
      break;
    case "0":
      clearAfterResult("0");
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
      break;
    case "Backspace":
      deleteButton.focus();
      calculator.delete();
      calculator.readyToreset = false;
      deleteButton.blur();
      break;
    case "Escape":
      calculator.clear();
      break;
  }
});
