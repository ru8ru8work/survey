import './assets/main.scss'
import 'bootstrap/dist/css/bootstrap.css'
import "vue-awesome-paginate/dist/style.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'
import VueAwesomePaginate from "vue-awesome-paginate";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(bootstrap)
app.use(VueAwesomePaginate)

app.mount('#app')

