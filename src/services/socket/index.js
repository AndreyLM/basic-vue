export default {
    install: (Vue, { url }) => {
        Vue.prototype.$socket = new Socket(url)
    }
}

class Socket {
    constructor(url) {
        this.url = url
        this.conn = null
    }

    connect() {
        this.conn = new WebSocket(this.url)
    }

    close() {
        this.conn.close()
    }
}
