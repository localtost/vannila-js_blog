import Component
    from "../core/component";
import FireBase from '../services/api.service'
import TransformService
    from "../services/transform.service";

export class Posts extends Component {
    constructor(id,loader) {
        super(id);
        this.loader = loader;
    }
    init() {
        this.$el.addEventListener('click',handlerClick.bind(this))
    }
    async onShow() {
         this.loader.show()
         const data = await FireBase.getPosts()
         this.posts = TransformService.fbObjectToArray(data)
         const html = this.posts.map(post=>renderPosts(post)).join(' ')
         this.loader.hide()
         this.$el.insertAdjacentHTML('afterbegin',html)
    }
    onHide() {
        this.$el.innerHTML = null
    }
}
function renderPosts (post){
    const tag = post.type==='news'?
        ` <li class="tag tag-blue tag-rounded">Новость</li>`:
        ` <li class="tag tag-rounded">Заметка</li>`;
    const button =
        !(JSON.parse(localStorage.getItem('favorites')) || []).find(el=>el.id===post.id)
        ? `<button data-id="${post.id}" data-name="${post.title}" class="button-round button-small button-primary">Сохранить</button>`:
        `<button data-id="${post.id}"  data-name="${post.title}" class="button-round button-small button-danger">Удалить</button>`
   return `<div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
         ${tag}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${post.date}</small>
        ${button}
      </div>
    </div>`
}
function handlerClick (event) {
    const $element = event.target;
    const id = $element.dataset.id
    const name = $element.dataset.name;
    if (id){
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        if (favorites.includes(id)){
            $element.textContent = 'Сохранить'
            $element.classList.add('button-primary')
            $element.classList.remove('button-danger')
          favorites = favorites.filter(post=>post.id!==id)
        }else {
            $element.textContent = 'Удалить'
            $element.classList.add('button-danger')
            $element.classList.remove('button-primary')
            favorites.push({id,name})
        }
        localStorage.setItem('favorites',JSON.stringify(favorites))
    }
}