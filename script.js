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

let displayInput = "";
let decimal = false;

const display = (value) => {
  displayInput += value;
  input.value = displayInput;
};
// Number button

document.querySelectorAll(".number-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    let value = btn.innerText;
    display(value);
  });
});

// Zero button

const zeroFun = () => {
  if (displayInput !== "0") {
    display("0");
  }
};

zeroBtn.addEventListener("click", () => {
  zeroFun();
});

// Double Zero button

const dubleZeroFun = () => {
  if (displayInput !== "" && displayInput !== "0") {
    display("00");
  }
};

dblZeroBtn.addEventListener("click", () => {
  dubleZeroFun();
});

// Dot button

const dotFun = () => {
  if (!decimal) {
    if (displayInput === "") {
      display("0.");
    } else {
      display(".");
    }
  }
  decimal = true;
};

dotBtn.addEventListener("click", () => {
  dotFun();
});

// All Clear button

const allClear = () => {
  decimal = false;
  displayInput = "";
  display(displayInput);
  para.innerText = "";
};

acBtn.addEventListener("click", () => {
  allClear();
});

// Backspace button

function backspace() {
  displayInput = displayInput.slice(0, -1);
  input.value = displayInput;
  let lastString = displayInput.split(/[+\-*%/]/);
  decimal = false;
  for (let char of lastString[lastString.length-1]) {
    if (char === ".") {
      decimal = true;
      break;
    } else {
      decimal = false;
    }
  }
}

backspaceBtn.addEventListener("click", () => {
  backspace();
});

// Operator button

const handleOperator = (operator) => {
  decimal = false;
  display(operator);
};

modulusBtn.addEventListener("click", () => {
  if (displayInput !== "") {
    handleOperator("%");
  }
});

divideBtn.addEventListener("click", () => {
  if (displayInput !== "") {
    handleOperator("/");
  }
});

mulBtn.addEventListener("click", () => {
  if (displayInput !== "") {
    handleOperator("*");
  }
});

subBtn.addEventListener("click", () => {
  if (displayInput !== "") {
    handleOperator("-");
  }
});

addBtn.addEventListener("click", () => {
  if (displayInput !== "") {
    handleOperator("+");
  }
});

// Equal button

const equal = () => {
  if (displayInput !== "") {
    let result;
    try {
      result = eval(displayInput);
      para.innerText = displayInput;
      input.value = result;
      displayInput = String(result);
      for (let char of displayInput) {
        if (char === ".") {
          decimal = true;
          break;
        } else {
          decimal = false;
        }
      }
    } catch (error) {
      input.value = error.name;
    }
  }
};

equalBtn.addEventListener("click", () => {
  equal();
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
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
    display(key);
  } else if (key === "0") {
    zeroFun();
  } else if (
    key === "%" ||
    key === "/" ||
    key === "*" ||
    key === "-" ||
    key === "+"
  ) {
    if (displayInput !== "") {
      handleOperator(key);
    }
  } else if (key === ".") {
    dotFun();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Enter") {
    equal();
  } else if (key === " ") {
    allClear();
  }
});

let themeBtn = document.querySelector(".theme-btn");
let changeTheme = document.querySelectorAll(".change-theme");

const setDarkTheme = () => {
  changeTheme.forEach((changeTheme) => {
    changeTheme.classList.remove("light");
  });
};

const setLightTheme = () => {
  changeTheme.forEach((changeTheme) => {
    changeTheme.classList.add("light");
  });
};

if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", document.body.classList[1]);
} else if (localStorage.getItem("theme") === "light") {
  setLightTheme();
  themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
} else {
  setDarkTheme();
  themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {
  let theme = localStorage.getItem("theme");
  if (theme === "light") {
    setDarkTheme();
    localStorage.setItem("theme", "dark");
  } else {
    setLightTheme();
    localStorage.setItem("theme", "light");
  }

  if (document.body.classList.contains("light")) {
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
});
