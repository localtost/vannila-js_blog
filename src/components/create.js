import Component
    from "../core/component";
import Form
    from "../core/form";
import Validators
    from "../core/validators";
import  fireBase  from "../services/api.service";

export class Create extends Component {
    constructor(id) {
        super(id);
    }
    init() {
        this.$el.addEventListener('submit',submitHandler.bind(this))
        this.form = new Form(this.$el,{
            title : [Validators.required],
            fulltext :[Validators.required,Validators.minLength(8)]
        })

    }
}
async function submitHandler (event) {
    event.preventDefault()
    const isFormValid = this.form.isValid()
    if(isFormValid){
    const formData = {
        type:this.$el.type.value,
        date:new Date().toLocaleDateString(),
        ...this.form.values()
    }
    await fireBase.createPost(formData)
    this.form.clearForm()
    alert('Пост успешно создан!')
    }
}