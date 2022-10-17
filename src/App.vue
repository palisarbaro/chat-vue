<template>
<div>
    <div v-if="isLoggedIn" class="main_container">
        <div class="header">
            <button class="exit_button" @click="logout()">log out</button>
        </div>
        <RouterView ></RouterView>
    </div>
    <LoginPage v-else-if="loaded"></LoginPage>
    <h1 v-else> LOADING...</h1>
</div>
</template>
<script>
import { RouterView } from 'vue-router'
import { mapGetters, mapActions } from 'vuex'
import LoginPage from './components/LoginPage.vue'
export default {
    components: {
        RouterView,
        LoginPage
    },
    computed: mapGetters({ isLoggedIn: 'auth/isLoggedIn' }),
    methods : mapActions({ logout: 'auth/logout', token: 'auth/token' }),
    mounted(){
        this.token().finally(()=>{this.loaded = true})
    },
    data: ()=>{
        return {
            loaded: false
        }
    }
}
</script>
<style lang="scss">
.main_container{
    width: 100%;
    height: 100%;
    position: absolute;
    left:0;
    top:0;
    display: flex;
    flex-direction: column;
}
.header{
    flex-basis: 50px;
    flex-shrink: 0;
    background-color: coral;
}
.exit_button{
    height: 100%;
    right: 0;
    float: right;
    background-color: rgb(207, 128, 91);
}
</style>