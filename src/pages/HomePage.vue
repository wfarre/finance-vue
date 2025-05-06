<template>
  <PageHeader title="Overview" />
  <main>
    <section class="mb-8 flex w-full justify-between gap-6">
      <ValueCard label="Total Saved" :value="4836.0" bg-color="bg-grey-900" />
      <ValueCard label="Total Saved" :value="4836.0" bg-color="bg-white" />
      <ValueCard label="Total Saved" :value="4836.0" bg-color="bg-white" />
    </section>
    <section class="flex gap-6">
      <div class="flex flex-6/12 flex-col gap-6 bg-amber-400">
        <OverviewCard heading-text="Pots" details-link="/pots">
          <div class="flex items-center gap-5">
            <ValueCard
              label="Total Saved"
              :value="850"
              icon="/images/icon-pot.svg"
              bg-color=" bg-beige-100"
            />
            <ul class="flex flex-1/2 flex-wrap gap-y-4">
              <li v-for="pot in potsDataToDisplay" class="h-11 flex-1/2">
                <PotsSplitCard
                  :name="pot.name"
                  :total="pot.total"
                  :theme="pot.theme"
                />
              </li>
            </ul>
          </div>
        </OverviewCard>

        <OverviewCard
          heading-text="Transactions"
          details-link="/transactions"
          link-text="View All"
        >
          <div class="flex items-center gap-5">
            <ul class="flex flex-wrap gap-y-11">
              <li
                v-for="transaction in transactionsDataToDisplay"
                class="h-11 w-full"
              >
                <TransactionCard
                  :amount="transaction.amount"
                  :avatar="transaction.avatar"
                  :date="transaction.date"
                  :name="transaction.name"
                />
              </li>
            </ul>
          </div>
        </OverviewCard>
      </div>
      <div class="flex flex-4/12 flex-col gap-6 bg-purple-400">
        <OverviewCard heading-text="Budgets" details-link="/budgets">
          <Chart />
        </OverviewCard>

        <OverviewCard
          heading-text="Recurring Bills"
          details-link="/recurring-bills"
        >
          <ul></ul>
        </OverviewCard>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import OverviewCard from "../components/ui/OverviewCard.vue";
import PotsSplitCard from "../components/ui/PotsSplitCard.vue";
import ValueCard from "../components/ui/ValueCard.vue";
import TransactionCard from "../components/ui/TransactionCard.vue";
import Chart from "../components/ui/MyChart.vue";
import { computed, ref } from "vue";
import PageHeader from "../components/layout/PageHeader.vue";

const allData = ref(null);

fetch("/data/data.json")
  .then((res) => res.json())
  .then((data) => (allData.value = data))
  .catch((err) => console.log(err));

console.log(allData);

const potsDataToDisplay = computed(() => allData.value?.pots?.slice(0, 4));
const transactionsDataToDisplay = computed(() =>
  allData.value?.transactions?.slice(0, 5),
);
</script>
