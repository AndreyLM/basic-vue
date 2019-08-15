import * as codes from "./chat_codes"

export default {
    namespaced: true,
    state: {
        connCode: 0,
        connMessage: "",
        socket: null,
        messages: []
    },
    getters: {
        connMessage: (state) => state.connMessage,
        connCode: (state) => state.connCode,
        messages: (state) => state.messages
    },
    mutations: {
       SetSocket(state, socket) {
           state.socket = socket
       },
       SetConnMessage(state, message) {
            state.connMessage = message
       },
       SetCode(state, code) {
           state.connCode = code
       },
       AddMessage(state, message) {
           state.messages.push(message)
       }    
    },
    actions: {
        connect(context, url) {
            let socket = new WebSocket(url)
            socket.onopen = () => {
                context.commit("SetConnMessage", "Connection established")
                context.commit("SetCode", codes.OPEN)
                context.commit("SetSocket", socket)
            }
            
            socket.onmessage = (data) => {
                let msg = JSON.parse(data.data)
                context.commit("AddMessage", msg)
            }
            
            socket.onerror = () => {
                context.commit("SetConnMessage", "Connection error")
                context.commit("SetCode", codes.ERROR)
                setTimeout(() => {
                    if (context.state.connCode != codes.OPEN ) {
                        context.dispatch("connect", url) 
                    } else {
                        socket = null
                    }
                }, 5000)
            }      

            socket.onclose = () => {
                context.commit("SetConnMessage", "Connection closed")
                context.commit("SetCode", codes.CLOSED)
                setTimeout(() => {
                    if (context.state.connCode != codes.OPEN  ) {
                        context.dispatch("connect", url) 
                    } else {
                        socket = null
                    }
                }, 5000)
            }
        },
        send(context, message) {
            context.state.socket.send(
                JSON.stringify({
                    token: "token",
                    message: message
                })
            )
        }
    }
}