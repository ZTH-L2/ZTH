import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  // comme setup
  state: () => ({
    user: null,
  }),
  // comme computed
  getters: {
    loggedIn: (state) => state.user !== null,
  },
  // comme methodes
  actions: {},
});
