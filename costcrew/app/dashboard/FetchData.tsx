import { supabase } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";

export async function fetchGroupData() {
  const supabaseClient = createClient();
  const {
    data: { user: current_user },
  } = await supabaseClient.auth.getUser();
  const user_id = current_user?.id;
  let { data: groups, error } = await supabase
    .from("groups")
    .select("*")
    .eq("created_by", user_id as string)
    .order("group_id", { ascending: true });
  if (error) {
    console.error("error fetching groups", error);
  } else {
    return groups;
  }
}

export async function fetchExpenseData() {
  const supabaseClient = createClient();
  const {
    data: { user: current_user },
  } = await supabaseClient.auth.getUser();
  const user_email = current_user?.email;
  let { data: expenses, error } = await supabase
    .from("expenses")
    .select(
      "expense_id,date,expense_name, group, total_cost, cost, split_by, groups(group_name, group_id)"
    )
    .order("date", { ascending: true })
    .contains("split_by", [user_email])
    .limit(10);
  if (error) {
    console.error("error fetching expenses", error);
  } else {
    return expenses;
  }
}

export async function fetchGroupsOptions() {
  const supabaseClient = createClient();
  const {
    data: { user: current_user },
  } = await supabaseClient.auth.getUser();
  const user_id = current_user?.id;
  const user_email = current_user?.email;
  const { data: groupsCreated } = await supabase
    .from("groups")
    .select("group_id, group_name")
    .order("group_id", { ascending: false })
    .eq("created_by", user_id as string);

  const groupsJoined = [];
  if (user_email !== null) {
    const { data } = await supabase
      .from("groups")
      .select("group_id, group_name")
      .order("group_id", { ascending: false })
      .contains("members", [user_email]);
    groupsJoined.push(data);
  }
  return [...(groupsCreated ?? []), ...(groupsJoined ?? [])];
}

export async function fetchExpenseByGroup(group_id: string) {
  let { data: expenses, error } = await supabase
    .from("expenses")
    .select("expense_id,date, expense_name, group, cost, groups(group_name)")
    .eq("group", group_id);

  if (error) {
    console.error("error fetching expenses", error);
  } else {
    return expenses;
  }
}
