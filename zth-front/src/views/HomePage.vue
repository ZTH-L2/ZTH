<script setup>
</script>

<template>
  <section id="hero">
    <img src="./../img/background.png" alt="Background Image">
    <h1 class="main-title">NoteSync</h1>
    <a href="#decouvrir" class="goread nicebutton">Découvrir</a>
  </section>

  <div id="decouvrir">
    <section class="home-section">
      <h1 id="titre">
        Bienvenue sur NoteSync !
      </h1>
      <div class="li">
        Découvrez une nouvelle façon de capturer, organiser et partager vos idées avec NoteSync, la plateforme de partage de prises de notes collaborative.
      </div>
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
    <div class="wrapper">
      <a href="#home-page" class="nicebutton compris">Compris !</a>
    </div>
  </div>
</template>

<style scoped>
#decouvrir {
  position: relative;
  height: calc(100vh - 4rem);
  width: 100%;
}
.compris {
  margin-bottom: 1rem;
}
.wrapper {
  height: 4rem;
}

#hero{
  position: relative;
  top: 0;
  height: calc(100vh - 4rem);
  width: 100%;
}


.nicebutton{
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #673AB7  ; /* Couleur de fond du bouton */
  color: white; /* Couleur du texte du bouton */
  padding: 10px 15px; /* Espacement interne du bouton */
  border: 1px solid #673AB7;
  border-radius: 4px; /* Ajouter un peu de bord arrondi */
  cursor: pointer;
  text-decoration: none;
  transition: all ease 0.3s;
}
.nicebutton:hover {
    border: 1px solid #673AB7;
    background-color: white;
    color: #673AB7; /* Couleur du texte du bouton */
}

.goread{
  position: absolute;
  top: calc(95% - 4rem);
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: #673AB7  ; 
  color: rgba(red, green, blue, 0); 
  padding: 10px 15px; 
  border: 1px solid #673AB7;
  border-radius: 4px; 
  cursor: pointer;
  text-decoration: none;
  transition: all ease 0.3s; */

}

.goread:hover {
  background-color: rgba(255, 255 ,255, 0%);
  color: white;
  border-color: white;
}

.main-title{
  z-index: 50;
  position: absolute;
  top: calc(50% - 4rem);
  left: 50%;
  transform: translate(-50%, -50%);
  font-size:xx-large;
  color: #4527A0;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

img {

  /* width: max(100vh,100vw); */
  /* height: max(100vh,100vw); */

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  /* filter: blur(10px); */
  background-attachment: fixed;
}


/* Vos autres styles ici */
li{
  margin-top: 10px;
  padding: 20px;
  background-color: #9575CD;
  border-radius: 30px;
  margin: 2%;
  list-style: none;
}

.li {
  background-color: #9575CD;
  border-radius: 30px;
  padding: 1rem 1rem 1rem 1rem;
}
.home-section {
  padding: 3rem;
  /* background-color: rgba(255, 255, 255, 0.2); */
  background-color: white;
  margin-bottom: 20px;
  color :#FF5722; 
  background-color: white;
  margin-bottom: 20px;
  color : black; 
  border-radius: 50px;
  margin: 2%;

}
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


</style>

