let keypad = document.getElementById('keypad');
let initialNumber = '0';
let keypadScreenNumber = "0";

// keypad.textContent = keypadNumber;
let presentKeypadScreen  = document.getElementById('present');

presentKeypadScreen.textContent = keypadScreenNumber;

let ac = document.getElementById('acbutton');

// ac button functionality
ac.addEventListener('click',clear);

function clear(e) {
    keypadScreenNumber = initialNumber;
    presentKeypadScreen.textContent = initialNumber;
    console.log(initialNumber);

}

// keypad button clicks displaying number

keypad.addEventListener('click',(e) => {
    
    if(e.target.type === 'submit' && e.target.value !== ''){
        keypadScreenNumber += e.target.value;
        let zeroRemoved = keypadScreenNumber.slice(1);
        presentKeypadScreen.textContent = zeroRemoved;
    }
})

