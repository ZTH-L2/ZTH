<script setup>
	
	import { ref, onMounted, computed } from 'vue'
	import { marked } from 'marked'
	import anyname from 'vue-sanitize'
	import sanitizeHtml from 'sanitize-html'
	
	//const sanitizeHtml = require('sanitize-html');
	
	const textInputed = ref('# titre ggegereg \n poire \n- pomme \n- banane')
	
let rightObject = ['p','h1','ul','li'];

const MarkdownOutputed = computed(() => {
  return sanitize(marked(textInputed.value), rightObject);
});

function sanitize(stringHTML, valide) {
  let test = new DOMParser().parseFromString(stringHTML, "text/html");
  test = test.querySelector('body');
  let nodes = test.querySelectorAll('*');
  
  nodes.forEach(node => {
    if (!valide.includes(node.tagName.toLowerCase())) {
      node.remove();
    }
  });
  
  return test.innerHTML;
}

/*
onMounted(() => {
let test = new DOMParser().parseFromString( marked(textInputed.value) , "text/html" )
	test = test.querySelector('body')
	console.log( test );
    let nodes = test.querySelectorAll(':not(body):not(h1):not(p)')
	
	nodes.forEach(node => {
		node.remove()
	})
	
	console.log( nodes )
	console.log( test );
    console.log( test.outerHTML.slice(6,-8) );
})
*/

</script>

<template>
	<div>
		<!--<input v-model="textInputed" placeholder="Saisir votre texte">-->
		<textarea v-model="textInputed"></textarea>
	</div>
	<div>
		<p>{{ textInputed }}</p>
		<!--<p v-html="MarkdownOutputed"></p>-->
		<vue-showdown :markdown="textInputed"/>
		<vue-showdown :markdown="MarkdownOutputed"/>
	</div>
</template>

<style>

</style>
