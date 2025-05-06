<script setup lang="ts">
import {computed, ref} from "vue"
import { watch } from 'vue'
import Icon from "../Icon.vue"
import {useRoute} from 'vue-router'

const navIconsUrlStart = "/images/icon-nav-"
const currentPage = ref('/')
const isNavBarReduced = ref(false)
const route = useRoute()

const links = [
  {label: "Overview", icon: `${navIconsUrlStart}overview.svg`, url: "/"},
  {label: "Transactions", icon:  `${navIconsUrlStart}transactions.svg`, url: "/transactions"},
  {label: "Budgets", icon:  `${navIconsUrlStart}budgets.svg`, url: "/budgets"},
  {label: "Pots", icon:  `${navIconsUrlStart}pots.svg`, url: "/pots"},
  {label: "Recurring Bills", icon:  `${navIconsUrlStart}recurring-bills.svg`, url: "/recurring-bills"}
]

watch(
  () => route.path,
  (newPath, oldPath) => {
    currentPage.value = newPath
  }
)



const handleReduceSideBarSize = () => {
  isNavBarReduced.value = !isNavBarReduced.value
  console.log(isNavBarReduced);
}

const resizeMenuText = computed(() => isNavBarReduced ? "Maximize menu" : "Minimize menu")
const buttonTextClass = computed(() =>  isNavBarReduced && 'absolute top-0 left-0 opacity-0' )
</script>

<template>
  <nav
    :class="isNavBarReduced ? ' lg:max-w-22 lg:min-w-22' : 'lg:max-w-75 lg:min-w-75' "
    class="z-50 w-full h-13 md:h-18.5 bg-grey-900 lg:rounded-r-2xl lg:rounded-t-none rounded-t-xl overflow-hidden text-white transition-all duration-800 ease-out lg:pr-6 lg:h-[100dvh] flex lg:flex-col lg:pt-10 lg:pb-25 sticky lg:top-0 left-0 bottom-0 pt-2 px-10 lg:pl-0"
  >
    <div class="lg:mb-16 lg:pl-8 hidden lg:block">
      <img
        v-if="!isNavBarReduced"
        src="/images/logo-large.svg"
        alt="finance's logo"
      />
      <img v-else src="/images/logo-small.svg" alt="finance's logo" />
    </div>

    <ul class="flex lg:flex-col  md:gap-1 font-bold lg:justify-start justify-between w-full">
      <li v-for="link of links" class="">
        <RouterLink
          :to="link.url"
          :class="currentPage === link.url && 'bg-white text-grey-900' "
          class="w-17 md:w-26 h-full lg:h-auto lg:w-auto group flex lg:flex-row flex-col justify-center lg:justify-start items-center gap-1 lg:gap-4 group lg:px-8 py-2 lg:py-4 rounded-t-xl  lg:rounded-r-xl lg:rounded-t-none relative text-grey-300 hover:text-white text-xs lg:text-base"
          onclick="()=> currentPage.value = link.url"
        >
          <div
          :class="currentPage === link.url && 'opacity-100'"

            class="opacity-0 w-full h-1 lg:h-full lg:w-1 bg-secondary-green absolute lg:top-0 left-0 bottom-0"
          ></div>
          <Icon
            :iconUrl="link.icon"
            :class="currentPage === link.url && 'text-secondary-green'"
          />
          <p :class="isNavBarReduced ? 'md:absolute md:top-0 md:left-0 md:opacity-0': 'md:relative md:top-auto md:left-auto md:opacity-100'" class="absolute top-0 left-0 opacity-0 ">
            {{ link.label }}
          </p>
        </RouterLink>
      </li>
    </ul>

    <button
      class="mt-auto lg:flex gap-4 items-center ml-8 text-grey-300 hover:text-white cursor-pointer hidden "
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
