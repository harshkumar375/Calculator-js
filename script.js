let zeroBtn = document.querySelector(".zero-btn");
let dblZeroBtn = document.querySelector(".dblzero-btn");
let dotBtn = document.querySelector(".dot-btn");
let acBtn = document.querySelector(".ac-btn");
let backspaceBtn = document.querySelector(".backspace-btn");
let modulusBtn = document.querySelector(".modulus-btn");
let divideBtn = document.querySelector(".divide-btn");
let mulBtn = document.querySelector(".mul-btn");
let subBtn = document.querySelector(".sub-btn");
let addBtn = document.querySelector(".add-btn");
let equalBtn = document.querySelector(".equal-btn");

let input = document.querySelector("input");

let para = document.querySelector(".input-text .data");

let currentInput = "";
let previousInput = "";
let operator = null;
let displayInput = "";
let decimal = true;

const display = (value) => {
  displayInput += value;
  input.value = displayInput;
};

const handleNumber = (value) => {
  currentInput += value;
  display(value);
};

// Number button

document.querySelectorAll(".number-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    let value = btn.innerText;
    handleNumber(value);
  });
});

zeroBtn.addEventListener("click", () => {
  if (currentInput !== "0") {
    handleNumber("0");
  }
});

dblZeroBtn.addEventListener("click", () => {
  if (currentInput !== "" && currentInput !== "0") {
    handleNumber("00");
  }
});

dotBtn.addEventListener("click", () => {
  if (decimal) {
    if (currentInput === "") {
      handleNumber("0.");
    } else {
      handleNumber(".");
    }
  }
  decimal = false;
});

// Special button

acBtn.addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  decimal = true;
  displayInput = "";
  operator = null;
  display(displayInput);
  para.innerText = "";
});

function backspace() {
  let delchar = displayInput[displayInput.length - 1];
  currentInput = currentInput.slice(0, -1);
  displayInput = displayInput.slice(0, -1);
  input.value = displayInput;
  for (let char of currentInput) {
    if (char === ".") {
      decimal = false;
      break;
    } else {
      decimal = true;
    }
  }
  if (
    delchar === "%" ||
    delchar === "/" ||
    delchar === "*" ||
    delchar === "-" ||
    delchar === "+"
  ) {
    currentInput = previousInput;
    previousInput = "";
    operator = null;
  }
}

backspaceBtn.addEventListener("click", () => {
  backspace();
});

// Operator button

const handleOperator = (operator) => {
  previousInput = currentInput;
  currentInput = "";
  decimal = true;
  display(operator);
};

modulusBtn.addEventListener("click", () => {
  if (operator === null && (currentInput !== "" || previousInput !== "")) {
    operator = "%";
    handleOperator(operator);
  }
});

divideBtn.addEventListener("click", () => {
  if (operator === null && (currentInput !== "" || previousInput !== "")) {
    operator = "/";
    handleOperator(operator);
  }
});

mulBtn.addEventListener("click", () => {
  if (operator === null && (currentInput !== "" || previousInput !== "")) {
    operator = "*";
    handleOperator(operator);
  }
});

subBtn.addEventListener("click", () => {
  if (operator === null && (currentInput !== "" || previousInput !== "")) {
    operator = "-";
    handleOperator(operator);
  }
});

addBtn.addEventListener("click", () => {
  if (operator === null && (currentInput !== "" || previousInput !== "")) {
    operator = "+";
    handleOperator(operator);
  }
});

// Result button

function calculation(num1, operator, num2) {
  switch (operator) {
    case "%":
      return num1 % num2;
      break;
    case "/":
      if (num2 !== 0) {
        return num1 / num2;
      } else {
        return "Divide by zero";
      }
      break;
    case "*":
      return num1 * num2;
      break;
    case "-":
      return num1 - num2;
      break;
    case "+":
      return num1 + num2;
      break;
    default:
      break;
  }
}

equalBtn.addEventListener("click", () => {
  let num1 = Number(previousInput);
  let num2 = Number(currentInput);
  para.innerText = displayInput;
  let result;
  if (currentInput !== "" && previousInput !== "") {
    result = calculation(num1, operator, num2);
    input.value = result;
  }

  displayInput = String(result);
  currentInput = String(result);
  previousInput = "";
  decimal = true;
  operator = null;
});

document.addEventListener("keydown", (event) => {
  let key = event.key;
  if (
    key === "1" ||
    key === "2" ||
    key === "3" ||
    key === "4" ||
    key === "5" ||
    key === "6" ||
    key === "7" ||
    key === "8" ||
    key === "9"
  ) {
    handleNumber(key);
  } else if (key === "0") {
    if (currentInput !== "0") {
      handleNumber("0");
    }
  } else if (key === "00") {
    if (currentInput !== "" && currentInput !== "0") {
      handleNumber("00");
    }
  } else if (
    key === "%" ||
    key === "/" ||
    key === "*" ||
    key === "-" ||
    key === "+"
  ) {
    if (operator === null && (currentInput !== "" || previousInput !== "")) {
      operator = key;
      handleOperator(operator);
    }
  } else if (key === ".") {
    if (decimal) {
      if (currentInput === "") {
        handleNumber("0.");
      } else {
        handleNumber(".");
      }
    }
    decimal = false;
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Enter") {
    let num1 = Number(previousInput);
    let num2 = Number(currentInput);
    para.innerText = displayInput;
    let reselt;
    if (currentInput !== "" && previousInput !== "") {
      result = calculation(num1, operator, num2);
      input.value = result;
    }

    displayInput = String(result);
    currentInput = String(result);
    previousInput = "";
    decimal = true;
    operator = null;
  } else if (key === " ") {
    currentInput = "";
    previousInput = "";
    decimal = true;
    displayInput = "";
    operator = null;
    display(displayInput);
    para.innerText = "";
  }
});

let themeBtn = document.querySelector(".theme-btn");
let changeTheme = document.querySelectorAll(".change-theme");

themeBtn.addEventListener("click", () => {
  changeTheme.forEach((changeTheme) => {
    changeTheme.classList.toggle("light");
  });

  if(document.body.classList.contains("light")) {
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
});
