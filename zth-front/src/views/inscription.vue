<script setup>
import { ref } from "vue";
import { useUserStore } from "./../stores/user";

import { useUrlStore } from "../stores/url";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const urlStore = useUrlStore();
const mail = ref("");
const username = ref("");
const password = ref("");
const error = ref("");

function validateEmail(email) {
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function validatePassword(password) {
  var regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}
function validateUsername(Username) {
  var regex = /^[a-zA-Z0-9_-]{3,16}$/;
  return regex.test(Username);
}

async function envoi() {
  if (!validateEmail(mail.value)) {
    error.value = "Entrez un email valide";
  } else if (!validateUsername(username.value)) {
    error.value = "Entrez un nom d'utilisateur valide";
  } else if (!validatePassword(password.value)) {
    error.value = "Entrez un mot de passe valide";
  } else {
    await fetch(urlStore.api + "/user/register", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({
        username: username.value,
        mail: mail.value,
        password: password.value,
      }),
    }).then((Response) => {
      if (Response.status == "201") {
        fetch(urlStore.api + "/user/login", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        }).then((Response) => {
          if (Response.status == "200") {
            fetch(urlStore.api + "/user/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            credentials: 'include',
            body: JSON.stringify({
            "username": username.value,
            "password": password.value   
          })
          }).then((Response)=>{
            return Response.json().then((data)=>{
              userStore.setUser(data)
              username.value = ''
              password.value = ''
              router.push("/")
            })
          })
          } else {
            error.value = "erreur donnée incorrecte";
            username.value = "";
            password.value = "";
          }
        });
      }
      else{
        error.value = "erreur nom d'utilisateur ou email déjà utilisé";
      }
    });
  }
}
</script>

<template>
  <div class="inscription">
    <h1>Inscription</h1>
    <input v-model="mail" placeholder="Adresse mail" />
    <input v-model="username" placeholder="Nom utilisateur" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="envoi">S'inscrire</button>
    <p>{{ error }}</p>
    <p>Déjà un compte ?</p>
    <RouterLink to="/connexion" class="custom-button">Connectez-vous !</RouterLink>
  </div>
</template>

<style scoped>
.inscription {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

input {
  padding: 0.5rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
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

p {
  margin-top: 1rem;
  margin-bottom: 0;
}


.custom-button {
  padding: 10px 20px;
  margin: 10px;
  background-color: #F57C00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  margin-top: 6px;

}

.custom-button:hover {
  background-color: #EF6C00;
}

/* Ajoutez le style ci-dessous si vous souhaitez ajuster la mise en page sur les écrans larges */
@media (min-width: 1024px) {
  .inscription {
    min-height: 75vh;
    display: flex;
    align-items: center;
  }
}
</style>