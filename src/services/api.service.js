class ApiService {

    constructor(url) {
        this.url = url
    }

    async createPost(post) {
        try {
            const request = new Request(this.url + '/create/posts.json', {
                method: 'post',
                body: JSON.stringify(post)
            })
            const response = await fetch(request);
            return await response.json()
        } catch (error) {
            console.error(error)
        }
    }
}


const apiService = new ApiService('https://vanila-js-posts.firebaseio.com/')
export  default  apiService
