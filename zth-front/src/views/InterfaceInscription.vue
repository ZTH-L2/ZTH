<script setup>

</script>



















<template>

    <div>
        <!-- <label for="mail">mail :</label>
        <input type="email" id="mail" name="mail" required minlength="4" maxlength="500" size="20" />

        <br>

        <label for="mdp">mot de passe (8 caractères minimum) :</label>
        <input type="password" id="mdp" name="mdp" minlength="8" required />

        <br>

        <input type="submit" value="se connecter" /> -->




        <form
            id="authentification"
            @submit="checkForm"
            action="http://localhost:8080/user/register"
            method="post"
            >

            <p v-if="errors.length">
                <ul>
                <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>

            <p>
                <label for="mail">mail :</label>
                <br>
                <input
                id="mail"
                v-model="mail"
                type="mail"
                name="mail"
                >
            </p>

            <p>
                <label for="nomdutilisateur">nom d'utilisateur :</label>
                <br>
                <input
                id="nomdutilisateur"
                v-model="nomdutilisateur"
                type="text"
                name="nomdutilisateur"
                min="5"
                max="20"
                >
            </p>

            <p>
                <label for="mdp">mot de passe (5-20 caractères) :</label>
                <br>
                <input
                id="mdp"
                v-model="mdp"
                type="password"
                name="mdp"
                min="5"
                max="20"
                >
            </p>

            {{ val }}

            <p>
                <input
                type="submit"
                value="s'inscrire"
                id="sinscrire"
                >
            </p>

            

        </form>


        <button id="autre">se connecter</button>



    </div>


</template>



















<style>

    body {
        font-family: system-ui;
        text-align: center;
        justify-content: center;
        margin:2%;
    }


    #titre {
        margin-top: 15%;
    }
    

    #menu {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      margin-bottom: 5%;
    }


    #sinscrire, #seconnecter, #autre {
      background-color: rgba(51, 51, 51, 0.05);
      border-radius: 10px;
      border-width: 0;
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      line-height: 20px;
      list-style: none;
      margin: 0;
      padding: 10px 12px;
      text-align: center;
      transition: all 200ms;
      vertical-align: baseline;
      white-space: nowrap;
      touch-action: manipulation;
    }


    input {
        width: 20%;
        padding: 12px 20px;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        min-width: 300;
        border-radius: 10px;
        border-width: 2;
        margin: 2%;
    }


    h1 {
        color: #333333;
        display: inline-block;
        font-size: 40px;
        line-height: 20px;
        margin: 0;
        padding: 10px 12px;
        text-align: center;
        vertical-align: baseline;
        white-space: nowrap;
        touch-action: manipulation;
    }


    div#authentification {
        border: 2px solid;
        padding: 2%;
        border-radius: 20px;
        border-width: border-box;
    }


    button#autre {
        display: flex;
    }

</style>