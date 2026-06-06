import { defineStore } from "pinia";
import type { User } from "../types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null"),
  }),
  actions: {
    setUser(u: User) {
      this.user = u;
      localStorage.setItem("user", JSON.stringify(u));
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
