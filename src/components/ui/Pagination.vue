<template>
     <div class="flex justify-between">
        <button v-on:click="handlePrevPageClick" class="flex gap-4 px-4 py-3 border border-beige-500 rounded-lg text-sm cursor-pointer"><img src="/images/icon-caret-left.svg"/>Previous</button>
        <ul class="flex gap-2">
            <li v-for="n in maxPage">
                <button v-on:click="handlePageClick" :data-value="n" :class="currentPage === n && 'bg-grey-900 text-white'" class="cursor-pointer h-10 w-10 flex items-center justify-center border border-beige-500 rounded-lg ">{{n}}</button>
            </li>
        </ul>
        <button v-on:click="handleNextPageClick" class=" flex gap-4 px-4 py-3 border border-beige-500 rounded-lg text-sm cursor-pointer">Next<img src="/images/icon-caret-right.svg"/></button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{currentPage:number, maxPage: number}>()
const emit = defineEmits<{
    (e:'setPage',value:number):void,
    (e:'nextPage',value:number):void,
    (e:'prevPage',value:number):void,
}>()


const handlePageClick = (e: Event) =>{
    const target = e.target as HTMLElement
    const value = target.dataset.value
    if(value){
        emit('setPage',+value);
    }
} 
const handleNextPageClick = () => props.currentPage < props.maxPage && emit('nextPage', props.currentPage + 1)
const handlePrevPageClick = () => props.currentPage > 1 && emit('prevPage', props.currentPage - 1)

</script>