import BudgetsPage from "./pages/BudgetsPage.vue";
import HomePage from "./pages/HomePage.vue";
import PotsPage from "./pages/PotsPage.vue";
import RecurringBills from "./pages/RecurringBills.vue";
import TransactionsPage from "./pages/TransactionsPage.vue";

export const routes = [
  { path: "/", component: HomePage },
  { path: "/budgets", component: BudgetsPage },
  { path: "/recurring-bills", component: RecurringBills },
  { path: "/pots", component: PotsPage },
  { path: "/transactions", component: TransactionsPage },
];
