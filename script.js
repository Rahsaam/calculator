class Calculator {
    constructor (previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operator = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operator) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computaion 
        let prev = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operator){
            case '+':
                computaion = prev + current
                break
            case '*':
                computaion = prev * current
                break
            case '-':
                computaion = prev - current
                break
            case '/':
                computaion = prev / current
                break
            default:
                return
        }
        this.currentOperand = computaion
        this.previousOperand = ''
        this.operator = undefined

    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.operator != null) {
        this.previousOperandTextElement.innerText = 
        `${this.previousOperand} ${this.operator}`
        
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons= document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previus-operation]')
const currentOperandTextElement = document.querySelector('[data-current-operation]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

