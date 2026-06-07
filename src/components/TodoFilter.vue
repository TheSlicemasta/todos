<script setup lang="ts">
import { Filter, type FilterType } from "../types";

const status = defineModel<FilterType>("status", {
  default: Filter.All,
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
  stat: string;
}>();

const emit = defineEmits<{
  reset: [];
}>();
</script>

<template>
  <article>
    <div class="filter-headline">
      <h3>Filters</h3>
      <small>{{ stat }}</small>
    </div>

    <div class="filter-flex">
      <div class="filter-flex--col">
        <select v-model="status">
          <option :value="f" v-for="f of Filter" :key="f">{{ f }}</option>
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

.filter-headline {
  position: relative;
}

.filter-headline small {
  position: absolute;
  top: 0.25rem;
  right: 0;
}
</style>
