<template>
	
	<div id='mainContent'>
		<div id="content">
			<div id="write">
				<textarea v-model="source"></textarea>
			</div>
			<div id="read">
				<div v-html="markdown"></div>
			</div>
		</div>
		<!--<button type="button" @click="console.log(source)">Add to favorites</button>-->
		<button type="button" @click="testEnvoie( source )">Save</button>
		<button type="button" @click="testRecuperation()">Charger les données</button>
		<input type="file" id="inputTest"/>
		<button type="button" @click="testEnvoieFichier()">Envoyer fichier externe</button>
		<!--<button type="button" @click="testEnvoie()">test fetch</button>-->
	</div>
	<!--<object data="http://localhost:5173/2_IntroPoo.pdf" type="application/pdf" width="700px" height="700px">
</object> -->

</template>

<script setup>
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
import { ref, computed, onMounted } from "vue";

//import { nextTick } from 'vue';

import "highlight.js/styles/github.css";

function sanitize(stringHTML){
	const md = new MarkdownIt({ // ╚> https://www.npmjs.com/package/markdown-it#init-with-presets-and-options
		html: true, // ╚> Active les balises HTML
		highlight: function (str, lang) { // ╚> https://www.npmjs.com/package/markdown-it#syntax-highlighting
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
				} catch (__) {}
			}
			return '';
		},
		breaks: false, // ╚> Convertit '\n' en <br>
		linkify: true , // ╚> Conversion automatique du texte URL en lien
		typographer: true, 	// ╠> Active un remplacement neutre en termes de langue + embellissement des guillemets 
							// ╚> https://github.com/markdown-it /markdown-it/blob/master/lib/rules_core/replacements.js
	});
	
	const htmlContent = md.render(stringHTML)
	
	const sanitizedHtml = DOMPurify.sanitize(htmlContent, {ADD_TAGS: ["object"], ADD_ATTR:['data']})
	
	return sanitizedHtml
}

//const source = ref("```python\nconst x = 5;\n``` \n# titre \n");
let source = ref("");

const markdown = computed(() => {
	return sanitize( source.value )
	//return source.value 
});

// Gestion de taille du textarea

const heightInputSize = computed( () => {
	return "300px";
} );

function testEnvoie( data ){
	fetch("https://l1.dptinfo-usmb.fr/~grp9/testSauvegarde.php", { // !
     
	 method: "POST",
	  
	 body: JSON.stringify({
		 string: data
	 }),
	  
	 headers: {
		 "Content-type": "application/json; charset=UTF-8"
	 }
 });
}

function testRecuperation(){
	console.log("Chargement");
	let url = "https://l1.dptinfo-usmb.fr/~grp9/testEnvoie.php"; // à changer
	fetch(url)
  		.then(response => response.text())
  		.then(data => { console.log(data); source.value = data;  })
		.then( data => { console.log( source.value ) } )
}

function testEnvoieFichier(){
	console.log("Envoie Fichier");

	const input = document.getElementById('inputTest');

	const fichier = input.files[0]; // Posibilité de faire une boucle pour input - multipee | à voir si pultiple ou simple
	const formData = new FormData();

	formData.append('fichier', fichier);

	console.log(formData);

	fetch('https://l1.dptinfo-usmb.fr/~grp9/testSauvegardeFichierBis.php', { // Url fichier PHP
  		method: 'POST',
  		body: formData
	})
	.then(response => response.text())
  	.then(data => { console.log(data);})
	;

}
/**

Espace de dépot:
// Template
<div>
		<textarea v-model="source"></textarea>
		<div v-html="markdown"></div>
	</div>
	<div>
	<div id="editor"></div>
	<div v-html="markdownBis"></div>
	</div>
	
	<div>
		<input type="file" id="fileTest" accept="image/png, image/jpeg" @change="testExport"/>
</div>

// Test ACE

import 'brace'
import 'brace/mode/html'
import 'brace/theme/github'
import 'brace/ext/language_tools'

let editor = null; // Define 'editor' outside of 'onMounted()'

onMounted(() => {
    nextTick(() => {
        editor = window.ace.edit('editor');
        editor.setTheme('ace/theme/github');
        editor.getSession().setMode('ace/mode/html');
        editor.setOptions({
            enableBasicAutocompletion: true,
            //enableSnippets: true,
            enableLiveAutocompletion: true
        });
    });
});

const markdownBis = computed(() => {
    return sanitize(editor ? editor.getValue() : "" );
});

// Fin Ace

// Test boutton
function uploadFile(event) {
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
	/*
	axios.post('http://your-server.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
	}
}
//
*/
</script>

<style score>

#content{
	display: flex;
	flex-direction: row;
    flex-wrap: nowrap;
	justify-content: space-between;
}

#write{
	width: 50%;
}

#write>textarea{
	resize: none;
	width: 100%;
	height: 300px;
}

#read{
	width: 50%;
}

#read>div{
	height: 100%;

	word-wrap: break-word;
}

#read>div>object{
	width: 100%;
}

</style>