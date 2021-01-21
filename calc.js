
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

   }
   update() {
        this.currentElementText.innerText = this.currentOp
        this.previousElementText.innerText = this.previousOp
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

equalsButton.addEventListener('click',()=>{
    calc.compute()
})