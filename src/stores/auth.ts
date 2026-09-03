import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../types";

export const useAuthStore = defineStore("counter", () => {
  // State
  const user = ref(JSON.parse(localStorage.getItem("user") || "null"));

  // Getters
  // const doubleCount = computed(() => count.value * 2)

  // Actions
  const setUser = (u: User) => {
    user.value = u;
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logOut = () => {
    user.value = null;
    localStorage.removeItem("user");
  };

  return { user, setUser, logOut };
});
