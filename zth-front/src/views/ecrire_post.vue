<template>
  <div id='mainContent'>
    <div v-if="creator" >
      <div class="post-header">
      <h3>titre : {{ postData.title }}</h3>
      <h3>createur : {{ creator }}</h3>
    </div>
      <div id="content">
        <div id="write">
          <textarea v-model="source"></textarea>
        </div>
        <div id="read">
          <div v-html="markdown"></div>
        </div>
      </div>

      <h2>Fichier disponible:</h2>
      <div  v-if="this.PrintErrorTOGGLE" 
            id="DivError"
            @click="this.PrintErrorTOGGLE = false;"
            >
            <div v-html="this.PrintErrorString"></div>
      </div>
      <div v-for="(item, index) in listeFichier" :key="index">
        <div class="file-link">
          <a :href=" urlStore.api + `/data/${this.postData['id_post']}/${item}`">{{ item }}</a>
          <p @click="Supprime(item)">X</p>
          <p @click="LienMarkDownFichier(item)">Insérer dans le MarkDown</p>
        </div>
      </div>

      

      <div class="button">
        <button type="button" @click="Envoie()">Save</button>
        <input type="file" id="inputTest" multiple />
        <button type="button" @click="testEnvoieFichier()">Envoyer fichier externe</button>
        <button type="button" @click="publier()">Publier</button>

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
import { useUrlStore } from "../stores/url";
import { useRouter } from "vue-router";


