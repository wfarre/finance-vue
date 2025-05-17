<script setup lang="ts">
import { onMounted } from "vue";
import PageHeader from "../components/layout/PageHeader.vue";
import BudgetChart from "../components/ui/BudgetChart.vue";
import { TransactionFactory } from "../factories/TransactionFactory";

const budgets = [
  {
    category: "Entertainment",
    maximum: 50.0,
    theme: "#277C78",
  },
  {
    category: "Bills",
    maximum: 750.0,
    theme: "#82C9D7",
  },
  {
    category: "Dining Out",
    maximum: 75.0,
    theme: "#F2CDAC",
  },
  {
    category: "Personal Care",
    maximum: 100.0,
    theme: "#626070",
  },
];

const transactions = [
  {
    avatar: "/images/avatars/emma-richardson.jpg",
    name: "Emma Richardson",
    category: "General",
    date: "2024-08-19T14:23:11Z",
    amount: 75.5,
    recurring: false,
  },
  {
    avatar: "/images/avatars/savory-bites-bistro.jpg",
    name: "Savory Bites Bistro",
    category: "Dining Out",
    date: "2024-08-19T20:23:11Z",
    amount: -55.5,
    recurring: false,
  },
  {
    avatar: "/images/avatars/daniel-carter.jpg",
    name: "Daniel Carter",
    category: "General",
    date: "2024-08-18T09:45:32Z",
    amount: -42.3,
    recurring: false,
  },
  {
    avatar: "/images/avatars/sun-park.jpg",
    name: "Sun Park",
    category: "General",
    date: "2024-08-17T16:12:05Z",
    amount: 120.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/urban-services-hub.jpg",
    name: "Urban Services Hub",
    category: "General",
    date: "2024-08-17T21:08:09Z",
    amount: -65.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/liam-hughes.jpg",
    name: "Liam Hughes",
    category: "Groceries",
    date: "2024-08-15T18:20:33Z",
    amount: 65.75,
    recurring: false,
  },
  {
    avatar: "/images/avatars/lily-ramirez.jpg",
    name: "Lily Ramirez",
    category: "General",
    date: "2024-08-14T13:05:27Z",
    amount: 50.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/ethan-clark.jpg",
    name: "Ethan Clark",
    category: "Dining Out",
    date: "2024-08-13T20:15:59Z",
    amount: -32.5,
    recurring: false,
  },
  {
    avatar: "/images/avatars/james-thompson.jpg",
    name: "James Thompson",
    category: "Entertainment",
    date: "2024-08-11T15:45:38Z",
    amount: -5.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/pixel-playground.jpg",
    name: "Pixel Playground",
    category: "Entertainment",
    date: "2024-08-11T18:45:38Z",
    amount: -10.0,
    recurring: true,
  },
  {
    avatar: "/images/avatars/ella-phillips.jpg",
    name: "Ella Phillips",
    category: "Dining Out",
    date: "2024-08-10T19:22:51Z",
    amount: -45.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/sofia-peterson.jpg",
    name: "Sofia Peterson",
    category: "Transportation",
    date: "2024-08-08T08:55:17Z",
    amount: -15.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/mason-martinez.jpg",
    name: "Mason Martinez",
    category: "Lifestyle",
    date: "2024-08-07T17:40:29Z",
    amount: -35.25,
    recurring: false,
  },
  {
    avatar: "/images/avatars/green-plate-eatery.jpg",
    name: "Green Plate Eatery",
    category: "Groceries",
    date: "2024-08-06T08:25:44Z",
    amount: -78.5,
    recurring: false,
  },
  {
    avatar: "/images/avatars/sebastian-cook.jpg",
    name: "Sebastian Cook",
    category: "Transportation",
    date: "2024-08-06T10:05:44Z",
    amount: -22.5,
    recurring: false,
  },
  {
    avatar: "/images/avatars/william-harris.jpg",
    name: "William Harris",
    category: "Personal Care",
    date: "2024-08-05T14:30:56Z",
    amount: -10.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/elevate-education.jpg",
    name: "Elevate Education",
    category: "Education",
    date: "2024-08-04T11:15:22Z",
    amount: -50.0,
    recurring: true,
  },
  {
    avatar: "/images/avatars/serenity-spa-and-wellness.jpg",
    name: "Serenity Spa & Wellness",
    category: "Personal Care",
    date: "2024-08-03T14:00:37Z",
    amount: -30.0,
    recurring: true,
  },
  {
    avatar: "/images/avatars/spark-electric-solutions.jpg",
    name: "Spark Electric Solutions",
    category: "Bills",
    date: "2024-08-02T09:25:11Z",
    amount: -100.0,
    recurring: true,
  },
  {
    avatar: "/images/avatars/rina-sato.jpg",
    name: "Rina Sato",
    category: "Bills",
    date: "2024-08-02T13:31:11Z",
    amount: -50.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/swift-ride-share.jpg",
    name: "Swift Ride Share",
    category: "Transportation",
    date: "2024-08-01T18:40:33Z",
    amount: -18.75,
    recurring: false,
  },
  {
    avatar: "/images/avatars/aqua-flow-utilities.jpg",
    name: "Aqua Flow Utilities",
    category: "Bills",
    date: "2024-07-30T13:20:14Z",
    amount: -100.0,
    recurring: true,
  },
  {
    avatar: "/images/avatars/ecofuel-energy.jpg",
    name: "EcoFuel Energy",
    category: "Bills",
    date: "2024-07-29T11:55:29Z",
    amount: -35.0,
    recurring: true,
  },
  {
    avatar: "/images/avatars/yuna-kim.jpg",
    name: "Yuna Kim",
    category: "Dining Out",
    date: "2024-07-29T13:51:29Z",
    amount: -28.5,
    recurring: false,
  },
  {
    avatar: "/images/avatars/flavor-fiesta.jpg",
    name: "Flavor Fiesta",
    category: "Dining Out",
    date: "2024-07-27T20:15:06Z",
    amount: -42.75,
    recurring: false,
  },
  {
    avatar: "/images/avatars/harper-edwards.jpg",
    name: "Harper Edwards",
    category: "Shopping",
    date: "2024-07-26T09:43:23Z",
    amount: -89.99,
    recurring: false,
  },
  {
    avatar: "/images/avatars/buzz-marketing-group.jpg",
    name: "Buzz Marketing Group",
    category: "General",
    date: "2024-07-26T14:40:23Z",
    amount: 3358.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/technova-innovations.jpg",
    name: "TechNova Innovations",
    category: "Shopping",
    date: "2024-07-25T16:25:37Z",
    amount: -29.99,
    recurring: false,
  },
  {
    avatar: "/images/avatars/bytewise.jpg",
    name: "ByteWise",
    category: "Lifestyle",
    date: "2024-07-23T09:35:14Z",
    amount: -49.99,
    recurring: true,
  },
  {
    avatar: "/images/avatars/nimbus-data-storage.jpg",
    name: "Nimbus Data Storage",
    category: "Bills",
    date: "2024-07-21T10:05:42Z",
    amount: -9.99,
    recurring: true,
  },
  {
    avatar: "/images/avatars/emma-richardson.jpg",
    name: "Emma Richardson",
    category: "General",
    date: "2024-07-20T17:30:55Z",
    amount: -25.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/daniel-carter.jpg",
    name: "Daniel Carter",
    category: "General",
    date: "2024-07-19T12:45:09Z",
    amount: 50.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/sun-park.jpg",
    name: "Sun Park",
    category: "General",
    date: "2024-07-18T19:20:23Z",
    amount: -38.5,
    recurring: false,
  },
  {
    avatar: "/images/avatars/harper-edwards.jpg",
    name: "Harper Edwards",
    category: "Shopping",
    date: "2024-07-17T14:55:37Z",
    amount: -29.99,
    recurring: false,
  },
  {
    avatar: "/images/avatars/liam-hughes.jpg",
    name: "Liam Hughes",
    category: "Groceries",
    date: "2024-07-16T10:10:51Z",
    amount: -52.75,
    recurring: false,
  },
  {
    avatar: "/images/avatars/lily-ramirez.jpg",
    name: "Lily Ramirez",
    category: "General",
    date: "2024-07-15T16:35:04Z",
    amount: 75.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/ethan-clark.jpg",
    name: "Ethan Clark",
    category: "Dining Out",
    date: "2024-07-14T20:50:18Z",
    amount: -41.25,
    recurring: false,
  },
  {
    avatar: "/images/avatars/rina-sato.jpg",
    name: "Rina Sato",
    category: "Entertainment",
    date: "2024-07-13T09:15:32Z",
    amount: -10.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/james-thompson.jpg",
    name: "James Thompson",
    category: "Bills",
    date: "2024-07-12T13:40:46Z",
    amount: -95.5,
    recurring: false,
  },
  {
    avatar: "/images/avatars/ella-phillips.jpg",
    name: "Ella Phillips",
    category: "Dining Out",
    date: "2024-07-11T18:05:59Z",
    amount: -33.75,
    recurring: false,
  },
  {
    avatar: "/images/avatars/yuna-kim.jpg",
    name: "Yuna Kim",
    category: "Dining Out",
    date: "2024-07-10T12:30:13Z",
    amount: -27.5,
    recurring: false,
  },
  {
    avatar: "/images/avatars/sofia-peterson.jpg",
    name: "Sofia Peterson",
    category: "Transportation",
    date: "2024-07-09T08:55:27Z",
    amount: -12.5,
    recurring: false,
  },
  {
    avatar: "/images/avatars/mason-martinez.jpg",
    name: "Mason Martinez",
    category: "Lifestyle",
    date: "2024-07-08T15:20:41Z",
    amount: -65.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/sebastian-cook.jpg",
    name: "Sebastian Cook",
    category: "Transportation",
    date: "2024-07-07T11:45:55Z",
    amount: -20.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/william-harris.jpg",
    name: "William Harris",
    category: "General",
    date: "2024-07-06T17:10:09Z",
    amount: 20.0,
    recurring: false,
  },
  {
    avatar: "/images/avatars/elevate-education.jpg",
    name: "Elevate Education",
    category: "Education",
    date: "2024-07-05T11:15:22Z",
    amount: -50.0,
    recurring: true,
  },
  {
    avatar: "/images/avatars/serenity-spa-and-wellness.jpg",
    name: "Serenity Spa & Wellness",
    category: "Personal Care",
    date: "2024-07-03T14:00:37Z",
    amount: -30.0,
    recurring: true,
  },
  {
    avatar: "/images/avatars/spark-electric-solutions.jpg",
    name: "Spark Electric Solutions",
    category: "Bills",
    date: "2024-07-02T09:25:51Z",
    amount: -100.0,
    recurring: true,
  },
  {
    avatar: "/images/avatars/swift-ride-share.jpg",
    name: "Swift Ride Share",
    category: "Transportation",
    date: "2024-07-02T19:50:05Z",
    amount: -16.5,
    recurring: false,
  },
];

