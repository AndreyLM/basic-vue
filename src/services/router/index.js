import Vue from "vue"
import VueRouter from "vue-router"
import AuthRoutes from "./auth"
import ChatRoutes from "./chat"

Vue.use(VueRouter)

let allRoutes = []
allRoutes = allRoutes.concat(AuthRoutes, ChatRoutes)

export default new VueRouter({
    mode: "history",
    routes: allRoutes
})