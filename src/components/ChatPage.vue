<template>
<div class="chat">
    <div class="messages" @scroll="scrollHandler" ref="scroll">
        <div class="loader" @click="loadPrevMessages">{{ !message_loading? 'Load more': 'Loading...'}}</div>
        <OneMessage v-for="message in messages" :message="message" v-bind:key="message.id">

        </OneMessage>
    </div>
    <SendBlock class="send_block"></SendBlock>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import  OneMessage from './OneMessage.vue'
import SendBlock from './SendBlock.vue'
export default {
    components: {
        OneMessage,
        SendBlock,
    },
    data(){
        return {
            messages       : [],
            message_loading: true,
            pageOpened     : true
        }
    },
    methods: {
        ...mapActions({ getMessages: 'message/fetch', subscribe: 'message/subscribe', sendMessage: 'message/send' }),
        updateMessages(new_messages){
            this.messages = new_messages.concat(this.messages)
            this.messages = [ // remove duplicates
                ...new Map(
                    this.messages.map(x => [x.id, x])
                ).values()
            ]
            this.messages = this.messages.sort((a, b)=> Date.parse(a.date) > Date.parse(b.date))
        },
        scrollDown(){
            this.$nextTick(() => {
                this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight
            })
        },
        async loadLoop(){
            // eslint-disable-next-line no-constant-condition
            while(this.pageOpened){
                try{
                    let possibleShift = 50
                    let scrolledToBottom = this.$refs.scroll.scrollTop + this.$refs.scroll.offsetHeight + possibleShift > this.$refs.scroll.scrollHeight
                    const resp = await this.subscribe(new Date())
                    this.updateMessages(resp.messages)
                    if(scrolledToBottom) {
                        this.scrollDown()
                    }
                    //let num = new Number(this.messages.at(-1).text)
                    // if (!isNaN(num)){
                    //     this.sendMessage(num + 1)
                    // }
                }
                catch(e){
                    console.log()
                }
            }
        },
        scrollHandler(){
            if(this.$refs.scroll.scrollTop === 0){
                this.loadPrevMessages()
            }
        },
        async loadPrevMessages(){
            this.message_loading = true
            try{
                let resp = await this.getMessages(this.messages[0]?.id)
                this.updateMessages(resp.messages)
            }
            catch(e){
                alert(e.error)
            }
            finally{
                this.message_loading = false
            }
        }
    },
    async mounted(){

        await this.loadPrevMessages()
        this.scrollDown()
        this.loadLoop()

        //this.subscribe(this.messages[0].date).then((r)=>console.log(r))
    },
    beforeUnmount(){
        this.pageOpened = false
    }
}
</script>

<style scoped lang="scss">
.loader {
    background-color: rgb(176, 175, 187);
    border-radius: 4px;
    margin: 10px;
    padding: 5px;
    word-wrap: break-word;
    text-align: center;
    &:hover{
        cursor: pointer
    }
}

.chat{
    width: 100%;
    height: 95%;
    flex-grow: 1;
    background-color: bisque;
    display: flex;
    flex-direction: column;
}
.send_block{
    width:99%;
    flex-basis: 50px;
    flex-shrink: 0;
    margin: 0.5%;
}
.messages{
    padding: 5px;
    overflow-y:scroll;
    flex-grow: 1;
    height: 300px;
}
</style>