<script setup lang="ts">
import { faL } from "@fortawesome/free-solid-svg-icons";
import { computed, ref } from "vue";

const model = defineModel();
const props = defineProps<{
  options?: string[];
  label?: string;
  mobileIcon: string;
}>();

const isOpen = ref(false);

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

const longestWord = computed(() => {
  let word = "";
  selectOptions.value.forEach((opt) => {
    if (opt.length > word.length) {
      word = opt;
    }
  });
  return word;
});

const openSelect = () => {
  isOpen.value = !isOpen.value;
};

const handleSelect = (e: Event) => {
  model.value = (e.target as HTMLButtonElement).value;
};

window.addEventListener("click", (e) => {
  const optionsMenu = (e.target as HTMLElement).closest(".selectMenuBtn");
  isOpen.value === true && !optionsMenu
    ? (isOpen.value = false)
    : (isOpen.value = isOpen.value);
});
</script>

<template>
  <div class="flex items-center gap-2">
    <p class="text-grey-500 hidden text-sm md:block">{{ label }}</p>
    <div class="relative flex w-auto flex-col">
      <button class="selectMenuBtn relative md:hidden" v-on:click="openSelect">
        <span class="absolute top-0 left-0 h-0 w-0 opacity-0"
          >Open sorting menu</span
        >
        <img :src="mobileIcon" alt="" />
      </button>
      <button
        v-on:click="openSelect"
        class="border-beige-500 selectMenuBtn hover:border-grey-900 hidden w-full cursor-pointer items-center gap-4 rounded-lg border px-5 py-3 text-sm md:flex"
      >
        <span class="opacity-0" aria-hidden="true">
          {{ longestWord }}
        </span>

        <p class="absolute top-3 left-5">
          {{ model }}
        </p>
        <img
          :class="isOpen && 'rotate-180'"
          src="/images/icon-caret-down.svg"
          alt=""
        />
      </button>
      <ul
        v-if="isOpen"
        class="absolute top-12 right-0 z-20 flex flex-col rounded-xl bg-white px-5 shadow-2xl md:w-full"
      >
        <li class="border-grey-100 border-b" v-for="option in selectOptions">
          <button
            :class="model === option && 'font-bold'"
            class="cursor-pointer py-2"
            :value="option"
            v-on:click="handleSelect"
          >
            {{ option }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
