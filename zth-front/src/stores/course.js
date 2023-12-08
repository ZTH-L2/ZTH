import { defineStore } from "pinia";
import { ref } from "vue";

export const useCourseStore = defineStore("course", () => {
    //const = ref(val)
    const id_course = ref(null);
    const category = ref(null);
    return {
      id_course, category
    };
});
