<script setup lang="ts">
import { computed, ref } from "vue";
import { watch } from "vue";
import Icon from "../Icon.vue";
import { useRoute } from "vue-router";

const navIconsUrlStart = "/images/icon-nav-";
const currentPage = ref("/");
const isNavBarReduced = ref(false);
const route = useRoute();

const links = [
  { label: "Overview", icon: `${navIconsUrlStart}overview.svg`, url: "/" },
  {
    label: "Transactions",
    icon: `${navIconsUrlStart}transactions.svg`,
    url: "/transactions",
  },
  { label: "Budgets", icon: `${navIconsUrlStart}budgets.svg`, url: "/budgets" },
  { label: "Pots", icon: `${navIconsUrlStart}pots.svg`, url: "/pots" },
  {
    label: "Recurring Bills",
    icon: `${navIconsUrlStart}recurring-bills.svg`,
    url: "/recurring-bills",
  },
];

watch(
  () => route.path,
  (newPath) => {
    currentPage.value = newPath;
  },
);

const handleReduceSideBarSize = () => {
  isNavBarReduced.value = !isNavBarReduced.value;
};

const resizeMenuText = computed(() =>
  isNavBarReduced ? "Maximize menu" : "Minimize menu",
);
</script>

<template>
  <nav
    :class="
      isNavBarReduced ? 'lg:max-w-22 lg:min-w-22' : 'lg:max-w-75 lg:min-w-75'
    "
    class="bg-grey-900 sticky bottom-0 left-0 z-50 flex h-13 w-full overflow-hidden rounded-t-xl px-4 pt-2 text-white transition-all duration-800 ease-out md:h-18.5 md:px-10 lg:top-0 lg:h-[100dvh] lg:flex-col lg:rounded-t-none lg:rounded-r-2xl lg:pt-10 lg:pr-6 lg:pb-25 lg:pl-0"
  >
    <div class="hidden lg:mb-16 lg:block lg:pl-8">
      <img
        v-if="!isNavBarReduced"
        src="/images/logo-large.svg"
        alt="finance's logo"
      />
      <img v-else src="/images/logo-small.svg" alt="finance's logo" />
    </div>

    <ul
      class="flex w-full justify-between font-bold md:gap-1 lg:flex-col lg:justify-start"
    >
      <li v-for="link of links" class="">
        <RouterLink
          :to="link.url"
          :class="currentPage === link.url && 'text-grey-900 bg-white'"
          class="group group text-grey-300 relative flex h-full w-17 flex-col items-center justify-center gap-1 rounded-t-xl py-2 text-xs hover:text-white md:w-26 lg:h-auto lg:w-auto lg:flex-row lg:justify-start lg:gap-4 lg:rounded-t-none lg:rounded-r-xl lg:px-8 lg:py-4 lg:text-base"
          onclick="()=> currentPage.value = link.url"
        >
          <div
            :class="currentPage === link.url && 'opacity-100'"
            class="bg-secondary-green absolute bottom-0 left-0 h-1 w-full opacity-0 lg:top-0 lg:h-full lg:w-1"
          ></div>
          <Icon
            :iconUrl="link.icon"
            :class="currentPage === link.url && 'text-secondary-green'"
          />
          <p
            :class="
              isNavBarReduced
                ? 'md:absolute md:top-0 md:left-0 md:opacity-0'
                : 'md:relative md:top-auto md:left-auto md:opacity-100'
            "
            class="absolute top-0 left-0 opacity-0"
          >
            {{ link.label }}
          </p>
        </RouterLink>
      </li>
    </ul>

    <button
      class="text-grey-300 mt-auto ml-8 hidden cursor-pointer items-center gap-4 hover:text-white lg:flex"
      v-on:click="handleReduceSideBarSize()"
    >
      <Icon
        :iconUrl="'/images/icon-minimize-menu.svg'"
        :class="isNavBarReduced && 'rotate-180'"
      />
      <p :class="isNavBarReduced && 'absolute top-0 left-0 opacity-0'">
        {{ resizeMenuText }}
      </p>
    </button>
  </nav>
</template>
