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
      meta: { requireAuth: true },
      // rutas hijas
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
        {
          path: "/categorias",
          name: "categorias",
          component: () => import("../views/admin/categoria/Categorias.vue"),
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
      // desencriptar
      let token = window.atob(localStorage.getItem("token"));
      //console.log("TOKEN " + token.length);

      //let token = Buffer.from(tonken64, "base64").toString("ascii");
      // si existe el token dejamos pasar, si no existe mandamos al Login
      token.length > 3 ? next() : next({ name: "login" });
    } catch (e) {
      localStorage.removeItem("token");
      next({ name: "login" });
    }
  }
  next();
});

export default router;
