import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AppLayout from "@/layout/AppLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "/",
          component: HomeView,
        },
        {
          path: "/about",
          name: "about",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/AboutView.vue"),
        },
        {
          path: "/login",
          name: "login",
          component: () => import("../views/auth/Login.vue"),
        },
        {
          path: "/categorias",
          name: "categorias",
          component: () => import("../views/admin/categoria/Categorias.vue"),
          meta: { requireAuth: true },
        },
        {
          path: "/categoria/nuevo",
          name: "categoria_nueva",
          component: () =>
            import("../views/admin/categoria/CategoriaNueva.vue"),
        },
        {
          path: "/producto",
          name: "producto",
          component: () => import("../views/admin/producto/Producto.vue"),
          meta: { requireAuth: true },
        },
        {
          path: "/pedido",
          name: "pedido",
          component: () => import("../views/admin/pedido/Pedido.vue"),
        },
        {
          path: "/pedido/nuevo",
          name: "pedido_nuevo",
          component: () => import("../views/admin/pedido/NuevoPedido.vue"),
        },
      ],
    },
  ],
});

// middleware
// beforeEach antes de entrar a la ruta
// a, donde, siguiente
router.beforeEach((to, from, next) => {
  console.log("FROM", from);
  console.log("TO", to);

  // si mi ruta esta protegido
  if (to.meta.requireAuth) {
    // autenticamos
    let tonken64 = localStorage.getItem("token");
    l;
    console.log(token);
  }
  next();
});

export default router;
