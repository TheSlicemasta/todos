<script setup lang="ts">
import { ref } from "vue";
import { api } from "../api";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const username = ref("");
const phone = ref("");
const error = ref("");

const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  const { data } = await api.get("/users");

  const user = data.find(
    (u: any) =>
      u.username.toLowerCase() === username.value.toLowerCase() &&
      u.phone === phone.value,
  );

  if (!user) {
    error.value = "Login error";
    return;
  }

  authStore.setUser(user);
  router.push("/todos");
};
</script>

<template>
  <div class="page-login">
    <div class="page-login--form">
      <h1>Login</h1>

      <input
        v-model="username"
        @input="username = username.replace(/[^a-zA-Z]/g, '')"
        placeholder="Username"
      />
      <input v-model="phone" placeholder="Phone" />

      <div class="grid">
        <button @click="login">Login</button>
      </div>

      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<style>
.page-login {
  display: grid;
  place-items: center;
  min-height: 100dvh;
}

.page-login--form {
  width: 100%;
  max-width: 500px;
  margin: auto;
}
</style>
