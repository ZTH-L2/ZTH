<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div id="home">
    <img src="./../img/background.png" alt="Background Image">
    <section class="home-section">
      <h1>
        Bienvenue sur NoteSync !
      </h1>
    Découvrez une nouvelle façon de capturer, organiser et partager vos idées avec NoteSync, la plateforme de partage de prises de notes collaborative.
  </section>
    <section class="home-section">
      <h3>
        Pourquoi NoteSync ?
      </h3>
      <ul>
        <li>
          Organisation Intuitive : Classez vos notes par matieres, ajoutez des étiquettes, et naviguez facilement à travers vos contenus. NoteSync simplifie la gestion de vos informations pour une productivité optimale.
        </li>
        <li>
          Partage Sécurisé : Partagez vos notes avec vos collègues, amis ou camarades de classe en toute sécurité.
        </li>
      </ul>
    </section>
<section class="home-section"><h3>Comment Ça Marche ?</h3>
  <ul>
    <li>
      Inscrivez-vous : Créez votre compte en quelques clics et commencez à explorer les fonctionnalités de NoteSync.
    </li>
    <li>
      Créez Vos Notes : Commencez à prendre des notes dans des documents clairs et bien organisés.
    </li>
    <li>
      Soyez Productif : Profitez d'une expérience utilisateur fluide et concentrez-vous sur ce qui compte vraiment - vos idées !
    </li>
  </ul>
</section>
  </div>
</template>

<style scoped>
#home {
  position: relative;
}

img {
  width: 100%;
  height: 91vh;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

/* Vos autres styles ici */

.home-section {
  padding: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 20px 0;
}
</style>
