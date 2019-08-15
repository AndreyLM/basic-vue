import Axios from 'axios'

export default {
    install: (Vue, { baseUrl, token }) => {
        Vue.prototype.$server = new Server(baseUrl, token)
    }
}

class Server {
    constructor(baseUrl, localStorageTokenKey) {
        this.tokenStorageKey = localStorageTokenKey
        this.baseUrl = baseUrl
        this.token = localStorage.getItem(localStorageTokenKey)
        this.loginURL = '/login'
        this.testAuthURL = '/check-auth'
        this.testLogoutURL = '/logout'
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenStorageKey, token)
    }

    login(user, password) {
        let self = this
        return self.request(self.loginURL, { user, password }, 'POST' )
    }

    testAuth() {
        let self = this
        return self.request(self.testAuthURL, {})
    }

    logout() {
        this.token = null
    }

    async request(url, data, method) {
        if (!url || typeof url != 'string') return { status: 400, msg: `Invalid url: ${url}` }
        let self = this
        method = method || 'GET'
        data = data || {}
       
        let Uri = self.baseUrl + ( url[0]!='/'? '/' : '') + url
        
        let packet = {
            method,
            url: Uri,
            headers: self.headers()
        }

        switch (method) {
            case "PUT":
            case 'POST':
                packet.data = JSON.stringify(data)
                break
            case 'GET':
                packet.params = data
        }

        try {
            let response = await Axios(packet) 
            return response.data
        } catch(error) {
            return { status: error.response.status, msg: error.response.data }
        }
    }

    headers() {
        return { 
            'Content-Type': 'application/json',
            'X-App-Token': this.token, 
        }
    }
}
