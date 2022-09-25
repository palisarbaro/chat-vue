import { createStore } from 'vuex'
import auth from './modules/auth'
import message from './modules/message'
export default createStore({
    modules: {
        auth,
        message
    }
})