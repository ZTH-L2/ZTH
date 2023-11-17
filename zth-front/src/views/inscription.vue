<script setup>
import { ref } from 'vue'

const mail = ref('')
const username = ref('')
const password = ref('')
const error = ref('')
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function envoi() {
  if (!validateEmail(mail.value)){
    error.value = "Entrez un email valide"
  }
  else if (username.value.length < 5){
    error.value = "Entrez un nom d'utilisateur de plus de 5 caractères"
    console.log(error.value)
  }
  else if (password.value.length < 5){
    error.value = "Entrez un mot de passe de plus de 5 caractères"
  }
  else{
    // envoi data php
    mail.value = ''
    username.value = ''
    password.value = ''
    error.value = ''
  }

}
</script>

<template>

<div class="connexion">
  <h1>Inscription</h1>
  <input v-model="mail" placeholder="adresse mail">
  <input v-model="username" placeholder="nom utilisateur">
  <input v-model="password" type="password" placeholder="mot de passe">
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
  