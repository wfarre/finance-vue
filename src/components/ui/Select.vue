<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ options: object; value: string }>();
const optionList = computed(() => Object.keys(props.options));
const emits = defineEmits<{ (e: "select", newValue: string): void }>();
const themes = (theme: string) => props.options[theme as keyof object] || "";
</script>

<template>
  <label for="theme" class="flex flex-col gap-1">
    Theme
    <select
      class="select-base border-grey-900 h-11 rounded-2xl border px-5 text-sm"
      :value="value"
      v-on:input="(e) => emits('select', (e.target as HTMLSelectElement).value)"
    >
      <button class="flex gap-4">
        <selectedcontent class="flex gap-4"></selectedcontent>
      </button>
      <option
        v-for="option in optionList"
        class="border-b-grey-100 mx-5 border-b py-3 capitalize"
        :value="option"
      >
        <div class="h-4 w-4 rounded-full" :class="`${themes(option)}`"></div>
        {{ option }}
      </option>
    </select>
  </label>
</template>

<style scoped lang="css">
select,
select::picker(select) {
  appearance: base-select;
  border-radius: 8px;
  /* border: none; */
}

select {
  background-color: white;
}

select::picker-icon {
  display: none;
}

select::button {
  display: flex;
}

/* select::picker(select){
        box-shadow: 0px 0px 32px hsl(252, 7%, 13%, 0.2);
        margin: 20px 0;
    } */

option::checkmark {
  position: absolute;
  right: 0;
  transform: translateY(-50%);
  top: 50%;
  content: url("/images/icon-selected.svg");
}

option,
selectedcontent {
  position: relative;
  display: flex;
  align-items: center;
}
</style>
