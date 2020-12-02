import Component
    from "../core/component";
import Form
    from "../core/form";
import Validators
    from "../core/validators";

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
function submitHandler (event) {
    event.preventDefault()
    const isFormValid = this.form.isValid()
    if(isFormValid){
    const formData = {
        type:this.$el.type.value,
        ...this.form.values()
    }
    this.form.clearForm()
    }
}