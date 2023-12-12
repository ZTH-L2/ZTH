import { defineStore } from "pinia";
import { ref } from "vue";
export const useUrlStore = defineStore("url", () => {
  //const = ref(val)
  const api = ref("http://localhost:8080");
  // const api = ref("https://zth.aekhy.codes");

  return {
    api,
  };
});
