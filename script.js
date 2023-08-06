// TODO: Show operation above screen
// TODO: Fix 0 after click on operation
// TODO: Change result to new number

let runningTotal = 0
let buffer = '0'
let previousOperator
let previousNumber

let fullOperation = ''
const screen = document.querySelector('.screen')
const full = document.querySelector('.full-operation')

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value)
  } else {
    handleNumber(value)
  }

  if (value === '←') {
    fullOperation = fullOperation.substring(0, fullOperation.length - 2)
    full.innerText = fullOperation
  } else if (value === '=') {
    fullOperation += value + ' ' + buffer
    full.innerText = fullOperation
  } else if (value !== 'C') {
    fullOperation += value + ' '
    full.innerText = fullOperation
  } else {
    fullOperation = ''

    full.innerText = fullOperation
  }
  screen.innerText = buffer
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = '0'
      runningTotal = 0
      break
    case '=':
      if (previousOperator === null) {
        return
      }
      flushOperation(parseInt(buffer))
      previousOperator = null
      buffer = runningTotal
      runningTotal = 0
      break
    case '←':
      if (buffer.length === 1) {
        buffer = '0'
      } else {
        buffer = buffer.substring(0, buffer.length - 1)
      }
      break
    case '+':
    case '−':
    case '×':
    case '÷':
      handleMath(symbol)
      break
  }
}

function handleMath(symbol) {
  if (buffer === '0') {
    return
  }

  const intBuffer = parseInt(buffer)
  if (runningTotal === 0) {
    runningTotal = intBuffer
  } else {
    flushOperation(intBuffer)
  }
  previousOperator = symbol
  buffer = '0'
}

function flushOperation(intBuffer) {
  if (previousOperator === '+') {
    runningTotal += intBuffer
  } else if (previousOperator === '−') {
    runningTotal -= intBuffer
  } else if (previousOperator === '×') {
    runningTotal *= intBuffer
  } else if (previousOperator === '÷') {
    runningTotal /= intBuffer
  }
}

function handleNumber(numberString) {
  if (buffer === '0') {
    buffer = numberString
  } else {
    buffer += numberString
  }
}

function init() {
  document
    .querySelector('.calc-buttons')
    .addEventListener('click', function (event) {
      buttonClick(event.target.innerText)
    })
}

init()

function handleScreen(value) {
  if (value === document.querySelector('.screen')) {
    screen.innerText = value
  }
}
