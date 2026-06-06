<script setup lang="ts">
import { computed, ref } from "vue";
import { api } from "../api";
import type { Todo } from "../types";

const emit = defineEmits<{
  created: [todo: Todo];
}>();

const newUserId = ref("");
const newTitle = ref("");
const isLoading = ref(false);
const isError = ref("");

const addTodo = async () => {
  try {
    isLoading.value = true;

    const { data } = await api.post<Todo>("/todos", {
      userId: Number(newUserId.value),
      title: newTitle.value,
      completed: false,
    });

    emit("created", data);

    newUserId.value = "";
    newTitle.value = "";
    isError.value = "";
  } catch {
    isError.value = "Add todo error";
  } finally {
    isLoading.value = false;
  }
};

const isInvalid = computed(
  () => newUserId.value === "" || newTitle.value === "",
);
</script>

<template>
  <article>
    <h3>Create Todo</h3>

    <p v-if="isError" class="msg-error">
      {{ isError }}
    </p>

    <div class="grid">
      <div>
        <input
          v-model="newUserId"
          @input="newUserId = newUserId.replace(/\D/g, '')"
          placeholder="User ID"
        />
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
</template>

<style scoped>
.btn-add {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
