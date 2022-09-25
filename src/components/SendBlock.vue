<template>
    <span class="send_block">
        <input class="editor" type="text" v-model="text" v-on:keyup.enter="send()" >
        <button class="send_button" @click="send()">send</button>
    </span>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    data: ()=>{
        return {
            text: ''
        }
    },
    methods: {
        send(){
            this.sendMessage(this.text || '')
            this.text = ''
        },
        ...mapActions({ sendMessage: 'message/send' })
    }
}
</script>
<style scoped>
.send_block{
    display: flex;
    flex-direction: row;
}
.editor{
    flex-grow: 1;
}
</style>