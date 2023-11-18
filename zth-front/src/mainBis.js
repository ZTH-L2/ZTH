import { createApp } from 'vue'
import { VueShowdown } from 'vue-showdown'
//import anyname from 'vue-sanitize'

import writeText from './components/writeText.vue'

const canvasText = createApp(writeText)

canvasText.component('VueShowdown', VueShowdown)

canvasText.mount('#MainCanvasText')