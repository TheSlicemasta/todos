<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { api } from "../api";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

import UserCard from "../components/UserCard.vue";
import TodoCreate from "../components/TodoCreate.vue";
import TodoFilter from "../components/TodoFilter.vue";
import TodoList from "../components/TodoList.vue";

import type { Todo } from "../types";

const authStore = useAuthStore();
const router = useRouter();

const todos = ref<Todo[]>([]);
const search = ref("");
const status = ref("all");
const userId = ref("");

const favorites = ref<number[]>(
  JSON.parse(localStorage.getItem("favorites") || "[]"),
);

const logout = () => {
  authStore.logout();
  router.push("/");
};

const loadTodos = async () => {
  const { data } = await api.get<Todo[]>("/todos");
  todos.value = data;
};

const toggleFavorite = (id: number) => {
  favorites.value = favorites.value.includes(id)
    ? favorites.value.filter((x) => x !== id)
    : [...favorites.value, id];

  localStorage.setItem("favorites", JSON.stringify(favorites.value));
};

const resetFilter = () => {
  search.value = "";
  status.value = "all";
  userId.value = "";
};

const hasFilters = computed(
  () => search.value !== "" || status.value !== "all" || userId.value !== "",
);

const filteredTodos = computed(() =>
  todos.value.filter((t) => {
    if (
      (status.value === "completed" && !t.completed) ||
      (status.value === "uncompleted" && t.completed) ||
      (status.value === "favorites" && !favorites.value.includes(t.id)) ||
      (userId.value && t.userId !== +userId.value) ||
      (search.value &&
        !t.title.toLowerCase().includes(search.value.toLowerCase()))
    ) {
      return false;
    }

    return true;
  }),
);

const ids = computed(() => [...new Set(todos.value.map((x) => x.userId))]);

const addTodo = (todo: Todo) => {
  todos.value.unshift(todo);
};

onMounted(loadTodos);
</script>

<template>
  <div>
    <nav>
      <h1 class="brand-text">Todo App</h1>

      <ul>
        <li>
          <a href="#" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </nav>

    <UserCard />

    <TodoCreate @created="addTodo" />

    <TodoFilter
      v-model:status="status"
      v-model:user-id="userId"
      v-model:search="search"
      :ids="ids"
      :has-filters="hasFilters"
      @reset="resetFilter"
    />

    <TodoList
      :todos="filteredTodos"
      :favorites="favorites"
      @toggle-favorite="toggleFavorite"
    />
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
