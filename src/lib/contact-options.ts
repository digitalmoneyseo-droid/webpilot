import type { MessageKey } from "@/i18n/translations";

export const budgetOptions = [
  { id: "budget-1", messageKey: "contact.formBudget1" },
  { id: "budget-2", messageKey: "contact.formBudget2" },
  { id: "budget-3", messageKey: "contact.formBudget3" },
  { id: "budget-4", messageKey: "contact.formBudget4" },
  { id: "budget-5", messageKey: "contact.formBudgetUnsure" },
] as const satisfies readonly { id: string; messageKey: MessageKey }[];

export type BudgetId = (typeof budgetOptions)[number]["id"];

export function isBudgetId(value: string): value is BudgetId {
  return budgetOptions.some(({ id }) => id === value);
}
