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
      path: '/voir_post',
      name: 'voir_post',
      component: () => import('../views/voir_post.vue')
    },
    {
      path: '/lire_post/:id', // Correction ici
      name: 'lire_post',
      component: () => import('../views/lire_post.vue')
    }
  ]
});

export default router;
