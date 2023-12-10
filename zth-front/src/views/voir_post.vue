<template>
    <div class="affichage">
        <Posts></Posts>
    </div>
</template>

<script>
import Posts from './../components/view_posts.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { useUrlStore } from "../stores/url";

const urlStore = useUrlStore();
export default {
data() {
  return {
    id_course: null,
    id_category: null,
    urlStore: useUrlStore()

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