<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { api } from "../api";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

import UserCard from "../components/UserCard.vue";

const authStore = useAuthStore();
const router = useRouter();

const todos = ref<any[]>([]);
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
  const { data } = await api.get("/todos");
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

// TODO ref
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

const newUserId = ref("");
const newTitle = ref("");
const isLoading = ref(false);
const isError = ref("");

const addTodo = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.post("/todos", {
      userId: +newUserId.value,
      title: newTitle.value,
      completed: false,
    });
    todos.value.unshift(data);
    newUserId.value = "";
    newTitle.value = "";
  } catch {
    isError.value = "Add todo error";
  } finally {
    isLoading.value = false;
  }
};

const isInvalid = computed(
  () => newUserId.value === "" || newTitle.value === "",
);

onMounted(loadTodos);
</script>

<template>
  <div class="">
    <nav>
      <h1 class="brand-text">Todo App</h1>
      <ul>
        <li>
          <a href="#" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </nav>

    <UserCard />

    <article>
      <h3>Create Todo</h3>
      <p v-if="isError" class="msg-error">{{ isError }}</p>
      <div class="grid">
        <div>
          <input v-model="newUserId" placeholder="User ID" />
        </div>
        <div>
          <input v-model="newTitle" placeholder="Title" />
        </div>
        <div>
          <button
            @click.prevent="addTodo"
            :aria-busy="isLoading"
            :disabled="isInvalid"
            class="btn-add"
          >
            Add
          </button>
        </div>
      </div>
    </article>

    <article>
      <h3>Filters</h3>
      <div class="filter-flex">
        <div class="filter-flex--col">
          <select v-model="status">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
            <option value="favorites">Favorites</option>
          </select>
        </div>
        <div class="filter-flex--col">
          <select v-model="userId">
            <option value="">All Users</option>
            <option v-for="id in ids" :key="id" :value="id">{{ id }}</option>
          </select>
        </div>
        <div class="filter-flex--col">
          <input v-model="search" placeholder="Search title" />
        </div>
        <div v-if="hasFilters" class="filter-flex--col-reset">
          <button
            type="reset"
            @click.prevent="resetFilter"
            title="Reset filters"
          >
            &times;
          </button>
        </div>
      </div>
    </article>

    <article class="todos-list">
      <div class="overflow-auto" v-if="filteredTodos?.length">
        <table class="striped">
          <tbody>
            <tr v-for="todo in filteredTodos" :key="todo.id">
              <td class="cell-id">
                <strong>#{{ todo.id }}</strong>
              </td>
              <td>
                {{ todo.title }}
              </td>
              <td>
                {{ todo.completed ? "Completed" : "Uncompleted" }}
              </td>
              <td class="cell-btn">
                <button
                  @click.prevent="toggleFavorite(todo.id)"
                  :class="{ outline: !favorites.includes(todo.id) }"
                  :title="
                    favorites.includes(todo.id)
                      ? 'Remove from Favorite'
                      : 'Add to Favorite'
                  "
                >
                  ★
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>Not found any todos...</p>
      </div>
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

.user-card,
.todos-list {
  padding-bottom: 1px;
}

.filter-flex {
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    gap: 0 16px;
  }
}

.filter-flex--col {
  @media (min-width: 768px) {
    flex: 1 0 auto;
    max-width: calc(33.33% - 16px);
  }
}

.filter-flex--col-reset {
  @media (min-width: 768px) {
    flex: 0 0 auto;
  }
}

.filter-flex--col-reset button {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 120px;

  @media (min-width: 768px) {
    width: auto;
  }
}

.btn-add {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.cell-id {
  width: 70px;
  text-align: center;
}

.cell-btn {
  width: 90px;
  text-align: center;
}
</style>
