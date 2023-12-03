<template>
    <p> {{ postData }} </p>
    <div>
        <div v-if="creator">
          <h3> {{ postData.title }} </h3>
          <h3> {{ creator }} </h3>
          <div id="read">
				    <div v-html="markdown"></div>
			    </div>
        </div>
        <div>
          
            <img src="http://localhost:8080/data/14/pp_bouc.png" alt="Description de l'image">
            <iframe src="http://localhost:8080/data/14/test_pdf.pdf" type="application/pdf" ></iframe>
            <iframe id="textFrame" width="50" height="100" src="http://localhost:8080/data/14/test.txt"></iframe>
        </div>
    </div>

</template>

<script>
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




export default {
  data() {
    return {
      postData: null,
      creator: null,
      creator: null,
    };
  },
  created() {
    fetch("http://localhost:8080/post/" + this.$route.params.id).then((Response)=>{
        return Response.json()
    }).then((data)=>{
        console.log(data)
        this.postData = data
        console.log(this.postData)
        return fetch("http://localhost:8080/user/name/" + data.id_creator).then((Response)=>{
          return Response.json()
    }).then((data)=>{
        const markdown = sanitize("testrgfrtbfsthb")
        this.creator = data.username;
    })
    })
  },
};
</script>

<style scoped>

</style>