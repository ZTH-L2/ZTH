import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from "../stores/user";





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('../views/connexion.vue')
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import('../views/inscription.vue')
    },
    {
      path: '/voir_post/:id_course/:category', // Ajout des paramètres
      name: 'voir_post',
      component: () => import('../views/voir_post.vue')
    },
    {
      path: '/lire_post/:id', // Correction ici
      name: 'lire_post',
      component: () => import('../views/lire_post.vue')
    },
    {
      path: '/profil/:id/:username', // Correction ici
      name: 'profil',
      component: () => import('../views/profil.vue')
    },
    {
      path: '/ecrire_post/:id', // Correction ici
      name: 'ecrire_post',
      component: () => import('../views/ecrire_post.vue')
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomePage.vue"),
    },
    {
      path: "/filiere",
      name: "filiere",
      component: () => import("../views/MajorPage.vue"),
    },
    {
      path: "/creer_post/:id_course/:category",
      name: "creer_post",
      component: () => import("../views/creer_post.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminPage.vue")
    }
  ]
});

// protect admin route
router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  userStore.init()
  if (
    !userStore.isAdmin && to.name == 'admin'
  ) {
    // redirect the user to the login page
    return { name: 'connexion' }
  }
})

export default router;
