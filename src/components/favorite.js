import Component
    from "../core/component";
import fireBase from '../services/api.service'

export class Favorite extends Component {
    constructor(id) {
        super(id);
    }
    init() {
        this.$el.addEventListener('click',linkHandlerClick.bind(this))
    }

    onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        const html = renderFavorites(favorites)
        this.$el.insertAdjacentHTML('afterbegin', html)
    }
    onHide() {
        this.$el.innerHTML=''
    }
}
async function linkHandlerClick (event) {
    event.preventDefault();
    if(event.target.classList.contains('js-link')){
      const  response = await fireBase.getPostById(event.target.textContent);
      console.log(response)
    }
}
function renderFavorites(list = []) {
    if (list.length) {
       return `<ul>${list.map(el=>`<li><a href="#" class="js-link">${el.id}</a></li>`).join(' ')}</ul>`
    }
    return '<p class="center">Список пуст</p>'
}


