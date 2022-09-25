import { $api } from '../axios'

export default {
    namespaced: true,
    actions   : {
        async fetch(ctx, message_id, count = 20){
            const res = await $api.post('/getMessagesUpToId', { message_id, count })
            return res
        },
        async send(ctx, text){
            const res = await $api.post('/sendMessage', { text })
            return res
        },
        async subscribe(ctx, lastDate){
            const res = await $api.post('/subscribe', { lastDate })
            return res
        }
    },
    state: {
    },
    mutations: {
    },
    getters: {
    }
}