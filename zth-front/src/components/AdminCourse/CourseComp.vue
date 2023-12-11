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
            <p v-for="value in data">{{ value }}</p>
            <div><button @click="deletePopUp=true">Supprimer</button></div>
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
</style>