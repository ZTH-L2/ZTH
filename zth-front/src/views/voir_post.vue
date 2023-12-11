<template>
    <div class="affichage" v-if="userStore.isLoggedIn">
        <Posts></Posts>
    </div>
</template>

<script>
import Posts from './../components/view_posts.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { useUrlStore } from "../stores/url";
import { useUserStore } from "./../stores/user";



export default {
data() {
  return {
    id_course: null,
    id_category: null,
    urlStore: useUrlStore(),
    userStore:useUserStore()

    };
  },
  components: {
    Posts,
  },
  created() {
    this.id_course = this.$route.params.id_course
    this.category = this.$route.params.category
  },
};
</script>

<style scoped>
.affichage{
  margin-left: 1rem;
  margin-top: 1rem;
}
</style>