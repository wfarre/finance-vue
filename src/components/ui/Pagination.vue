<template>
  <div class="flex items-center justify-between">
    <button
      v-on:click="handlePrevPageClick"
      class="border-beige-500 hover:bg-beige-500 flex cursor-pointer items-center gap-4 rounded-lg border px-4 py-3 text-sm hover:text-white"
    >
      <Icon icon-url="/images/icon-caret-left.svg" />
      Previous
    </button>
    <ul class="flex gap-2">
      <li v-for="n in maxPage">
        <button
          v-on:click="handlePageClick"
          :data-value="n"
          :class="currentPage === n && 'bg-grey-900 text-white'"
          class="border-beige-500 hover:bg-beige-500 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border hover:text-white"
        >
          {{ n }}
        </button>
      </li>
    </ul>
    <button
      v-on:click="handleNextPageClick"
      class="border-beige-500 group hover:bg-beige-500 flex cursor-pointer items-center gap-4 rounded-lg border px-4 py-3 text-sm hover:text-white"
    >
      Next
      <Icon icon-url="/images/icon-caret-right.svg" />
    </button>
  </div>
</template>

<script setup lang="ts">
import Icon from "../Icon.vue";

const props = defineProps<{ currentPage: number; maxPage: number }>();
const emit = defineEmits<{
  (e: "setPage", value: number): void;
  (e: "nextPage", value: number): void;
  (e: "prevPage", value: number): void;
}>();

const handlePageClick = (e: Event) => {
  const target = e.target as HTMLElement;
  const value = target.dataset.value;
  if (value) {
    emit("setPage", +value);
  }
};
const handleNextPageClick = () =>
  props.currentPage < props.maxPage && emit("nextPage", props.currentPage + 1);
const handlePrevPageClick = () =>
  props.currentPage > 1 && emit("prevPage", props.currentPage - 1);
</script>
