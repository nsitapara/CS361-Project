import { supabase } from "@/utils/supabase/client";

export async function fetchGroupData() {
  let { data: groups, error } = await supabase.from("groups").select("*");
  if (error) {
    console.error("error fetching groups", error);
  } else {
    return groups;
  }
}

export async function fetchExpenseData() {
  let { data: expenses, error } = await supabase
    .from("expenses")
    .select("expense_id,date, expense_name, group, cost, groups(group_name)")
    .order("date", { ascending: false })
    .limit(10);
  if (error) {
    console.error("error fetching expenses", error);
  } else {
    return expenses;
  }
}
