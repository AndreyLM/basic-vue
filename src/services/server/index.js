import Axios from 'axios'

export default {
    install: (Vue, { baseUrl, token }) => {
        Vue.prototype.$server = new Server(baseUrl, token)
    }
}

class Server {
    constructor(baseUrl, token) {
        this.baseUrl = baseUrl
        this.token = token

        this.loginURL = this.baseUrl + '/auth/login'
        this.testAuthURL = this.baseUrl + '/auth/check'
        this.testLogoutURL = this.baseUrl + '/auth/logout'
    }

    login(email, password) {
        let self = this
        return self.request(self.loginURL, { email, password }, 'POST' )
    }

    testAuth() {
        let self = this
        return self.request(self.testAuthURL, {})
    }

    logout() {
        this.token = null
    }

    request(url, data, method) {
        if (!url || typeof url != 'string') return reject('Invalid request')
        let self = this
        method = method || 'GET'
        data = data || {}

        return new Promise( (resolve, reject) => {
            let Uri = self.baseUrl + ( url[0]!='/'? '/' : '') + url

            let packet = {
                method,
                url: Uri,
                headers: self.headers()
            }
            switch (method) {
                case "PUT":
                case 'POST':
                    packet.data = qs.stringify(data)
                    break
                case 'GET':
                    packet.params = data
            }

            Axios(packet)
                .then(res => resolve(res.data))
                .catch(reject)
        })
    }

    headers() {
        return { 
            'Content-Type': 'application/json',
            'X-App-Token': self.token, 
        }
    }
}
