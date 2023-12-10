<script setup>
import { ref } from "vue";
import { useUserStore } from "./../stores/user";
const userStore = useUserStore();
import { useUrlStore } from "../stores/url";

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
              document.location.href='http://localhost:5173'
            })
          })
          } else {
            error.value = "erreur donnée incorrecte";
            username.value = "";
            password.value = "";
          }
        });
      }
    });
  }
}
</script>

<template>
  <div class="inscription">
    <h1>Inscription</h1>
    <input v-model="mail" placeholder="adresse mail" />
    <input v-model="username" placeholder="nom utilisateur" />
    <input v-model="password" type="password" placeholder="mot de passe" />
    <button @click="envoi()">Envoyer</button>
    {{ error }}
    <p>déjà un compte ?</p>
    <nav>
      <RouterLink to="/connexion">Connectez-vous !</RouterLink>
    </nav>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
