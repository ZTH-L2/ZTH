<script setup>
</script>

<template>
  <div id="home">
    <img src="./../img/background.png" alt="Background Image">
    <section class="home-section">
      <h1 id="titre">
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
  font-size: 20px;
}

img {
  width: 100%;
  height: 93vh;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  filter: blur(10px);
  background-attachment: fixed;
}

/* Vos autres styles ici */
li{
  margin-top: 10px;
  padding: 20px;
  background-color: rgb(69, 39, 160, 0.4);
  border-radius: 30px;
  margin: 2%;
}
.home-section {
  padding: 50px;
  background-color: rgb(149, 117, 205, 0.4);
  margin-bottom: 20px;
  color : black; 
  border-radius: 50px;
  margin: 2%;

#titre {
    padding-bottom: 3%;
    text-align: center;
    font-size: 50px;
    color :#4527A0;
    vertical-align: middle;
}

#pres {
  right: 10px;
  max-width:20em;
  top: 0%;
  width: 10%;
  vertical-align: middle;
  right:0%
}


}
</style>

