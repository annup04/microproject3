const userInput = document.querySelector(".user-input");
const resetKey = document.querySelector(".reset-key");
const answerKey = document.querySelector(".answer-key");
const deleteKey = document.querySelector(".delete-key");
const keys = document.querySelectorAll(".key");

const keysArray = Array.from(keys);

let lastKeyIsOperator = false; // To track if the last key clicked was an operator
let decimalAdded = false; // To track if a decimal point has been added to the current number

const keyClickHander = (event) => {
  console.log("keyClicked: ", event.target.innerText);

  const value = event.target.innerText; // Fetching the key clicked

  if (value === "." && decimalAdded) {
    // Prevent adding multiple decimal points in a number
    return;
  }

  if ("+-x/".includes(value)) {
    // if the input value is an operator
    if (lastKeyIsOperator) {
      // Prevent consecutive operators , and update the last operator to new operator
      initalValue = userInput.value;
      updatedValue = initalValue.substring(0, initalValue.length - 1) + value;
      console.log(updatedValue);
      userInput.value = updatedValue;
      return;
    }

    lastKeyIsOperator = true; // update the lastKeyIsOperator
    decimalAdded = false; // Reset decimal added flag
  } else {
    // if input is not an operator
    lastKeyIsOperator = false; // update the lastKeyIsOperator

    if (value === ".") {
      decimalAdded = true;
    }
  }

  userInput.value += value; // Update the display screen

  // After updating the display screen
  userInput.scrollLeft = userInput.scrollWidth; // Scroll to the rightmost position
};

const resetHandler = () => {
  console.log("Reset Clicked");
  userInput.value = "";
};

const deleteHandler = () => {
  console.log("Delete Clicked");
  initalValue = userInput.value;
  updatedValue = initalValue.substring(0, initalValue.length - 1);
  userInput.value = updatedValue;
};

const expressionHandler = (expression) => {
  console.log("Inside expression handler");

  // Handling the expression using BODMAS rule
  const formattedExpression = expression.replace(/x/g, "*");

  // Using eval to calculate the result
  const result = eval(formattedExpression);

  return result;
};

const answerHandler = () => {
  console.log("answerClicked");

  // handling the expression
  const expression = userInput.value;
  const result = expressionHandler(expression);
  userInput.value = result;
};

keysArray.forEach((key) => key.addEventListener("click", keyClickHander));
resetKey.addEventListener("click", resetHandler);
deleteKey.addEventListener("click", deleteHandler);
answerKey.addEventListener("click", answerHandler);