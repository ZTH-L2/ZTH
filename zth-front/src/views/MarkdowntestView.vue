<template>
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
</template>

<script setup>
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
import { ref, computed, onMounted } from "vue";

import { nextTick } from 'vue';

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
	*/
}
//

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
	
	const sanitizedHtml = DOMPurify.sanitize(htmlContent)
	
	return sanitizedHtml
}

const source = ref("```python\nconst x = 5;\n``` \n# titre \n");

const markdown = computed(() => {
	return sanitize( source.value )
});


</script>

<style score>

#editor{
	background-color: red;
	
	width: 200px;
	height: 200px;
	
}


textarea {
    overflow: hidden;
    resize: none;
	width: 100%
}



</style>