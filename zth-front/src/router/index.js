import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomePage.vue"),
    },
    {
      path: "/connexion",
      name: "connexion",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/connexion.vue"),
    },
    {
      path: "/inscription",
      name: "inscription",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/inscription.vue"),
    },
    {
      path: "/filiere",
      name: "filiere",
      component: () => import("../views/MajorPage.vue"),
    },
  ],
});

export default router;
