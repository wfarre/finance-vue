<script setup lang="ts">
import { computed, ref } from "vue";
import { roundNumberToTwoDecinals, formatCurrency } from "../../utils/utils";
import ModalLayout from "./ModalLayout.vue";
import type { PotFactory } from "../../factories/PotFactory";
import type { IPot, Pot } from "../../models/Pot";
const emits = defineEmits<{
  (e: "closeModal"): void;
  (e: "updateUI"): void;
}>();

const props = defineProps<{
  formType: "add" | "withdraw";
  pot?: IPot;
}>();

const variableAmount = ref(0);

const modalText = computed(() => {
  switch (props.formType) {
    case "add":
      return "Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.";
    case "withdraw":
      return " Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.";
    default:
      return "";
  }
});

const newTotalPercentage = computed(() => {
  const potTotal = props.pot ? props.pot.total : 0;
  const potTarget = props.pot ? props.pot.target : 1;
  const varAmount = variableAmount.value;

  const percentage =
    props.formType === "add"
      ? ((potTotal + varAmount) / potTarget) * 100
      : (potTotal / potTarget) * 100;

  return roundNumberToTwoDecinals(percentage);
});

const variableAmountPercentage = computed(() => {
  const varAmount = variableAmount.value;
  const potTotal = props.pot ? props.pot.total : 0;
  const percentage = props.formType
    ? (varAmount / (potTotal + varAmount)) * 100
    : (varAmount / (potTotal - varAmount)) * 100;

  return roundNumberToTwoDecinals(percentage);
});

const newTotalAmount = computed(() => {
  const potTotal = props.pot ? props.pot.total : 0;
  const varAmount = variableAmount.value;

  return props.formType === "add" ? potTotal + varAmount : potTotal - varAmount;
});

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  const potTotal = props.pot ? props.pot.total : 0;
  const potId = props.pot ? props.pot.id : null;

  if (!potId) {
    return;
  }

  const newTotal =
    props.formType === "add"
      ? potTotal + variableAmount.value
      : potTotal - variableAmount.value;

  await fetch(`http://localhost:3333/pots/${potId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ total: newTotal }),
  })
    .then((res) => res.json())
    .then((data) => {
      emits("updateUI");
      emits("closeModal");
    })
    .catch((err) => console.log(err));
};
</script>

<template>
  <ModalLayout
    @close-modal="() => emits('closeModal')"
    :modal-title="`${formType === 'add' ? 'Add to' : 'Withdraw from'} '${pot?.name}'`"
    :modal-text="modalText"
    :form="formType + 'form'"
  >
    <section>
      <div class="flex flex-col gap-4">
        <dl class="flex items-center justify-between">
          <dt class="text-grey-500 text-sm">New Amount</dt>
          <dd class="text-[32px] font-bold">
            {{ formatCurrency(newTotalAmount) }}
          </dd>
        </dl>
        <div class="bg-beige-100 h-2 w-full overflow-hidden rounded-2xl">
          <div
            :style="[`transform:scaleX(${newTotalPercentage}%) `]"
            class="bg-grey-900 h-full w-full origin-left overflow-hidden rounded-2xl transition-all duration-700"
          >
            <div
              :style="[`transform:scaleX(${variableAmountPercentage}%) `]"
              :class="
                formType === 'add' ? 'bg-secondary-green' : 'bg-secondary-red'
              "
              class="h-full w-full origin-right transition-all duration-700"
            ></div>
          </div>
        </div>
        <dl class="text-grey-500 flex justify-between text-xs">
          <dt
            :class="
              variableAmount &&
              (formType === 'add'
                ? 'text-secondary-green'
                : 'text-secondary-red')
            "
          >
            {{ newTotalPercentage }}%
          </dt>
          <dd>Target of {{ pot && formatCurrency(pot?.target, false) }}</dd>
        </dl>
      </div>
    </section>
    <form
      :id="formType + 'form'"
      class="mt-5"
      method="GET"
      v-on:submit="handleSubmit"
      action="/pots"
    >
      <label for="amountToAdd" class="flex flex-col gap-1">
        Amount to {{ formType }}
        <input
          :value="variableAmount"
          v-on:input="
            (e) => (variableAmount = +(e.target as HTMLInputElement).value)
          "
          type="number"
          name="amountToAdd"
          id="amountToAdd"
          class="border-grey-900 h-11 rounded-lg border px-5 text-sm"
          min="0"
        />
      </label>
    </form>
  </ModalLayout>
</template>
