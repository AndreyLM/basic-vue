<template lang="pug">
    v-layout.fill-height.align-center.justify-center
        v-flex.sm12.sm8.md4
            v-card.elevation-12
                v-toolbar.dark(color="primary")
                    v-toolbar-title Registration
                    v-spacer
                v-card-text
                    v-form
                        v-text-field(
                            prepend-icon="person",
                            name="login",
                            label="Login",
                            type="text"
                            v-model="login"
                        )
                        v-text-field(
                            prepend-icon="email",
                            name="email",
                            label="Email",
                            type="text"
                            v-model="email"
                        )
                        v-text-field(
                            prepend-icon="lock",
                            name="password",
                            label="Password",
                            type="password",
                            v-model="password"
                        )
                        v-text-field(
                            prepend-icon="lock",
                            name="confirm_password",
                            label="Confirm Password",
                            type="password",
                            v-model="confirm_password"
                        )
                v-card-actions
                    v-spacer
                    v-btn(
                        color="default",
                        @click.prepend="toLogin"
                    ) Login
                    v-btn(
                        color="primary",
                        @click.prepend="registration"
                    ) registration
                   
                   
                       

</template>

<script>
export default {
    name: "login",
    data: () => {
        return {
            login: "",
            email: "",
            password: "",
            confirm_password: "",
        }
    },
    methods: {
        async registration() {
            let resp = await this.$store.dispatch("registration", {
                login: this.login,
                email: this.email,
                password: this.password,
                confirm_password: this.confirm_password,
            })
            if ( resp.status != 200 ) {
                this.$notify({
                    group: "alerts",
                    title: resp.status,
                    text: resp.msg,
                    type: 'error',
                })
                return
            }
            this.$router.push({ path: '/' })
        },
       toLogin() {
           this.$router.push({ path: '/login' })
       }
    }
}
</script>

