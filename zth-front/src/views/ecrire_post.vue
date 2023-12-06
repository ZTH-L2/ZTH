<template>
  <!--<p> {{ postData }} </p>-->

  <div id='mainContent'>
    <div v-if="creator">
      <h3> {{ postData.title }} </h3>
      <h3> {{ creator }} </h3>

      <div id="content">
        <div id="write">
          <textarea v-model="source"></textarea>
        </div>
        <div id="read">
          <div v-html="markdown"></div>
        </div>
      </div>
	  
      <h2>
          Fichier disponible:
        </h2>
      <div v-for="(item, index) in listeFichier" :key="index">
        <a :href="`http://localhost:8080/data/${this.postData['id_post']}/${item}`"> {{ item }} </a> <!-- Changer URL -->
      </div>

      <div class="button">
        
        <button type="button" @click="Envoie()">Save</button>

        <input type="file" id="inputTest" multiple/>
        <button type="button" @click="testEnvoieFichier()">Envoyer fichier externe</button>
      </div>

    </div>
  </div>

</template>

<script>
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
import { ref, computed, onMounted, watch } from "vue";

import "highlight.js/styles/github.css";

export default {
  data() {
    return {
      postData: null,
      creator: null,
      markdown: null,
      source: "",
      listeFichier: [],
    };
  },
  methods: {
    Envoie() {
      const formData = new FormData();
      formData.append('id_post', this.postData["id_post"]);
      formData.append('title', this.postData["title"]);
      formData.append('privacy', this.postData["privacy"]);
      formData.append('published', this.postData["published"]);
      formData.append('text', this.source);

      fetch("http://localhost:8080/post/put", { 
        method: "POST",
        body: formData
      });
    },
    testEnvoieFichier(){
  console.log("Envoie Fichier");

  const formData = new FormData();
  formData.append('id_post', this.postData["id_post"]);
  formData.append('title', this.postData["title"]);
  formData.append('privacy', this.postData["privacy"]);
  formData.append('published', this.postData["published"]);
  formData.append('text', this.source);

  const input = document.getElementById('inputTest');

  for (let i = 0; i < input.files.length; i++) {
    const fichier = input.files[i];
    let indice = i +1;
    formData.append( indice.toString() , fichier);
  }

  console.log(formData);
  fetch("http://localhost:8080/post/put", { 
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => { 
    console.log(data);
    return fetch("http://localhost:8080/post/" + this.$route.params.id);
  })
  .then(response => response.json())
  .then(data => {
    this.postData = data; // Mettre à jour postData avec les nouvelles données
    this.listeFichier = Object.keys(this.postData)
    .filter(key => !isNaN(key))
    .map(key => this.postData[key]);
  })
  .then( (_) => {console.log('yop');} )
  .catch(error => console.error('Error:', error));
    },
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

      const htmlContent = md.render(stringHTML)
      const sanitizedHtml = DOMPurify.sanitize(htmlContent, {ADD_TAGS: ["object"], ADD_ATTR:['data']})

      return sanitizedHtml
    }
  },
  created() {
    fetch("http://localhost:8080/post/" + this.$route.params.id).then((Response)=>{
      return Response.json()
    }).then((data)=>{
      this.postData = data
      this.markdown = this.sanitize(this.postData["text"])
      this.source = this.markdown
      this.listeFichier = Object.keys(this.postData)
      .filter(key => !isNaN(key))
      .map(key => this.postData[key]);

      return fetch("http://localhost:8080/user/name/" + data.id_creator).then((Response)=>{
        return Response.json()
      }).then((data)=>{
        this.creator = data.username;
      })
    })

    watch(() => this.source, (newSource) => {
      this.markdown = this.sanitize(newSource);
    });
  },
};
</script>

<style scoped>
object {
  width: 100%;
}
#content{
  display: flex;
  padding-bottom: 3em;
}
#read{
  width: 50%;
}
textarea {
    width: 90%;
    height: 100%;
    resize: none;
}
#write{
  width: 50%;
}
</style>