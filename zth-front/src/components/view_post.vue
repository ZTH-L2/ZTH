<template>
    <div class="mesPosts" v-if="username">
      <router-link :to="{ name: 'lire_post', params: { id: id_post }}" class="post-link">{{ titre }}</router-link>
      <h2 class="creator">Créateur: {{ username["username"] }}</h2>
      <div class="post-details">
        <div class="post-info">
          <span class="note-label">Note:</span>
          <span class="note-value">{{ note }}</span>
        </div>
        <div class="post-info">
          <span class="nbr-note-label">Nombre de notes:</span>
          <span class="nbr-note-value">{{ nbr_note }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Post",
    props: ["id_post", "titre", "createur", "note", "nbr_note"],
    data() {
      return {
        username: null,
      };
    },
    async created() {
      this.username = await fetch("http://localhost:8080/user/name/" + this.createur, {
        credentials: "include",
      })
        .then((Response) => {
          return Response.json();
        })
        .then((data) => {
          return data;
        });
    },
  };
  </script>
  
  <style scoped>
  .mesPosts {
    display: inline-block;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 30px;
    margin-right: 30px; /* Espacement entre les éléments */
    border-radius: 10px;
    width: 240px;    
  }
  
  .post-link {
    font-size: 18px;
    font-weight: bold;
    color: #007bff;
    text-decoration: none;
    margin-bottom: 5px;
    display: block;
  }
  
  .creator {
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
  }
  
  .post-details {
    display: flex;
    justify-content: space-between;
    width: 100%; /* Utilisez la largeur complète de l'élément parent */
  }
  
  .post-info {
    display: flex;
    align-items: center;
  }
  
  .note-label,
  .nbr-note-label {
    font-weight: bold;
    margin-right: 5px;
  }
  
  .note-value,
  .nbr-note-value {
    color: #28a745;
  }
  </style>
  