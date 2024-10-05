class Calculator {
	contructor(previousOperandTextElement, currentOperandTextElement){
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
	}
	clear(){
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	}
	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}
	appendNumber(number){
		if(number === '.' && this.currentOperand.includes('.')){
			return
		}
		if (this.currentOperand !== undefined){
		this.currentOperand = this.currentOperand.toString() + number.toString()
		}
		else{
			this.currentOperand = number
		}
	}
	chooseOperation(operation) {
		if (this.currentOperand === ''){
			return
		}
		if (this.previousOperand !== undefined){
			this.compute()
		}
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}
	compute(){
		if (this.previousOperand === undefined || this.currentOperand === undefined){
			return
		}
		let computation
		const prev = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		
		switch (this.operation) {
			case '+':
				computation = prev + current
			break
			case '-':
				computation = prev - current
			break
			case '*':
				computation = prev * current
			break
			case '/':
				computation = prev / current
			break
			default:
				return
		}
		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ''
	}

	getDisplayNumber(number){
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0])
		const decimalDigits = stringNumber.split('.')[1]
		let integerDisplay
		if (integerDigits === undefined) {
			integerDisplay = ''
		}	else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0
			})
		}
		if (decimalDigits != null) {
			return integerDisplay + '.' + decimalDigits
		} else {
			return integerDisplay
		}
	}

	updateDisplay() {
		currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
		if (this.previousOperand !== undefined){
		previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand)
		if (this.operation != null){
		previousOperandTextElement.innerText = this.previousOperand + ' ' + this.operation
		} else {
			previousOperandTextElement.innerText = ''
		}
		}
		if (currentOperandTextElement.innerText === 'NaN' || currentOperandTextElement.innerText === '-NaN'){
			currentOperandTextElement.innerText = ''
		}
	}
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement)

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

equalsButton.addEventListener('click', () => {
	if (currentOperandTextElement.innerText !== ''){
		calculator.compute()
		calculator.updateDisplay()
	}
})

allClearButton.addEventListener('click', () => {
		calculator.clear()
		calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
		calculator.delete()
		calculator.updateDisplay()
})