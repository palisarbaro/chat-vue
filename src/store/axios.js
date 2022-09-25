import axios from 'axios'
import store from '../store'
import { RequestAbortedError, IncorrectStatusError, UnexpectedFieldCodeError } from '../errors'
const AUTH_URL = 'https://localhost/auth'
const API_URL = 'https://localhost/api'

function generateConfig(url){
    return {
        baseURL        : url,
        withCredentials: true,
        mode           : 'cors',
        headers        : {
            'Content-Type': 'application/json',
        },
    }
}
function isAborted(error){
    if(!error.response){
        return true
    }
    if(error.response.readyState === 4 && error.response.status === 0){
        return true
    }
    return false
}

export const $api = axios.create(generateConfig(API_URL))
const $api_without_response_interceptors = axios.create(generateConfig(API_URL))
export const $auth = axios.create(generateConfig(AUTH_URL))


function responseInterceptor(response, expected_status = 'ok'){
    if(response.requestAborted){
        throw new RequestAbortedError()
    }
    if (!response.data.status || response.data.status != expected_status){
        throw new IncorrectStatusError()
    }
    if(response.data.code != undefined){
        throw new UnexpectedFieldCodeError()
    }
    return  { ...response.data, code: response.status }
}

$auth.interceptors.response.use(responseInterceptor, (error)=>{
    if(isAborted(error)){
        console.log(error, 'AUTH ABORTED')
        throw new RequestAbortedError()
    }
    return Promise.reject(responseInterceptor(error.response, 'error'))
})


$api.interceptors.response.use((r)=>r, async (error)=>{
    if(isAborted(error)){
        console.log(error, 'API ABORTED')
        throw { response: { requestAborted: true } }
    }
    console.log(error)
    try{
        if(error.response.status == 401){
            await store.dispatch('auth/token')
            const originalRequest = error.config
            return $api_without_response_interceptors.request(originalRequest)
        }
        if(error.response.status == 500){
            alert('Something went wrong')
        }
    }
    catch(e){
        error.refreshTokenFailed = true
        console.log('!!!', error)
        alert('Authentication failed')
        await store.dispatch('auth/logout')
    }
    return Promise.reject(error)
})


$api.interceptors.response.use(responseInterceptor, (error)=>{
    return Promise.reject(responseInterceptor(error.response, 'error'))
})




function requestInterceptor(config){
    const token = store.getters['auth/getToken']
    config.headers.Authorization = `Bearer ${token}`
    return config
}

$api.interceptors.request.use(requestInterceptor)
$api_without_response_interceptors.interceptors.request.use(requestInterceptor)

