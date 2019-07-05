import axios from 'axios'

class Api {
    constructor() {
        this.baseUrl = 'http://api.github.com/repos/'
    }

    getUserInfo(repository) {
        return axios.get(this.baseUrl + repository)
    }
}

const api = new Api()
export default api