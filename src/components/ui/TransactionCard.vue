<script setup lang="ts">
import { computed } from 'vue';
import { formatDate, formatMoneyAmount } from '../../utils/utils';

const props = defineProps<{avatar: string, name: string, amount: number, date: string}>()



console.log(formatDate(props.date));


const formmattedAmount = computed(() => formatMoneyAmount(props.amount))
const formattedDate = computed(() => formatDate(props.date))
const amountColor = computed(() => formmattedAmount.value.includes("+") && "text-secondary-green")



</script>

<template>
     <article class="flex items-center gap-4">
        <div class="w-10 h-10 relative overflow-hidden rounded-full">
            <img class="absolute w-full h-full top-0 left-0" :src="avatar" :alt="name" height="40" width="40">
        </div>
        <h3 class="font-bold text-sm">{{ name }}</h3>

        <dl class="ml-auto text-right">
            <dt class="font-bold text-sm mb-2" :class="amountColor">{{ formmattedAmount }}</dt>
            <dd class="text-xs text-grey-500">{{ formattedDate }}</dd>
        </dl>
    </article>
</template>