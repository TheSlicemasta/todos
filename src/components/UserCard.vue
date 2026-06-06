<script setup lang="ts">
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <article v-if="authStore.user" class="user-card">
    <h3>{{ authStore.user?.name }}</h3>
    <p>{{ authStore.user?.email }}</p>
    <p>{{ authStore.user?.phone }}</p>
  </article>
</template>
