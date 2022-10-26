import { createRouter, createWebHistory } from "vue-router";
import Style from "@/views/StyleView.vue";
import Home from "@/views/HomeView.vue";
import { useMainStore } from "@/stores/main";

const routes = [
  {
    meta: {
      title: "Select style",
    },
    path: "/style",
    name: "style",
    component: Style,
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    // [Common] pages
    meta: {
      title: "PW",
    },
    path: "/",
    name: "dashboard",
    component: Home,
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    meta: {
      title: "Login",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Error",
    },
    path: "/error",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },

  // [Application] pages
  {
    meta: {
      title: "Ingredients",
    },
    path: "/ingredients",
    name: "ingredients",
    component: () => import("@/views/IngredientView.vue"),
  },
  // {
  //   meta: {
  //     title: "Ingredient Edit",
  //   },
  //   path: "/ingredient/edit",
  //   name: "ingredient-edit",
  //   component: () => import("@/views/IngredientEdit.vue"),
  // },

  {
    meta: {
      title: "Outlets",
    },
    path: "/outlets",
    name: "outlets",
    component: () => import("@/views/OutletView.vue"),
  },
  {
    meta: {
      title: "Outlet Summary",
    },
    path: "/outlets/summary/:id",
    name: "outlet-summary",
    component: () => import("@/views/OutletEdit.vue"),
  },

  {
    meta: {
      title: "Users",
    },
    path: "/users",
    name: "users",
    component: () => import("@/views/UserView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const appLoggedIn = await useMainStore().getLoginState;

  // Going to somewhere - unauthenticated
  if (!appLoggedIn && to.name !== "login") {
    return next("login");
  }

  // LoggedIn? - Check authenticity of token
  if (appLoggedIn) {
    const validToken = await useMainStore().fetchCheckAuth();

    if (!validToken) {
      await useMainStore().setLogoutState();
      return next("login");
    }

    if (to.path === "/login") {
      return next("/");
    }
  }

  next();
});

router.afterEach(() => {
  // Can be used to remove loading or additional other checks dynamically for all pages
  // console.log("Logging router after each async");
});

export default router;
