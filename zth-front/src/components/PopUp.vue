<script setup>
import { onMounted, onUnmounted} from 'vue';

defineProps({
    message: String,
    confirmMessage: String,

})

const emit = defineEmits(['confirm', 'close'])

function confirm() {
  emit('confirm')
  emit('close')
}

onMounted(()=>{
    let body = document.querySelector("body");
    body.classList.add("unclickable");
})

onUnmounted(()=>{
    let body = document.querySelector("body");
    body.classList.remove("unclickable");
})

</script>
<template>
    <div>
        <div class="popup">
            <p class="popup-element">{{ message }}</p>
            <div class="popup-element">
                <button class="popup-button confirm" @click="confirm">{{ confirmMessage }}</button>
                <button class="popup-button cancel" @click="$emit('close')">Annuler</button>
            </div>
            
        </div>
        <div class="background"></div>
        
    </div>
</template>

<style scoped>

.popup {
    position: fixed;
    background-color: white;
    border-radius: 4%;
    z-index: 110;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: all;

    display: flex;
    flex-direction: column;
    align-items: center;

}

.popup-element {
    margin: 1rem 1rem 1rem 1rem;
}

.popup-button {
    margin: 0rem 1rem 0rem 1rem;
}

.unclickable{
    pointer-events: none;
    /* unscrollable */
    overflow: hidden;
}

.background{
    opacity: 50%;
    background-color: grey;
    position: fixed;
    left: 0;
    top:0;
    width: 100vw;
    height: 100vh;
    z-index: 105;
}


button {
    background-color:white; /* Couleur de fond du bouton */
    color: white; /* Couleur du texte du bouton */
    padding: 10px 15px; /* Espacement interne du bouton */
    border: 1px solid white;
    border-radius: 4px; /* Ajouter un peu de bord arrondi */
    cursor: pointer;
    text-decoration: none;
    transition: all ease 0.3s;
}
button:hover {
    border: 1px solid white;
    background-color: white;
    color: rgb(78, 56, 88); /* Couleur du texte du bouton */
}

.confirm {
    border-color: red;
    background-color: red;
    color: white;
}

.confirm:hover{
    border-color: red;
    background-color: white;
    color: red;
}

.cancel{
    border-color: green;
    background-color: green;
    color: white;
}

.cancel:hover {
    border-color: green;
    background-color: white;
    color: green;
}




</style>