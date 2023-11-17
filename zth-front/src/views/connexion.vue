<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

function envoi() {
  console.log(username, password)
  // passer en php ?
  username.value = ''
  password.value = ''
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
