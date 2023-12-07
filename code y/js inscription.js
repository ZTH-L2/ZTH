


if (document.getElementById("titrepage").value = "connexion") {
    console.log("connexion");
}


if (document.getElementById("titrepage").value = "inscription") {
    console.log("ins");
}


//--------------------------------------------------
// DECLARATIONS
//--------------------------------------------------




//--------------------------------------------------
// JS
//--------------------------------------------------

document.getElementById("autre").onclick = function () {
    location.href = "/Users/yass/Documents/GitHub/vuejs/se connecter.html";
};




//--------------------------------------------------
// VUES
//--------------------------------------------------


new Vue ({
    el:"#menu",
    data: {
        //image: "source/icone.png",
        titre: "Authentification",
        //mauthentifier:affichageauthentifier
    }
})


if (document.getElementById("titrepage").value == "connexion") {
    console.log("connexion");

new Vue({
    el: "#authentification",
    data: {
      errors: [],
      num: null,
      mdp: null
    },
    methods:{
      checkForm: function (e) {
        if (this.num && this.mdp) {
          return true;
        }
  
        this.errors = [];
  
        if (!this.num) {
          this.errors.push("le nom d'utilisateur/mail est vide");
        }
        if (!this.mdp) {
          this.errors.push("le mot de passe est vide");
        }
        

        
  
        e.preventDefault();
      }
    }
  })





  async function envoi() {
    console.log(username.value, password.value);
    await fetch("http://localhost:8080/user/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    }).then((Response) => {
      console.log(Response);
      if (Response.status == "200") {
        //redirection vers menu
        username.value = "";
        password.value = "";
      } else {
        error.value = "erreur donnée incorrecte";
        username.value = "";
        password.value = "";
      }
    });
  }


    
} else if (document.getElementById("titrepage").value == "inscription") {
    console.log("inscription");

    new Vue({
        el: "#authentification",
        data: {
          errors: [],
          mail: null,
          nomdutilisateur: null,
          mdp: null
        },
        methods:{
          checkForm: function (e) {
            if (this.mail && this.nomdutilisateur && this.mdp) {
              return true;
            }
      
            this.errors = [];
      
            if (!this.mail) {
              this.errors.push("le mail est vide");
            }
            if (!this.nomdutilisateur) {
                this.errors.push("le nom d'utilisateur est vide");
            }
            if (!this.mdp) {
              this.errors.push("le mot de passe est vide");
            }
            
    
            
      
            e.preventDefault();
          }
        }
      })
    
    
    
    
    
      async function envoi() {
        console.log(username.value, password.value);
        await fetch("http://localhost:8080/user/login", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        }).then((Response) => {
          console.log(Response);
          if (Response.status == "200") {
            //redirection vers menu
            username.value = "";
            password.value = "";
          } else {
            error.value = "erreur donnée incorrecte";
            username.value = "";
            password.value = "";
          }
        });
      }
}