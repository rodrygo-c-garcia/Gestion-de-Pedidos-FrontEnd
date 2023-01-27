import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AppLayout from "@/layout/AppLayout.vue";
import Buffer from "buffer";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // ruta padre
      path: "/",
      component: AppLayout,
      // añadimos requireAuth al padre ruta por lo que sus hijos tendran las misma caracteristica

      // rutas hijas
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
          meta: { requireAuth: true },
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
          meta: { requireAuth: true },
        },
        {
          path: "/pedido/nuevo",
          name: "pedido_nuevo",
          component: () => import("../views/admin/pedido/NuevoPedido.vue"),
          meta: { requireAuth: true },
        },
      ],
    },
    {
      // ruta inicial Login
      path: "/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
    },
  ],
});

// middleware
// beforeEach antes de entrar a la ruta
// a, donde, siguiente
router.beforeEach((to, from, next) => {
  // console.log("FROM", from);
  // console.log("TO", to);

  // si mi ruta esta protegido
  if (to.meta.requireAuth) {
    // autenticamos
    try {
      let tonken64 = localStorage.getItem("token");
      let token = Buffer.from(tonken64, "base64").toString("ascii");
      // si existe el token dejamos pasar, si no existe mandamos al Login
      token ? next() : next({ name: "login" });
    } catch (e) {
      localStorage.removeItem("token");
      next({ name: "login" });
    }
  }
  next();
});

export default router;
