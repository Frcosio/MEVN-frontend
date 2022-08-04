const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: {
          auth: true,
        },
      },
      { path: "login", component: () => import("pages/LoginPage.vue") },
      {
        path: "protected",
        component: () => import("pages/ProtectedPage.vue"),
        meta: {
          auth: true,
        },
      },
      { path: "about", component: () => import("pages/AboutPage.vue") },
      { path: "register", component: () => import("pages/RegisterPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
