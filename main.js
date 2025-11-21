// Four basic operations

let operators = "+*/-="
let numbers = "0123456789"

function add(a,b) {
    let result = a + b;
    return result
}

function subtract(a,b) {
let result = a - b;
    return result
}

function multiply(a,b) {
    let result = a * b;
    return result
}

function divide(a,b) {
    if (b==0) {
        alert("Error : Dividing by 0.....")

    }
    let result = a / b
    return result
}

// Calling the proper function

function operate(a,operator,b) {
    
    switch(operator) {
        case "+":
            return add(a,b)
            break
        case '-':
            return subtract(a,b)
            break
        case '*':
            return multiply(a,b)
            break
        case '/':
            return divide(a,b)
            break
        default:
           alert('Error on operate function')
            
    }
}

// Array containing 1st operand, operator and 2nd operand
let stack = [null,"",null];
let result;
let operatorIndex = 0;
// set to true when a calculation is done
let equalityCheck = false;


function clearData() {

    stack = [null, "", null];
    displayText.textContent = "0";
    operatorIndex = 0;
    equalityCheck = false;
}

let btn = document.querySelectorAll("button");
let displayText = document.querySelector("#display")
for(i=0; i<btn.length; i++) {
    btn[i].addEventListener("click", (e) => {

        let clickedButton = e.target.textContent;
        
        // Check if a number, an operator or the clear button was clicked
        switch (clickedButton) {
            case "0":
            case "1":    
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                // pressed digit when display = 0 or sign equal was pressed
                // erase the display 
                if ((displayText.textContent == "0") || (equalityCheck)) {
                    displayText.textContent = clickedButton;
                    equalityCheck = false;
                    
                } else {
                    displayText.textContent += clickedButton;
                }
                break
            case "+":
            case "-":
            case "/":
            case "*":
                // 
                equalityCheck = false;
                // check if last input is an operator
                // if so, swaps it
                if (operators.includes(displayText.textContent.slice(-1))) {

                    displayText.textContent = displayText.textContent.replace(displayText.textContent.slice(-1),clickedButton)
                    stack[1] = clickedButton
                    break

                // when an operator key is pressed while there's already one in the stack
                // calculate the first operation and set it to index 0 of stack
                } else if (stack[1].length != 0) {
                    
                    
                    operatorIndex = displayText.textContent.indexOf(stack[1]);
                    stack[2] = Number(displayText.textContent.substring(operatorIndex+1))
                    stack[0] = operate(stack[0],stack[1],stack[2])
                    displayText.textContent = "" + stack[0] + clickedButton

                    stack[1] = clickedButton;
                    stack[2] = null;

                } else {
                    stack[0] = Number(displayText.textContent)
                    displayText.textContent += clickedButton
                    stack[1] = clickedButton;
                    
                }
                break

            case "=":
                if ((stack[0] === null) || (stack[1] == '')) {
                    alert("Error : missing arguments, try again")
                    clearData()

                } else {
                    operatorIndex = displayText.textContent.indexOf(stack[1]);
                    stack[2] = Number(displayText.textContent.substring(operatorIndex+1))
                    result = operate(stack[0],stack[1],stack[2]) + ""
                    clearData()
                    displayText.textContent = result + ''
                    equalityCheck = true;
                    
                }
                break
            case "Clear":
                clearData()
                break
        }
        
        
        
        
        
    })
}