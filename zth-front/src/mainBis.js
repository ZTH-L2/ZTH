import { createApp } from 'vue'
import { VueShowdown } from 'vue-showdown'
//import anyname from 'vue-sanitize'
import VueDOMPurifyHTML from 'vue-dompurify-html';

import writeText from './components/writeText.vue'

const canvasText = createApp(writeText)

canvasText.component('VueShowdown', VueShowdown)

canvasText.use(VueDOMPurifyHTML);

canvasText.mount('#MainCanvasText')