<template>
    <div id = post>
        <div v-if="creator">
          <h3> {{ postData.title }}  créé par : {{ creator }}</h3>
        </div>
        <div id="read">
				    <div v-html="markdown"></div>
			    </div>
        <div id="fichiers">
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







export default {
  data() {
    return {
      postData: null,
      creator: null,
      markdown: null,
    };
  },
  methods: {
  sanitize(stringHTML) {
      const md = new MarkdownIt({
        html: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
            } catch (__) {}
          }
          return '';
        },
        breaks: false,
        linkify: true,
        typographer: true,
      });

      const htmlContent = md.render(stringHTML);
      const sanitizedHtml = DOMPurify.sanitize(htmlContent, { ADD_TAGS: ['object'], ADD_ATTR: ['data'] });
      return sanitizedHtml;
    },
  },
  created() {
    
    fetch("http://localhost:8080/post/" + this.$route.params.id, {
      credentials: 'include'
    }).then((Response)=>{
      
        return Response.json()
    }).then((data)=>{
        console.log(data)
        this.postData = data
        return fetch("http://localhost:8080/user/name/" + data.id_creator, {
          credentials: 'include'

        }).then((Response)=>{
          return Response.json()
    }).then((data)=>{
        this.markdown = this.sanitize(this.postData.text)
        this.creator = data.username;
        let div = document.querySelector("#fichiers")
        for (let i = 0; i < Object.keys(this.postData).length -13; i++){
          let ext = this.postData[i].split('.').pop()
          if (ext == "png")
          {
            let fichier = document.createElement("img")
            fichier.width = 400
            fichier.height = 400
            fichier.src = "http://localhost:8080/data/" + this.postData.id_post + "/" + this.postData[i]
            div.appendChild(fichier)
          }
          else
          {
            let fichier = document.createElement("iframe")
            fichier.height = 700
            fichier.src = "http://localhost:8080/data/" + this.postData.id_post + "/" + this.postData[i]
            fichier.classList.add("file-iframe");
            div.appendChild(fichier)
          }
        }
    })
    })
  },
};
</script>

<style scoped>
#post{
  margin-top: 10%;
  margin-left: 10%
}

#fichiers {
  display: flex;
  flex-direction: column;
}

/* Ajoutez une règle pour la classe "file-iframe" */
.file-iframe {
  max-width: 100%; /* Définissez la largeur maximale à 100% */
}
</style>