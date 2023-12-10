<script setup>
import { ref } from 'vue'
import { useUserStore } from "./../stores/user";
import { useUrlStore } from "../stores/url";

const urlStore = useUrlStore();
const userStore = useUserStore();

const username = ref('')
const password = ref('')
async function envoi() {
  await fetch(urlStore.api + "/user/login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: 'include',
    body: JSON.stringify({
	  "username": username.value,
    "password": password.value
    
  })
  }).then((Response)=>{
    
    if (Response.status == "200"){

      return Response.json().then((data)=>{
        userStore.setUser(data)
        //userStore.user = data.id_user
        username.value = ''
        password.value = ''
        document.location.href='http://localhost:5173'
      })
    }
    else{
      error.value = "erreur nom d'utilisateur ou mot de passe incorrecte"
      username.value = ''
      password.value = ''
    }
    })
}
</script>

<template>

<div class="connexion">
  <h1>Connexion</h1>
  <input v-model="username" placeholder="nom utilisateur">
  <input v-model="password" type="password" placeholder="mot de passe">
  <button @click="envoi()">Envoyer</button>

  <p>Pas de compte ?</p>
  
  <nav>
      <RouterLink to="/inscription">Inscrivez-vous !</RouterLink>
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
