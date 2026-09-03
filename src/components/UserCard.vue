<script setup lang="ts">
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <article v-if="authStore.user" class="user-card">
    <h3>{{ authStore.user?.name }} (id: {{ authStore.user?.id }})</h3>

    <div class="grid">
      <div>
        <p>Username: {{ authStore.user?.username }}</p>
      </div>
      <div>
        <p>{{ authStore.user?.email }}</p>
      </div>
      <div>
        <p>{{ authStore.user?.phone }}</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.user-card {
  padding-bottom: 1px;
}
</style>
