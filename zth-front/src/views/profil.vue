<template>
    <div id="profil">
      <h1>Profil de {{ $route.params.username }}</h1>
  
      <div class="posts-section">
        <h3>Posts écrits par {{ $route.params.username }} :</h3>
        <div class="post-list">
          <Post
            v-for="post in postData"
            :key="post[0]"
            :id_post="post[0]"
            :titre="post[2]"
            :createur="post[1]"
            :note="post[4]"
            :nbr_note="post[5]"
          ></Post>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Post from './../components/view_post.vue';
  
  export default {
    data() {
      return {
        postData: null,
      };
    },
    components: {
      Post,
    },
    async created() {
      fetch("http://localhost:8080/post/user/" + this.$route.params.id, {
        credentials: 'include',
      })
        .then((Response) => Response.json())
        .then((data) => {
          this.postData = data;
        });
    },
  };
  </script>
  
  <style scoped>
  #profil {
    margin: 5% 5%;
  }
  
  h1 {
    font-size: 2em;
    color: #333;
  }
  
  .posts-section {
    margin-top: 20px;
  }
  
  .post-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; /* Espacement entre les posts */
  }
  
  /* Styles spécifiques pour les posts */
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
    width: 100%;
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
  