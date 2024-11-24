const display = document.querySelector(".display")
const clear = document.querySelector("#clear")
let operatorButton
let clickableOperator = true
let clickableNum = true
let num1
let num2

clear.addEventListener("click", () => {
    display.textContent = "0"
    operatorButton.classList.remove("clicked-operator")
    clickableOperator = true
    clickableNum = true
    num1 = ""
    num2 = ""
})

const backspace = document.querySelector("#backspace")

backspace.addEventListener("click", () => {
  clickableNum = true

  if (display.textContent === "Und"){
    display.textContent = "0"
  }

  display.textContent = display.textContent.slice(0, -1)

  if (display.textContent.length === 0){
    display.textContent = "0"
  }
})

const negative = document.querySelector("#negative")              

negative.addEventListener("click", () => {
  if (display.textContent === "-") {
    display.textContent = "0"
  } else if (display.textContent.includes("-") || 
      display.textContent === "Und") {
    display.textContent = display.textContent.replace("-", "")
  } else if (display.textContent[0] === "0") {
    display.textContent = "-"
  } else {
    display.textContent = "-" + display.textContent
  }
})

const point = document.querySelector("#point")
 
point.addEventListener("click", () => {
  if (display.textContent.includes(".")) {
    return
  } else if (display.textContent === "") {
    display.textContent = display.textContent + "0."
  } else {
    display.textContent = display.textContent + "."
  }
})

const buttonsContainer = document.querySelector(".buttons-container")

let result 
let clickableEqual
let isResultDisplayed = false

buttonsContainer.addEventListener("click", (event) => {
  num2 = ""
  if (!clickableNum) return

  const target = event.target
  if (target.classList.contains("number")) {
    if (display.textContent.includes("0.")) {
      display.textContent += target.textContent
    } else if (display.textContent[0] === "0" ||
        isResultDisplayed === true) {
      display.textContent = target.textContent
      isResultDisplayed = false
    } else {
      display.textContent += target.textContent
    }   

    if (num2 === "") clickableEqual = true 
  }

  if(display.textContent.length >= 11) clickableNum = false
  if(display.textContent.length === 11 && 
     display.textContent.includes("-")) clickableNum = true
})

let operator

buttonsContainer.addEventListener("click", (event) => {
  if (!clickableOperator) return

  operatorButton = event.target
  if (operatorButton.classList.contains("operator")) {
    num1 = parseFloat(display.textContent)
    if (isNaN(num1)) {
      return
    } else {
      operator = operatorButton.textContent
      display.textContent = ""
      clickableOperator = false
      clickableNum = true
      operatorButton.classList.add("clicked-operator")
    }
  }
})

buttonsContainer.addEventListener("click", (event) => {
  if (!clickableEqual) return
  const target = event.target

  if (target.id === "equal") {
    num2 = parseFloat(display.textContent)
    result = operate(num1, operator, num2) 

    if (result === Infinity || 
        result === -Infinity) { 
      display.textContent = "Und"
    } else if (isNaN(result)) {
      return
    } else {
      display.textContent = scientificNote(result)
    }

    num1 = ""
    clickableOperator = true
    clickableEqual = false
    clickableNum = true
    isResultDisplayed = true
    operatorButton.classList.remove("clicked-operator")
  }
})

function operate (num1, operator, num2) {
  if (operator === "+") {
    return num1 + num2
  } else if (operator === "-") { 
    return num1 - num2
  } else if (operator === "*") {
    return num1 * num2
  } else {
    return num1 / num2     
  }
}

function scientificNote (result) {
  let resultAsString = result.toString()
  if (resultAsString.length >= 12){
    return result.toExponential(2);
  } else {
    return result
  }
}

const buttonSound = new Audio("./sounds/touch.wav")

buttonsContainer.addEventListener("click", () => {
  buttonSound.play()
})