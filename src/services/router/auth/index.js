import Login from "@/components/auth/Login"
import Registration from "@/components/auth/Registration"


export default [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    }
]