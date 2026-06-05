import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import TodosView from "../views/TodosView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: LoginView,
    },
    {
      path: "/todos",
      component: TodosView,
      meta: { requiresAuth: true }
    },
  ],
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !localStorage.getItem("user")) return "/";
});

export default router;
