<template>

<div class="login-box">
    <div class="inp">
        <label>login:</label>
        <input type="text" v-model="username">
    </div>
    <div class="inp">
        <label>password:</label>
        <input type="password" v-model="password">
    </div>
    <div class="logreg">
        <button @click="login">
            login
        </button>
        <button @click="registrate">
            registrate
        </button>
    </div>
</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    components: {
    },
    data(){
        return{
            username: '',
            password: '',
        }
    },
    methods: {
        ...mapActions({ _login: 'auth/login', _registrate: 'auth/registrate', token: 'auth/token' }),
        login(){
            this._login({ username: this.username, password: this.password }).catch(resp=>{
                console.log(resp)
                alert(resp.error)
            }).then(()=>this.token())
        },
        registrate(){
            this._registrate({ username: this.username, password: this.password }).then(()=>{
                this.username = ''
                this.password = ''
                alert('You have successfully registered')
            }).catch(resp=>{
                console.log(resp)
                alert(resp.error)
            })
        },

    },
}
</script>
<style scoped lang="scss">
.logreg {
    background-color: aqua  ;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    button {
        background-color: aquamarine;
        flex-grow: 1;
        text-align: center;
        border-radius: 5px;
    }
}
.inp {
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    label {
        align-self: center;
        font-weight: bold;
    }
}
.login-box {
    width: 300px;
    height: 150px;
    background-color: burlywood;
    position: absolute;
    top:50%;
    left:50%;
    border-radius: 30px;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    padding-left: 5px;
    padding-right: 5px;
}
</style>