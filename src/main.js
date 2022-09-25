import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import store from './store'
import ChatPage from './components/ChatPage.vue'

const routes = [
    { path: '/', component: ChatPage },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
let app = createApp(App)

app.use(store).use(router).mount('#app')
