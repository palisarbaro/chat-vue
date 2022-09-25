import { $auth } from '../axios'

export default {
    namespaced: true,
    actions   : {
        async login(ctx, { username, password }){
            const res = await $auth.post('/login', { username, password })
            ctx.commit('login', { username, token: res.accessToken })
            return res
        },
        async logout(ctx){
            try{
                const res = await $auth.post('/logout')
                ctx.commit('logout')
                return res
            }
            catch(e){
                ctx.commit('logout')
                throw e
            }
        },
        async registrate(ctx, { username, password }){
            const res = await $auth.post('/createuser', { username, password })
            return res
        },
        async token(ctx){
            const res = await $auth.post('/token')
            ctx.commit('token', { token: res.accessToken, username: localStorage.getItem('username') })
            return res
        }
    },
    state: {
        username: null,
        token   : null,
    },
    mutations: {
        login(state, { username, token }){
            localStorage.setItem('username', username)
            state.username = username
            state.token = token
        },
        logout(state){
            state.username = null
            localStorage.removeItem('username')
            state.token = null
        },
        token(state, { token, username }){
            state.token = token
            state.username = username
        }
    },
    getters: {
        isLoggedIn(state){
            return !!(state.username && state.token)
        },
        getToken(state){
            return state.token
        }
    }
}