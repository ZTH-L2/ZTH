<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
async function envoi() {
  console.log(username.value, password.value)
  await fetch("http://localhost:8080/user/login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify({
	  "username": username.value,
    "password": password.value
    
  })
  }).then((Response)=>{
    return Response.json().then((data)=>{
      console.log(data);
    })
    if (Response.status == "200"){
      //redirection vers menu
      username.value = ''
      password.value = ''

    }
    else{
      error.value = "erreur donnée incorrecte"
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
