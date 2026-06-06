<script setup lang="ts">
const status = defineModel<string>("status", {
  default: "all",
});

const userId = defineModel<string | number>("userId", {
  default: "",
});

const search = defineModel<string>("search", {
  default: "",
});

defineProps<{
  ids: number[];
  hasFilters: boolean;
}>();

const emit = defineEmits<{
  reset: [];
}>();
</script>

<template>
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

          <option v-for="id in ids" :key="id" :value="id">
            {{ id }}
          </option>
        </select>
      </div>

      <div class="filter-flex--col">
        <input v-model="search" placeholder="Search title" />
      </div>

      <div v-if="hasFilters" class="filter-flex--col-reset">
        <button
          type="reset"
          title="Reset filters"
          @click.prevent="emit('reset')"
        >
          &times;
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
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
</style>
