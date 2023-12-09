import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null, 
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
    isAdmin: (state) => state.user !== null && state.user.permission == 1,
    id_user: (state) => state.user ? state.user.id_user : null,
    username: (state) => state.user ? state.user.username : null,
  },
  actions: {
    init() { 
      let u = localStorage.getItem("user") 
      this.user = u ? JSON.parse(u) : null
    },
    setUser(data){
      this.user = data
      localStorage.setItem("user", JSON.stringify(this.user))
    },
    logout(){
      this.user = null
      localStorage.removeItem("user");
    }
  },
});
