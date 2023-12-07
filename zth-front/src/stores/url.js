import { defineStore } from "pinia";
import { ref } from "vue";
export const useUrlStore = defineStore("url", () => {
  //const = ref(val)
  const api = ref("http://localhost:8080");

  return {
    api,
  };
});
