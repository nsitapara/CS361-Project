import { supabase } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";

const supabaseClient = createClient();

export async function fetchGroupData() {
  const {
    data: { user: current_user },
  } = await supabaseClient.auth.getUser();
  const user_id = current_user?.id;
  let { data: groups, error } = await supabase
    .from("groups")
    .select("*")
    .eq("created_by", user_id);
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

export async function fetchGroupsOptions() {
  const data = [
    {
      member: "Tom123",
      cost: "$305",
      percentage: "64.21%",
    },
    {
      member: "Nick321",
      cost: "$95",
      percentage: "20.00%",
    },
    {
      member: "Tom123",
      cost: "$75",
      percentage: "15.79%",
    },
  ];
  return data;
}
