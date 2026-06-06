<script setup lang="ts">
import type { Todo } from "../types";

defineProps<{
  todos: Todo[];
  favorites: number[];
}>();

const emit = defineEmits<{
  toggleFavorite: [id: number];
}>();
</script>

<template>
  <article class="todos-list">
    <div v-if="todos?.length" class="overflow-auto">
      <table class="striped">
        <tbody>
          <tr v-for="todo in todos" :key="todo.id">
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
                :class="{ outline: !favorites.includes(todo.id) }"
                :title="
                  favorites.includes(todo.id)
                    ? 'Remove from Favorite'
                    : 'Add to Favorite'
                "
                @click.prevent="emit('toggleFavorite', todo.id)"
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
</template>

<style scoped>
.todos-list {
  padding-bottom: 1px;
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
