import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rutas públicas que no requieren autenticación
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: '/Home',
          component: () => import('../pages/Home.vue'),
        },
        {
          path: '/Tienda',
          component: () => import('../views/pages/Tienda/Tienda.vue'),
        },
      ],
    },
    // Rutas protegidas que requieren autenticación
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
          meta: { requiresAuth: true }, // Requiere autenticación
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
          meta: { requiresAuth: true }, // Requiere autenticación
        },
        {
          path: 'Users',
          component: () => import('../pages/UserManager.vue'),
          meta: { requiresAuth: true }, // Requiere autenticación
        },
        {
          path: 'Store',
          component: () => import('../pages/Store.vue'),
          meta: { requiresAuth: true }, // Requiere autenticación
        },
        {
          path: 'Carrito',
          component: () => import('../views/pages/Tienda/Carrito.vue'),
          meta: { requiresAuth: true }, // Requiere autenticación
        },
        {
          path: 'Compra',
          component: () => import('../views/pages/Tienda/Payment.vue'),
        },
        // Otras rutas protegidas...
      ],
    },
    // Rutas de autenticación (login, registro, etc.)
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
      ],
    },
    // Redireccionamiento si la ruta no coincide con ninguna de las anteriores
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login', // Redirecciona a la página de inicio de sesión
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('accessToken'); // Verifica si el token de acceso está presente en el almacenamiento local
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // Verifica si la ruta requiere autenticación

  if (requiresAuth && !isAuthenticated) {
    // Si la ruta requiere autenticación y el usuario no está autenticado, redirige al login
    next('/login');
  } else {
    next(); // Permite el acceso a la ruta
  }
});

export default router;
