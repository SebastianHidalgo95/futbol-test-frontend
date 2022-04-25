import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Toast from "vue-toastification"  //Libreria para Alertas
import "vue-toastification/dist/index.css";

window.$ = window.jQuery = require('jquery');
// import store from "./vue/store"  
axios.defaults.withCredentials = false
axios.defaults.baseURL = 'https://futbol-test.herokuapp.com/api/'

//Intenta ver si hay alguna token en localstorage
const token = localStorage.getItem('token')

if ( token ) {
    //En caso de token el header se asigna a la token guardada
    axios.defaults.headers.common['Authorization'] = token
}
const app = createApp(App)
app.use(Toast)
app.use(router)
app.mount('#app')
