import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
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
      const route = useRouter();
      // check if we had it for more than 20 min
      if (u && Date.now() - JSON.parse(u)["time"] >= 20 * 60 * 1000)
      {
        localStorage.removeItem("user");
        u = null;
        route.push("/connexion");
      }

      this.user = u ? JSON.parse(u) : null
    },
    setUser(data){
      this.user = data
      this.user["time"] = Date.now()
      localStorage.setItem("user", JSON.stringify(this.user))
    },
    logout(){
      this.user = null
      localStorage.removeItem("user");
    }
  },
});
