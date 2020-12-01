import Component
    from "../core/component";

export default class Header extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        const visited = localStorage.getItem('visited')
        if (visited) {
            this.hide()
        }
        const btn = this.$el.querySelector('.js-header-start')
        btn.addEventListener('click', buttonHandler.bind(this))
    }
}

function buttonHandler() {
    localStorage.setItem('visited', JSON.stringify(true))
    this.hide();
}
