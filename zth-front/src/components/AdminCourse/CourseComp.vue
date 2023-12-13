<script setup>
import { ref } from "vue";
import PopUp from '@/components/PopUp.vue';

defineProps({
    data: Object
})

const deletePopUp = ref(false);

</script>
<template>
    <div>
        <div class="grid">
            <p v-for="value in data" class="comp-element">{{ value }}</p>
            <div class="comp-element"><button @click="deletePopUp=true">Supprimer</button></div>
        </div>
        <PopUp message="Voulez vous vraiment supprimer cette matière ?" confirm-message="supprimer" @confirm="$emit('deleteCourse', data[0])" @close="deletePopUp = false" v-if="deletePopUp" >
        </PopUp>
    </div>
    
</template>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(3, 10rem);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
}

button {
    background-color: rgb(78, 56, 88); /* Couleur de fond du bouton */
    color: white; /* Couleur du texte du bouton */
    padding: 0.3rem 1rem; /* Espacement interne du bouton */
    border: none; /* Supprimer la bordure du bouton */
    border-radius: 4px; /* Ajouter un peu de bord arrondi */
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s;
}
</style>