<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { api } from "../api";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<template>
  <div class="">
    <nav>
      <h1 class="brand-text">Todo App</h1>
      <ul>
        <li><a href="#" @click.prevent="logout">Logout</a></li>
      </ul>
    </nav>

    <article>
      <h3>{{ authStore.user?.name }}</h3>
      <p>{{ authStore.user?.email }}</p>
      <p>{{ authStore.user?.phone }}</p>
    </article>
  </div>
</template>

<style scoped>
.brand-text {
  display: flex;
  margin: 0;
  align-items: center;
  font-size: 1.2rem;
}
</style>
