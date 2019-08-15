<template lang="pug">
    v-row.fill-height(
        align="center"
        justify="center"
    )
        v-col(
            cols="12"
        )
            v-card.elevation-12
                v-toolbar.dark(
                    color="primary lighten-2"
                )
                    v-toolbar-title Chat 
                        small ({{ connMessage }})
                    v-spacer
                v-card-text.grey.lighten-4
                    v-row.mt-3(
                        justify="center"
                    )
                        v-col#messages(
                            ref="messageBox"
                            flat
                            cols="11"
                            style="min-height:350px; border-radius:10px;overflow:scroll; max-height:500px;"
                        ) 
                            v-row(
                                glutter
                                v-for="message in messages"
                                :key="message.uuid"
                            )
                                v-col(
                                    cols="3"
                                ) 
                                    p.grey.lighten-1.ml-2.pa-2(
                                        style="border-radius:5px;"
                                    ) {{ message.token }} 
                                        br
                                        span 
                                            small {{ message.time | moment("DD/MM/YYYY hh:mm:ss") }}

                                v-col(
                                    cols="9"
                                )
                                    p.white.elevation-12.ml-2.pa-3(
                                            style="border-radius:10px;"
                                        ) {{ message.message }}
                            
                v-card-actions.dark.lighten-5
                    v-row
                        v-col
                            v-form(
                                width="100%"
                            )
                                v-row(
                                    justify="center"
                                )
                                    v-col(
                                        cols="11"
                                    )
                                        v-textarea(
                                            solo
                                            outlined
                                            v-model="message"
                                            label="Enter message...."
                                            required
                                        )
                                        v-btn(
                                            color="primary"
                                            @click.prevent="send(message)"
                                            :disabled="message ? false : true"
                                        ) Send

</template>

<script>

import { mapGetters } from "vuex"

export default {
    data() {
        return {
            message: "",
        }
    },
    computed: {
        ...mapGetters({ connMessage: "chat/connMessage", messages: "chat/messages" })
    },
    methods: {
        send(message) {
            console.log(this.$refs.messageBox)
            this.$store.dispatch("chat/send", message)
            this.$refs.messageBox.scrollTop = this.$refs.messageBox.scrollHeight
        },
    },
    created() {
   
    }
}
</script>

