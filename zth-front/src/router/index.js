import { createRouter, createWebHistory } from 'vue-router';

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
    }
  ]
});

export default router;
