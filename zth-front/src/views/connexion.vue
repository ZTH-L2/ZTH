<script setup>
import { ref } from 'vue'
import { useUserStore } from "./../stores/user";
import { useUrlStore } from "../stores/url";

const urlStore = useUrlStore();
const userStore = useUserStore();

const username = ref('')
const password = ref('')
const error = ref('')
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
        // userStore.init()
        //userStore.user = data.id_user
        username.value = ''
        password.value = ''
        document.location.href='http://localhost:5173'
      })
    }
    else{
      error.value = "nom d'utilisateur ou mot de passe incorrect"
      username.value = ''
      password.value = ''
    }
    })
}
</script>

<template>
  <div class="connexion">
    <h1>Connexion</h1>
    <input v-model="username" placeholder="Nom utilisateur">
    <input v-model="password" type="password" placeholder="Mot de passe">
    <button @click="envoi">Se connecter</button>

    <p>{{ error }}</p>

    <p>Pas de compte ?</p>
  
    <nav>
      <RouterLink to="/inscription" class="custom-button">Inscrivez-vous !</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.connexion {
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
  padding: 0.5rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 1rem;
  margin-bottom: 0;
}

nav {
  margin-top: 0.5rem;
}

.custom-button {
  padding: 10px 20px;
  margin: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;

  
}

.custom-button:hover {
  background-color: #45a049;
}

/* Ajoutez le style ci-dessous si vous souhaitez ajuster la mise en page sur les écrans larges */
@media (min-width: 1024px) {
  .connexion {
    min-height: 75vh;
    display: flex;
    align-items: center;
  }
}
</style>
