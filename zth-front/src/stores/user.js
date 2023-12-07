import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useUserStore = defineStore("user", () => {
  //const = ref(val)
  const user = ref(null);
  const isLoggedIn = computed(() => {
    return user !== null;
  });
  const isAdmin = computed(() => {
    // TO DO
    return isLoggedIn && false;
  });
  return {
    user,
    isLoggedIn,
    isAdmin,
  };
});
