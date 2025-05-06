<script setup lang="ts">
import { computed } from "vue";
import Icon from "../Icon.vue"

const props = defineProps<{bgColor: string, icon?: string, label: string, value: number}>()

const textColor = computed(() => props.bgColor === 'bg-grey-900'  && 'text-white' )



</script>

<template>
    <dl class="flex-1/2 p-6 rounded-2xl flex  items-center gap-4" :class="[bgColor, textColor]">
        <Icon v-if="icon" :iconUrl='icon' />
        <div class="">
            <dt class="text-sm mb-3">{{ label }}</dt>
            <dd class=" text-[32px] font-bold">${{ value }}</dd>
        </div>
    </dl>
</template>