import { createApp } from 'vue'
import { VueShowdown } from 'vue-showdown'
//import anyname from 'vue-sanitize'

import writeText from './components/writeText.vue'

let defaultOptions = {
  allowedTags: ['div', 'a', 'p'],
  allowedAttributes: {
    'a': ['href']
  }
}
const canvasText = createApp(writeText)

canvasText.component('VueShowdown', VueShowdown)
//canvasText.use(anyname)

canvasText.mount('#MainCanvasText')