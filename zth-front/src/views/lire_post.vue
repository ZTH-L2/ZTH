<script>
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "./../stores/user";
import "highlight.js/styles/github.css";
import { useUrlStore } from "../stores/url";
import { useRouter } from "vue-router";
import PopUp from "@/components/PopUp.vue";


// added to do the init()

// userStoreC.init();

export default {
  data() {
    return {
      postData: null,
      creator: null,
      markdown: null,
      affichage: true,
      del:false,
      // userStore: useUserStore(),
      userStore: useUserStore(),
      userRating: false,
      hoveredRating: null,
      urlStore: useUrlStore(),
      router: useRouter()
    };
  },
  methods: {
    supprimer(){
      this.del = true
    },
    async delete_post(){
      await fetch(this.urlStore.api + "/post/" + this.postData.id_post, {
        method: "DELETE",
        credentials: "include"
      }).then((Response)=>{
        this.router.push("/")
      })
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

      return sanitizedHtml;
    },
    async noter(rating){
      await fetch(this.urlStore.api + "/grade/post",{
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
        this.postData.nb_note = data.nb_note
        this.postData.grade = data.grade
        this.userRating = true
        this.hoveredRating = null
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
    setHoveredRating(rating) {
      this.hoveredRating = rating;
    },
    clearHoveredRating() {
      this.hoveredRating = null;
    },
  },
  created() {
    fetch(this.urlStore.api + "/post/" + this.$route.params.id, {
      credentials: 'include',
    })
      .then((Response) => Response.json())
      .then((data) => {
        this.postData = data;
        return fetch(this.urlStore.api + "/user/name/" + data.id_creator, {
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

            let fichier = document.createElement('a');
            fichier.href = this.urlStore.api + "/data/" + this.postData.id_post + "/" + this.postData[i];
            fichier.innerText = this.postData[i]
            div.appendChild(fichier);
          }
      });
  },
};
</script>

<script setup>
import CommentsComp from "../components/Comments/CommentsComp.vue"

</script>





<template>
  <div id="post" v-if="userStore.isLoggedIn">
    <div class="post-header" v-if="creator">
      <div class="left-section">
        <h3 class="post-title">{{ postData.title }}</h3>
        <h3 class="post-creator">
           créé par :
          <router-link
            :to="{ name: 'profil', params: { id: postData.id_creator, username: creator }}"
            class="creator-link"
          >
            {{ creator }}
          </router-link>
        </h3>
      </div>

      <div class="right-section">
        <h3>
          <span
            v-if="!userRating"
            v-for="i in 5"
            :key="i"
            @click="noter(i)"
            @mouseover="setHoveredRating(i)"
            @mouseout="clearHoveredRating"
            class="note"
          >
            &#9733;
          </span>
          <span v-if="hoveredRating !== null" class="hovered-rating-text">
            {{ hoveredRating }}
          </span>
        </h3>

        <h3><span class="note-label">Note : {{ postData.grade }}</span></h3>

        <h3><span class="nbr-note-label">Nombre de notes : {{ postData.nb_note }}</span></h3>

        <router-link
          :to="{ name: 'ecrire_post', params: { id: postData.id_post }}"
          class="modifier-button"
          v-if="userStore.user?.id_user == postData.id_creator"
        >
          Modifier
        </router-link>
        <button @click="supprimer" class="supprimer-button" v-if="userStore.user.id_user == postData.id_creator">Supprimer</button>
      </div>
    </div>

    <div id="read" class="post-content" v-if="creator">
      <div v-html="markdown"></div>
    </div>

    <div class="button" v-if="creator">
      <button @click="montrer_cacher" v-if="Object.keys(postData).length > 13">Montrer/cacher les annexes</button>
    </div>

    <div id="fichiers" class="file-list">
      <!-- Vos fichiers ici -->
    </div>
    <PopUp v-if="del" message="Voulez vous vraiment supprimer ce post ?" confirmMessage="supprimer" @confirm="delete_post" @close="del = false"></PopUp>


    <!-- espace commentaire -->
    <div class="comment-zone">
      <CommentsComp v-if="postData" :user="userStore.user" :idPost="postData.id_post"></CommentsComp>
    </div>
  </div>
</template>

<!-- for comments -->


<style scoped>
#post {
  margin-left: 1rem;
  margin-top: 1rem;
}
.post-title{
  max-width: 25rem;
  overflow: hidden;
  /* margin-right: 3rem; */
}

.post-creator {
  padding-left: 1rem;
}
.creator-link {
  text-decoration: none;
}

.post-header {
  background-color: #f2f2f2;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  width: 70%;
  display: flex;
}

.right-section {
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.post-content{
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #dce1e3;
}
.modifier-button {
  float: right;
  background-color: #007BFF; /* Couleur de fond du bouton */
  color: white; /* Couleur du texte du bouton */
  padding: 10px 15px; /* Espacement interne du bouton */
  border: none; /* Supprimer la bordure du bouton */
  border-radius: 4px; /* Ajouter un peu de bord arrondi */
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s; /* Ajouter une transition pour une animation fluide */
}

.modifier-button:hover {
  background-color: #0056b3;
}



.supprimer-button {
  float: right;
  background-color: red; /* Couleur de fond du bouton */
  color: white; /* Couleur du texte du bouton */
  padding: 10px 15px; /* Espacement interne du bouton */
  border: none; /* Supprimer la bordure du bouton */
  border-radius: 4px; /* Ajouter un peu de bord arrondi */
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s; /* Ajouter une transition pour une animation fluide */
}

.supprimer-button:hover {
  background-color: #6E0A08;
}
.post-header h3 {
  margin: 0;
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

.note {
  cursor: pointer;
}

.hovered-rating-text {
  font-size: 0.8rem;
  color: #555;
}


/* comments */

.comment-zone{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>