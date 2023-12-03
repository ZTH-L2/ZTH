<template>
    <div>
        <router-link :to="{ name: 'lire_post', params: {id: id_post}}"> {{ titre }}</router-link>        
        <h2> {{ createur }} </h2>
        <h2 > note : {{ note }} </h2>
        <h2 > nombre de notes : {{ nbr_note }} </h2>
    </div>
</template>

<script>
    export default {
        name : "Post",
        props: ['id_post', 'titre', 'createur', 'note', 'nbr_note']
    }


</script>

<style scoped>

</style>