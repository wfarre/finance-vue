<script setup lang="ts">
import { computed } from "vue";

const model = defineModel();
const props = defineProps<{
  options?: string[];
  label?: string;
}>();

const defaultOptions = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];

const selectOptions = computed(() =>
  props.options ? props.options : defaultOptions,
);
</script>

<template>
  <label class="text-grey-500 ml-auto flex items-center gap-4">
    {{ label ? label : "Sort By" }}
    <select
      v-model="model"
      class="border-beige-500 hover:border-grey-900 cursor-pointer rounded-lg border px-5 py-3 text-sm"
    >
      <option v-for="option in selectOptions" :value="option.toLowerCase()">
        {{ option }}
      </option>
    </select>
  </label>
</template>
