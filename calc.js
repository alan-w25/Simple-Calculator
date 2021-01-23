
class Calculator{
    constructor(previousElementText,currentElementText){
        this.previousElementText = previousElementText
        this.currentElementText = currentElementText
        this.clear()
    }

    clear() {
        this.currentOp = ''
        this.previousOp = ''
        this.operation = undefined
    }
    delete() {
        this.currentOp = this.currentOp.toString().slice(0, -1)
    }
    appendNumber(number) { 
        if(number == '.' && this.currentOp.includes('.')){
            return
        }
        this.currentOp = this.currentOp.toString() + number.toString()
        
    }
    chooseOperation(operation) {
       if(this.currentOp == ''){
           return
       }
       if(this.previousOp != ''){
           this.compute()
       }
        this.operation = operation
        this.previousOp = this.currentOp 
        this.currentOp = ''
   }
   compute() {
        let computation
        const previous = parseFloat(this.previousOp)
        const current = parseFloat(this.currentOp)

        if(isNaN(previous) || isNaN(current) ){
            return
        }
        switch (this.operation){
            case '+':
                computation = previous + current
                break
            case '-':
                computation = previous-current
                break
            case '*':
                computation = previous * current
                break
            case '÷':
                computation = previous / current
                break
            case '%': 
                computation = previous % current
                break
            default: 
                return
        }
        this.currentOp = computation 
        this.operation = undefined 
        this.previousOp = '' 
    }
    getDisplayNumber(number){
        const stringNumber = number.toString() 
        const intDigits = parseFloat(stringNumber.split('.')[0])
        const decDigits = stringNumber.split('.')[1]
        let intDisplay 
        if(isNaN(intDigits)){
                intDisplay = ''
        } else{
                intDisplay = intDigits.toLocaleString('en', {MaximumFractionDigits: 0})
        }
        if(decDigits!=null){
                return `${intDisplay}.${decDigits}`
        } else{
                return intDisplay
        }

    }        
   
   update() {
        this.currentElementText.innerText = this.getDisplayNumber(this.currentOp)
        if(this.operation != null){
            this.previousElementText.innerText = 
            `${this.getDisplayNumber(this.previousOp)} ${this.operation}`
        } else {
            this.previousElementText.innerText = ''
        }
    }
}

const numButton = document.querySelectorAll('[data-number]')
const opButton = document.querySelectorAll('[data-operation]')
const acButton = document.querySelector('[data-ac]')
const eqButton = document.querySelector('[data-equals]')
const delButton = document.querySelector('[data-del]')
const previousElementText = document.querySelector('[data-previous]')
const currentElementText = document.querySelector('[data-current]')

const calc = new Calculator(previousElementText,currentElementText)

numButton.forEach(button => {
    button.addEventListener('click', ()=> {
        calc.appendNumber(button.innerText)
        calc.update()
    })
})

opButton.forEach(button => {
    button.addEventListener('click', ()=> {
        calc.chooseOperation(button.innerText)
        calc.update()
    })
})

eqButton.addEventListener('click', button =>{
    calc.compute()
    calc.update()
})
acButton.addEventListener('click', button =>{
    calc.clear()
    calc.update()
})
delButton.addEventListener('click', button =>{
    calc.delete()
    calc.update()
})
