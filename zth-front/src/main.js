import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import writeText from './components/writeText.vue'

const app = createApp(App)
const canvasText = createApp(writeText)

app.use(createPinia())
app.use(router)

app.mount('#app')
canvasText.mount('#canvasText')