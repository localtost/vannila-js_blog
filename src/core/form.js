export default class Form {

    constructor(element ,fields) {
        this.element = element;
        this.fields = fields;
    }
    values () {
        const obj = {};
        Object.keys(this.fields).forEach(field=>{
            obj[field]=this.element[field].value
        })
        return obj;
    }
    isValid () {
        let isFormValid = true;
        Object.keys(this.fields).forEach(field=>{
            const validators  = this.fields[field]
            let isValidField  = true;
            validators.forEach(callback =>{
                isValidField = callback(this.element[field].value) && isValidField
            })
            !isValidField ? setError(this.element[field]) : clearError(this.element[field])
            isFormValid = isFormValid && isValidField
        })
        return isFormValid
    }
    clearForm () {
        Object.keys(this.fields).forEach(field=>{
            this.element[field].value = ''
        })
    }

}
function setError ($element) {
    clearError($element)
    const  error = '<p class="validation-error">Введите коректное значение </p>'
    $element.classList.add('invalid')
    $element.insertAdjacentHTML('afterend', error )
}
function clearError ($element) {
    $element.classList.remove('invalid')
    $element.nextSibling &&
    $element.closest('.form-control').removeChild($element.nextSibling)
}