import { supabase } from "@/utils/supabase/client";
import { createClientServer } from "@/utils/supabase/server";

const supabaseClient = createClientServer();

export async function fetchGroupData() {
  const {
    data: { user: current_user },
  } = await supabaseClient.auth.getUser();
  const user_id = current_user?.id;
  let { data: groups, error } = await supabase
    .from("groups")
    .select("*")
    .eq("created_by", user_id as string);
  if (error) {
    console.error("error fetching groups", error);
  } else {
    return groups;
  }
}

export async function fetchExpenseData() {
  const {
    data: { user: current_user },
  } = await supabaseClient.auth.getUser();
  const user_email = current_user?.email;
  let { data: expenses, error } = await supabase
    .from("expenses")
    .select("expense_id,date, expense_name, group, cost, groups(group_name)")
    .order("date", { ascending: false })
    .contains("split_by", [user_email])
    .limit(10);
  if (error) {
    console.error("error fetching expenses", error);
  } else {
    return expenses;
  }
}

export async function fetchGroupsOptions(user_id: string, user_email: string) {
  const { data: groupsCreated } = await supabase
    .from("groups")
    .select("group_id, group_name")
    .eq("created_by", user_id as string);

  const { data: groupsJoined } = await supabase
    .from("groups")
    .select("group_id, group_name")
    .contains("members", [user_email]);
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
