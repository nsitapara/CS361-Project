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

export async function fetchGroupsOptions() {
  const {
    data: { user: current_user },
  } = await supabaseClient.auth.getUser();
  const user_id = current_user?.id;
  const user_email = current_user?.email;

  const allGroups = [];
  const { data: groupsCreated } = await supabase
    .from("groups")
    .select("group_id, group_name")
    .eq("created_by", user_id);
  console.log(groupsCreated);

  const { data: groupsJoined } = await supabase
    .from("groups")
    .select("group_id, group_name")
    .contains("members", [user_email]);
  console.log(groupsJoined);
  return [...groupsCreated, ...groupsJoined];
}
