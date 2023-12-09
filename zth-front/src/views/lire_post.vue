<template>
  <div id="post">
    <div class="post-header" v-if="creator">
      <h3>
        {{ postData.title }} créé par :
        <router-link
          :to="{ name: 'profil', params: { id: postData.id_creator, username: creator }}"
          class="creator-link"
        >
          {{ creator }}
        </router-link>
        <div class="note" v-if="creator">
      <div>
        <span class="note-label">Note:</span>
        <span class="note-value">{{ postData.grade }}</span>
        <div class="rating" v-if="userStore.user !== postData.id_creator">
          <span v-if="!userRating" v-for="i in 5" :key="i" @click="noter(i) " :class="{ 'rated': i <= userRating }">&#9733;</span>
        </div>
      </div>
      <div>
        <span class="nbr-note-label">Nombre de notes:</span>
        <span class="nbr-note-value">{{ postData.nb_note }}</span>
      </div>
    </div>
        <button class="modifier-button" v-if="userStore.user.id_user == postData.id_creator">
          <router-link :to="{ name: 'ecrire_post', params: { id: postData.id_post}}">Modifier</router-link>
        </button>
      </h3>
    </div>

    <div id="read" class="post-content" v-if="creator">
      <div v-html="markdown"></div>
    </div>
    <div class="note" v-if="creator">
      <div>
        <span class="note-label">Note:</span>
        <span class="note-value">{{ postData.grade }}</span>
      </div>
      <div>
        <span class="nbr-note-label">Nombre de notes:</span>
        <span class="nbr-note-value">{{ postData.nb_note }}</span>
      </div>
    </div>
    <div class="button" v-if="creator">
      <button @click="montrer_cacher">Montrer/cacher les annexes</button>
    </div>
    <div id="fichiers" class="file-list">
      <!-- Vos fichiers ici -->
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "./../stores/user";
import "highlight.js/styles/github.css";

export default {
  data() {
    return {
      postData: null,
      creator: null,
      markdown: null,
      affichage: true,
      userStore: useUserStore(),
      userRating: false 
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
    async noter(rating){
      await fetch("http://localhost:8080/grade/post",{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        credentials: 'include',
        body: JSON.stringify({
	      "id_user": this.userStore.user.id_user,
        "id_post": this.$route.params.id,
        "grade": rating
      })
    }).then((Response)=>{
        return Response.json()
      }).then((data)=>{
        console.log(data)
        console.log(this.userStore.user.id_user)
        this.postData.nb_note = data.nb_note
        this.postData.grade = data.grade
        this.userRating = true
      })
  },
    montrer_cacher() {
      let fichiers = document.getElementById("fichiers");
      this.affichage = !this.affichage;
      if(this.affichage){
        fichiers.style.display = "none"
      }
      else{
        fichiers.style.display = "flex"
      }

    },
  },
  created() {
    fetch("http://localhost:8080/post/" + this.$route.params.id, {
      credentials: 'include',
    })
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
        this.postData = data;
        return fetch("http://localhost:8080/user/name/" + data.id_creator, {
          credentials: 'include',
        });
      })
      .then((Response) => Response.json())
      .then((data) => {
        this.markdown = this.sanitize(this.postData.text);
        this.creator = data.username;
        let div = document.querySelector("#fichiers");
        for (let i = 0; i < Object.keys(this.postData).length - 13; i++) {
          let ext = this.postData[i].split('.').pop();
          if (ext == 'png') {
            let fichier = document.createElement('img');

            fichier.src = "http://localhost:8080/data/" + this.postData.id_post + "/" + this.postData[i];
            div.appendChild(fichier);
          } else {
            let fichier = document.createElement('iframe');
            fichier.height = 700;
            fichier.src = "http://localhost:8080/data/" + this.postData.id_post + "/" + this.postData[i];
            fichier.classList.add('file-iframe');
            div.appendChild(fichier);
            

          }
        }
      });
  },
};
</script>

<style scoped>
#post {
  margin: 5% 5%;
  /* Ajustez selon vos besoins */
}

.post-header {
  background-color: #f2f2f2;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modifier-button{
  float: right;
}
.post-header h3 {
  margin: 0;
}

.post-content {
  margin-top: 20px;
}

.file-list {
  display: none;
  flex-direction: column;
  margin-top: 20px;
  
}

.file-iframe {
  max-width: 100%;
  margin-bottom: 10px;
}

</style>
