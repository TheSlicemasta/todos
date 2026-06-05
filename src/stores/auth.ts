import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({ user: JSON.parse(localStorage.getItem("user") || "null") }),
  actions: {
    setUser(u: any) {
      this.user = u;
      localStorage.setItem("user", JSON.stringify(u));
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
