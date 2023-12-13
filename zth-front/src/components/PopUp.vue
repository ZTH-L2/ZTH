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
            <p>{{ message }}</p>
            <button @click="confirm" class="confirm">{{ confirmMessage }}</button>
            <button @click="$emit('close')" class="cancel">Annuler</button>
        </div>
        <div class="background"></div>
        
    </div>
</template>

<style scoped>

.popup {
    position: fixed;
    background-color: white;
    z-index: 100;
    left: 50vw;
    top: 50vh;
    pointer-events: all;
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
    z-index: 99;
}

.confirm {
    background-color: red;
}

.cancel{
    background-color: green;
}




</style>