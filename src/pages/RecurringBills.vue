<script setup>
import PageHeader from "../components/layout/PageHeader.vue";
import { formatCurrency } from "../utils/utils";
import SortSelect from "../components/ui/FilterSelect.vue";
import { computed, ref } from "vue";
import SearchBar from "../components/ui/SearchBar.vue";

const sortBy = ref("latest");
const search = ref("");
</script>

<template>
  <PageHeader title="Recurring Bills" />

  <main>
    <div class="flex">
      <section class="flex-1/3">
        <article class="bg-grey-900 rounded-xl p-6 text-white">
          <img src="/images/icon-recurring-bills.svg" alt="" />
          <dl class="mt-8 flex flex-col gap-3">
            <dt class="text-sm">Total Bills</dt>
            <dd class="text-[32px] font-bold">{{ formatCurrency(384) }}</dd>
          </dl>
        </article>
        <article class="mt-6 rounded-xl bg-white p-6">
          <header>
            <h3 class="font-bold">Summary</h3>
          </header>
          <ul class="mt-5 flex flex-col gap-8">
            <li>
              <dl class="flex justify-between">
                <dt class="text-xs">Paid Bills</dt>
                <dd class="text-xs font-bold">4 ({{ formatCurrency(190) }})</dd>
              </dl>
            </li>
            <li>
              <dl class="flex justify-between">
                <dt class="text-xs">Total Upcoming</dt>
                <dd class="text-xs font-bold">4 ({{ formatCurrency(190) }})</dd>
              </dl>
            </li>
            <li>
              <dl class="flex justify-between">
                <dt class="text-secondary-red text-xs">Due Soon</dt>
                <dd class="text-secondary-red text-xs font-bold">
                  4 ({{ formatCurrency(190) }})
                </dd>
              </dl>
            </li>
          </ul>
        </article>
      </section>

      <section class="flex-2/3">
        <header class="flex">
          <SearchBar v-model="search" />
          <SortSelect v-model="sortBy" />
        </header>
      </section>
    </div>
  </main>
</template>