const formattedTransactions = transactions.map(
  (t) => new TransactionFactory(t, "json"),
);
const categories: string[] = [];
const categoriesObject: { [key: string]: string } = {};

transactions.forEach((t) => {
  const category = categoriesObject[t.category];
  if (!category) {
    categoriesObject[t.category] = t.category;
    categories.push(t.category);
  }
});
</script>

<template>
  <PageHeader title="Budgets" />
  <main>
    <div class="flex">
      <div class="pr-3">
        <section class="flex-5/12 rounded-xl bg-white p-8">
          <BudgetChart />
          <h2 class="pt-8 text-xl font-bold">Speding Summary</h2>
          <ul class="mt-8 flex flex-col gap-8">
            <li
              v-for="budget in budgets"
              class="relative flex items-baseline justify-between pl-4"
            >
              <div
                :class="`bg-[#626070]`"
                class="absolute top-0 left-0 h-full w-0.5"
              ></div>
              <p class="text-grey-500 text-sm">{{ budget.category }}</p>
              <p class="text-grey-900 text-base font-bold">
                $15
                <span class="text-grey-500 text-xs font-normal"
                  >of {{ budget.maximum }}$</span
                >
              </p>
            </li>
          </ul>
        </section>
      </div>

      <ul class="flex-7/12 pl-3">
        <li v-for="category in categories" class="mb-6">
          <article class="rounded-2xl bg-white p-8">
            <header>
              <div class="mb-5">
                <span class="bg-secondary-green h-4 w-4"></span>
                <h3 class="text-xl font-bold">{{ category }}</h3>
              </div>
              <p class="text-grey-500 mb-4 text-sm">Maximum 50$</p>
              <div class="bg-beige-100 h-8 w-full rounded-b-sm p-1">
                <div class="bg-secondary-green h-full w-9/12 rounded-sm"></div>
              </div>
              <ul class="mt-4 flex">
                <li class="relative flex-1/2 pl-4">
                  <span
                    class="bg-secondary-green absolute top-0 left-0 h-full w-1 rounded-lg"
                  ></span>
                  <dl class="flex flex-col gap-1">
                    <dt class="text-grey-500 text-xs">Spent</dt>
                    <dd class="texte-grey-900 text-bold text-sm">$15.00</dd>
                  </dl>
                </li>
                <li class="relative flex-1/2 pl-4">
                  <span
                    class="bg-beige-100 absolute top-0 left-0 h-full w-1 rounded-lg"
                  ></span>
                  <dl class="flex flex-col gap-1">
                    <dt class="text-grey-500 text-xs">Remaining</dt>
                    <dd class="texte-grey-900 text-bold text-sm">$15.00</dd>
                  </dl>
                </li>
              </ul>
            </header>
            <div class="bg-beige-100 mt-5 p-5">
              <h4 class="text-bold text-grey-900 mb-5 text-base font-bold">
                Latest Spendings
              </h4>
              <table class="w-full border-collapse">
                <tbody>
                  <tr
                    class="border-b-grey-500 border-b-1 last:border-0"
                    v-for="transaction in formattedTransactions.filter(
                      (t) =>
                        t.category.toLowerCase() === category.toLowerCase(),
                    )"
                  >
                    <td class="flex items-center gap-4 py-3 text-xs font-bold">
                      <picture
                        class="relative block h-10 w-10 overflow-hidden rounded-full"
                      >
                        <img
                          class="absolute top-0 left-0 h-full w-full"
                          :src="transaction.avatar"
                          alt=""
                        />
                      </picture>
                      {{ transaction.name }}
                    </td>
                    <td class="py-3">
                      <dl class="flex flex-col gap-1">
                        <dt class="text-grey-900 text-xs font-bold">
                          {{ transaction.formattedAmount }}
                        </dt>
                        <dd class="text-grey-500 text-xs">
                          {{ transaction.formattedDate }}
                        </dd>
                      </dl>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </main>
</template>
