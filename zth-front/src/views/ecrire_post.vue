<template>
  <div id="mainContent">
    <div v-if="creator && postData.id_creator == userStore.id_user">
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
      <div
        v-if="this.PrintErrorTOGGLE"
        id="DivError"
        @click="this.PrintErrorTOGGLE = false"
      >
        <div v-html="this.PrintErrorString"></div>
      </div>
      
      <h2>Fichier disponible:</h2>
      <br>
      <div v-for="(item, index) in listeFichier" :key="index">
        <div class="file-link">
          <a
            :href="urlStore.api + `/data/${this.postData['id_post']}/${item}`"
            >{{ item }}</a
          >
          <p @click="Supprime(item)">X</p>
          <p @click="LienMarkDownFichier(item)">Insérer dans le MarkDown</p>
        </div>
      </div>
      <div class="button">
        <button type="button" @click="Envoie()">Sauvegarder</button>
        <input type="file" id="inputTest" multiple />
        <button type="button" @click="testEnvoieFichier()">
        Envoyer fichier externe
        </button>  
        <button type="button" @click="publier()">Publier</button>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import DOMPurify from "dompurify";
import { ref, computed, onMounted, watch } from "vue";

import "highlight.js/styles/github.css";
import { useUrlStore } from "../stores/url";
import { useRouter } from "vue-router";
import { useUserStore } from "./../stores/user";

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
      userStore: useUserStore(),

      PrintErrorTOGGLE: false,
      PrintErrorString: "",
    };
  },
  methods: {
    Supprime(fichier) {
      fetch(
        this.urlStore.api +
          "/post/file/" +
          this.postData["id_post"] +
          "/" +
          fichier,
        {
          credentials: "include",
        }
      )
        .then((Response) => {
          return fetch(this.urlStore.api + "/post/" + this.$route.params.id, {
            credentials: "include",
          });
        })
        .then((response) => response.json())
        .then((data) => {
          this.postData = data; // Mettre à jour postData avec les nouvelles données
          this.listeFichier = Object.keys(this.postData)
            .filter((key) => !isNaN(key))
            .map((key) => this.postData[key]);
        });
    },
    async publier() {
      await this.testEnvoieFichier();
      this.router.push("/");
    },
    LienMarkDownFichier(fichier) {
      let extension = fichier.split(".").pop();
      extension.toLowerCase();
      let pressePapier = "";
      let PATH = this.urlStore.api + `/data/` + this.postData["id_post"] + "/";
      let PATH_FICHIER = PATH + fichier;
      switch (extension) {
        case "png":
        case "jpeg":
        case "webp":
        case "jpg":
          pressePapier = "![Image non chargée](<" + PATH_FICHIER + ">)";
          break;
        case "pdf":
          pressePapier =
            "<object data='" +
            PATH_FICHIER +
            "' type='application/pdf'></object>";
          break;
        case "mp4":
          pressePapier =
            "<video controls><source src='" +
            PATH_FICHIER +
            "' type='video/mp4'/></video>";
          break;
        default:
          pressePapier = "[Légende](<" + PATH_FICHIER + ">)";
      }
      navigator.clipboard
        .writeText(pressePapier)
        .then(() => {
          alert("Le texte a été copié");
        })
        .catch((err) => {
          console.error("Erreur lors de la copie : ", err);
        });
    },
    Envoie() {
      const formData = new FormData();
      formData.append("id_post", this.postData["id_post"]);
      formData.append("title", this.postData["title"]);
      formData.append("privacy", this.postData["privacy"]);
      formData.append("published", this.postData["published"]);
      formData.append("text", this.source);

      fetch(this.urlStore.api + "/post/put", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
    },
    async testEnvoieFichier() {
      const formData = new FormData();
      formData.append("id_post", this.postData["id_post"]);
      formData.append("title", this.postData["title"]);
      formData.append("privacy", this.postData["privacy"]);
      formData.append("published", this.postData["published"]);
      formData.append("text", this.source);

      const input = document.getElementById("inputTest");

      for (let i = 0; i < input.files.length; i++) {
        const fichier = input.files[i];
        let indice = i + 1;
        formData.append(indice.toString(), fichier);
      }

      /**|--|**/

      let response = await fetch(this.urlStore.api + "/post/put", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.status == 400) {
        // si pas bon en 400 alors
        let message = await response.json();
        this.DivErrorPrint(message.error);
      }

      fetch(this.urlStore.api + "/post/" + this.$route.params.id, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.postData = data; // Mettre à jour postData avec les nouvelles données
          this.listeFichier = Object.keys(this.postData)
            .filter((key) => !isNaN(key))
            .map((key) => this.postData[key]);
        });
    },

    create(tag, text = null, container) {
      let el = document.createElement(tag);
      if (text) el.appendChild(document.createTextNode(text));
      container.appendChild(el);
      return el;
    },

    createTextError(SERVEUR_RESPONSE, container) {
      container.innerHTML = SERVEUR_RESPONSE;
    },

    DivErrorPrint(SERVEUR_RESPONSE) {
      this.PrintErrorTOGGLE = true;
      this.PrintErrorString = SERVEUR_RESPONSE;
    },

    sanitize(stringHTML) {
      const md = new MarkdownIt({
        html: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(str, {
                language: lang,
                ignoreIllegals: true,
              }).value;
            } catch (__) {}
          }
          return "";
        },
        breaks: false,
        linkify: true,
        typographer: true,
      });
      const styleDefault =
        "<style>img{ width:auto; height:auto; max-width: 100%; max-height: 100%; }object{ width:50rem; height:47rem; max-width: 100%; max-height: 100%; }video{ width:auto; height:auto; max-width: 100%; max-height: 100%; }</style>";
      //const styleDefault = "<style>img{ width:100%; height:auto; }object{ width:100%; height:auto; }</style>";
      const htmlContent = md.render(stringHTML);

      let sanitizedHtml = DOMPurify.sanitize(htmlContent, {
        ADD_TAGS: ["object", "img"],
        ADD_ATTR: ["data", "src"],
        FORBID_TAGS: ["style"],
      });
      sanitizedHtml = styleDefault + sanitizedHtml;

      return sanitizedHtml;
    },
  },
  created() {
    fetch(this.urlStore.api + "/post/" + this.$route.params.id, {
      credentials: "include",
    })
      .then((Response) => {
        return Response.json();
      })
      .then((data) => {
        this.postData = data;
        this.markdown = this.sanitize(this.postData["text"]);
        //this.source = this.markdown
        this.source = this.postData["text"];
        this.listeFichier = Object.keys(this.postData)
          .filter((key) => !isNaN(key))
          .map((key) => this.postData[key]);

        return fetch(this.urlStore.api + "/user/name/" + data.id_creator, {
          credentials: "include",
        })
          .then((Response) => {
            return Response.json();
          })
          .then((data) => {
            this.creator = data.username;
          });
      });

    watch(
      () => this.source,
      (newSource) => {
        this.markdown = this.sanitize(newSource);
      }
    );
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

  height: 50vh;
  overflow-x: auto;
}

textarea {
  width: 100%;
  height: 100%; /* Ajustez selon vos besoins */
  resize: none;
}

#write {
  width: 50%;

  height: 50vh;
}

.button {
  margin-top: 1em;
}

button {
  background-color: #673AB7; /* Couleur de fond du bouton */
  color: white; /* Couleur du texte du bouton */
  padding: 0.5em 1em;
  margin-right: 0.5em;
  border: 1px solid #673AB7;
  border-radius: 4px; /* Ajouter un peu de bord arrondi */
  cursor: pointer;
  text-decoration: none;
  transition: all ease 0.3s;
}
button:hover {
  border: 1px solid #673AB7;
  background-color: white;
  color: #673AB7; /* Couleur du texte du bouton */
}

a {
  color: #007bff;
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

  position: fixed;
  /*
  height:90vh;
  width :90vw;
  bottom: calc(50% - (90vh/2));
  right: calc(50% - (90vw/2)) ;
	*/
  width: 100%;
  overflow: auto;
}

#sauvegardePost {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

#fichier {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;

  padding-top: 1em;
  padding-bottom: 1em;
}

</style>
