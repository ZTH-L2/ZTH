<script setup>
	
	import { ref, onMounted, computed } from 'vue'
	import { marked } from 'marked'
	
	const arrayInputed = ref([ ref('# titre1') , ref('# titre2') ])
	
let rightObject = ['p','h1','h2','ul','li'];

const arrayOutputed = computed(() => {
  return arrayInputed.value.map(input => sanitize(marked(input.value), rightObject));
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
	let list = ref([])
	console.log(list)
	
	console.log(arrayInputed[0].value)
	
})
*/

//Méthode pour resize auto les textareas
function autoResizeTextArea(event) {
            event.target.style.height = 'auto';
            event.target.style.height = event.target.scrollHeight + 'px';
	}

//Méthode pour inserer un nouveau markdown
function addMarkdown(){
	arrayInputed.value.push( ref('') )
}

</script>

<template>

	<div id="writeTextBody">

		<div id="add" @click="addMarkdown">
			<!--<button @click="addMarkdown"> Add </button>-->
			Add
		</div>

		<div>
			<div v-for="inputed in arrayInputed">
				<!--<input v-model="textInputed" placeholder="Saisir votre texte">-->
				<textarea v-model="inputed.value" @input="autoResizeTextArea"></textarea>
			</div>
		</div>
		
		<div>
			<div v-for="outputed in arrayOutputed">
				<!--<p>{{ outputed }}</p>-->
				<vue-showdown :markdown="outputed"/>
			</div>
		</div>
		
	</div>
	
</template>

<style score>

#writeTextBody{
	background-color: red;
}


textarea {
    overflow: hidden;
    resize: none;
	width: 100%
}



</style>
