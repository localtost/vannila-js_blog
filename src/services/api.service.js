class ApiService {

    constructor(url) {
        this.url = url
    }

    async createPost(post) {
        try {
            const request = new Request(`${this.url}/create/posts.json`, {
                method: 'post',
                body: JSON.stringify(post)
            })
            return await useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }

    async getPosts() {
        try {
            const request = new Request(`${this.url}/create/posts.json`, {
                method: 'get'
            })
           return await useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }
    async getPostById (id) {
        try {
            const request = new Request(`${this.url}/create/posts/${id}.json`, {
                method: 'get'
            })
            return await useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }
}
async function useRequest (request) {
    const response = await fetch(request);
    return await response.json()
}

const fireBaseConnect = new ApiService('https://vanila-js-posts.firebaseio.com')
export default fireBaseConnect
