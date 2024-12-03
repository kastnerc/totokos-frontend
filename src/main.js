import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './views/App.vue'
import router from './router/index.js'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.mount('#app')