export default {
  data() {
    return {
      postData: null,
      creator: null,
      markdown: null,
      source: "",
      listeFichier: [],
      urlStore: useUrlStore(),
      router: useRouter(),

      PrintErrorTOGGLE: false,
      PrintErrorString: ""
    };
  },
  methods: {
    Supprime(fichier){
        fetch(this.urlStore.api + "/post/file/"+ this.postData["id_post"] + "/" + fichier, { 
          credentials: 'include'
        }).then((Response)=>{
          return fetch(this.urlStore.api + "/post/" + this.$route.params.id, {credentials: 'include'});
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
    async publier(){
      await this.testEnvoieFichier()
      this.router.push("/")
    },
    LienMarkDownFichier(fichier){
        let extension = fichier.split('.').pop();
        extension.toLowerCase();
        let pressePapier = "";
        let PATH = this.urlStore.api + `/data/` + this.postData['id_post'] + "/";
        let PATH_FICHIER = PATH + fichier;
        switch(extension){
          case 'png':
          case 'jpeg':
          case 'webp':
          pressePapier = "![Image non chargée](<"+PATH_FICHIER+">)";
          break;
          case 'pdf':
          pressePapier = "<object data='"+PATH_FICHIER+"' type='application/pdf'></object>";
          break;
          case 'mp4':
          pressePapier = "<video controls><source src='"+PATH_FICHIER+"' type='video/mp4'/></video>";
          break;
          default:
          pressePapier = "[Légende](<"+PATH_FICHIER+">)";
        };
        navigator.clipboard.writeText(pressePapier)
        .then(() => {
            alert('Le texte a été copié');
        })
        .catch(err => {
            console.error('Erreur lors de la copie : ', err);
        });
    },
    Envoie() {
      const formData = new FormData();
      formData.append('id_post', this.postData["id_post"]);
      formData.append('title', this.postData["title"]);
      formData.append('privacy', this.postData["privacy"]);
      formData.append('published', this.postData["published"]);
      formData.append('text', this.source);

      fetch(this.urlStore.api + "/post/put", { 
        method: "POST",
        credentials: 'include',
        body: formData
      });
    },
    async testEnvoieFichier(){
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

  /**|--|**/

  let response = await fetch(this.urlStore.api + "/post/put", {
    method: "POST",
    credentials: 'include',
    body: formData
  });

  console.log(response);

  if(response.status==400){       // si pas bon en 400 alors
    let message = await response.json();
      this.DivErrorPrint( message.error );
      //console.log( await response.json());
    }

    fetch(this.urlStore.api + "/post/" + this.$route.params.id, {credentials: 'include'})  
        .then(response => response.json())
        .then(data => {
          this.postData = data; // Mettre à jour postData avec les nouvelles données
          this.listeFichier = Object.keys(this.postData)
          .filter(key => !isNaN(key))
          .map(key => this.postData[key]);
        })
    },

    create(tag, text=null, container) {
	let el = document.createElement(tag)
	if (text)
		el.appendChild(document.createTextNode(text))
	container.appendChild(el)
	return el
},

createTextError( SERVEUR_RESPONSE, container ){
  console.log(SERVEUR_RESPONSE);
  container.innerHTML = SERVEUR_RESPONSE;
},

    DivErrorPrint( SERVEUR_RESPONSE ){
      //console.log(SERVEUR_RESPONSE);
      /*
        let HTML_BODY = document.querySelector("body");

        let container = document.createElement("div");
        container.setAttribute("style","height:90vh; width :90vw; bottom: calc(50% - (90vh/2)); right: calc(50% - (90vw/2)) ;")
		
		    let bouttonClose = this.create("div",null,container)
		    let CharClose = this.create("p","❌",bouttonClose) //Img ?
		    bouttonClose.setAttribute("id", "buttonClose")
		
		    //Evenement bouttonClose vider caractéristique et caché
		    bouttonClose.addEventListener("click",function(){
			    console.log("Affichage erreur ouverture")
			    container.parentNode.removeChild(container) // suppression de container
		    })
		
		this.createTextError( SERVEUR_RESPONSE, container );

        HTML_BODY.appendChild(container);
        */
       console.log("yap");
       this.PrintErrorTOGGLE = true;
       this.PrintErrorString = SERVEUR_RESPONSE;
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
      const styleDefault = "<style>img{ width:auto; height:auto; max-width: 100%; max-height: 100%; }object{ width:auto; height:auto; max-width: 100%; max-height: 100%; }video{ width:auto; height:auto; max-width: 100%; max-height: 100%; }</style>";
      //const styleDefault = "<style>img{ width:100%; height:auto; }object{ width:100%; height:auto; }</style>";
      const htmlContent = md.render(stringHTML);
      
      let sanitizedHtml = DOMPurify.sanitize(htmlContent, {ADD_TAGS: ["object","img"], ADD_ATTR:['data','src'],FORBID_TAGS: ['style']});
      sanitizedHtml = styleDefault + sanitizedHtml;

      return sanitizedHtml
    }
  },
  created() {
    fetch(this.urlStore.api + "/post/" + this.$route.params.id, {credentials: 'include'}).then((Response)=>{
      return Response.json()
    }).then((data)=>{
      console.log(data)
      this.postData = data
      this.markdown = this.sanitize(this.postData["text"])
      //this.source = this.markdown
      this.source = this.postData["text"]
      this.listeFichier = Object.keys(this.postData)
      .filter(key => !isNaN(key))
      .map(key => this.postData[key]);

      return fetch(this.urlStore.api + "/user/name/" + data.id_creator, {credentials: 'include'}).then((Response)=>{
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
.post-header {
  background-color: #f2f2f2;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  align-items: center;
}

#mainContent {
  margin: 20px;
}

h3 {
  color: #333;
}

#content {
  display: flex;
  padding-bottom: 3em;
}

#read {
  width: 50%;
  padding-right: 1em;
  padding-left: 10px;
}

textarea {
  width: 100%;
  height: 300px; /* Ajustez selon vos besoins */
  resize: none;
}

#write {
  width: 50%;
}

.button {
  margin-top: 1em;
}

button {
  padding: 0.5em 1em;
  margin-right: 0.5em;
  cursor: pointer;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

a {
  color: #007BFF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

p {
  color: red;
  cursor: pointer;
  margin-left: 0.5em;
}

p:hover {
  text-decoration: underline;
}

.file-link {
  display: flex;
  align-items: center;
}


.file-link p {
  margin-left: 1em;
  cursor: pointer;
  color: red;

}

.file-link p:hover {
  text-decoration: underline;
}

#DivError {
  background-color: red;

  position:fixed;
  /*
  height:90vh;
  width :90vw;
  bottom: calc(50% - (90vh/2));
  right: calc(50% - (90vw/2)) ;
	*/
  width: 100%;
  overflow: auto;
}

</style>