<script setup lang="ts">
import { computed, ref } from "vue";
import Icon from "../../Icon.vue";
import Button from "../Button.vue";
import { formatCurrency } from "../../../utils/utils";
import type { IPot } from "../../../models/Pot";

const isMenuOpened = ref(false);
const props = defineProps<{
  pot: IPot;
}>();

const toggleOpenMenu = () => (isMenuOpened.value = !isMenuOpened.value);

const percentage = computed(() => {
  const potTotal = props.pot.total;
  const potTarget = props.pot.target;

  return Math.round((potTotal / potTarget) * 100);
});

const emits = defineEmits<{
  (e: "edit", id: number): void;
  (e: "addMoney", id: number): void;
  (e: "withdrawMoney", id: number): void;
  (e: "deletePot", id: number): void;
}>();

window.addEventListener("click", (e) => {
  console.log();
  const optionsMenu = (e.target as HTMLElement).closest(".optionsMenu");
  isMenuOpened.value === true && !optionsMenu
    ? (isMenuOpened.value = false)
    : (isMenuOpened.value = isMenuOpened.value);
});
</script>

<template>
  <article class="relative z-0 rounded-2xl bg-white p-6">
    <header class="relative mb-8 flex items-center gap-4">
      <div
        :style="[`backgroundColor:${pot.theme}`]"
        class="h-4 w-4 rounded-full"
      ></div>
      <h3 class="text-xl font-bold">{{ pot.name }}</h3>
      <button
        class="optionsMenu ml-auto flex cursor-pointer items-center justify-center"
        v-on:click="toggleOpenMenu"
      >
        <Icon icon-url="/images/icon-ellipsis.svg" />
      </button>
      <ul
        :class="isMenuOpened ? 'scale-100' : 'scale-0'"
        class="absolute top-6 right-0 rounded-lg bg-white px-5 shadow-2xl duration-300"
      >
        <li>
          <button
            class="cursor-pointer py-4 text-sm capitalize"
            v-on:click="() => emits('edit', pot.id)"
          >
            Edit Pot
          </button>
        </li>
        <li class="bg-grey-100 h-[1px] w-full"></li>
        <li>
          <button
            class="text-secondary-red cursor-pointer py-4 text-sm capitalize"
            v-on:click="() => emits('deletePot', pot.id)"
          >
            Delete Pot
          </button>
        </li>
      </ul>
    </header>

    <div class="flex flex-col gap-4">
      <dl class="flex items-center justify-between">
        <dt class="text-grey-500 text-sm">Total Saved</dt>
        <dd class="text-[32px] font-bold">
          {{ pot?.total && formatCurrency(pot.total) }}
        </dd>
      </dl>
      <div class="bg-beige-100 h-2 w-full overflow-hidden rounded-2xl">
        <div
          :style="[
            `transform:scaleX(${percentage}%) `,
            `backgroundColor:${pot.theme}`,
          ]"
          class="h-full w-full origin-left transition-all duration-700"
        ></div>
      </div>
      <dl class="text-grey-500 flex justify-between text-xs">
        <dt>{{ percentage }}%</dt>
        <dd>Traget of {{ formatCurrency(pot.target, false) }}</dd>
      </dl>
    </div>

    <footer class="mt-8 flex gap-4">
      <Button
        @on-button-clicked="() => emits('addMoney', pot.id)"
        bgColor="bg-beige-100 hover:bg-transparent hover:border hover:border-grey-900"
        textColor="text-grey-900"
        class="flex-1"
      >
        + Add Money
      </Button>
      <Button
        bgColor="bg-beige-100 hover:bg-transparent hover:border hover:border-grey-900"
        textColor="text-grey-900"
        class="flex-1"
        v-on:on-button-clicked="() => emits('withdrawMoney', pot.id)"
      >
        withdraw
      </Button>
    </footer>
  </article>
</template>
