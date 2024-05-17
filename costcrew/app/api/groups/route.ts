import { fetchGroupsOptions } from "@/app/dashboard/FetchData";
import { supabase } from "@/utils/supabase/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const user_id = params.get("user_id") as string;
  const user_email = params.get("user_email") as string;
  console.log("GET request", user_id, user_email);

  const { data: groupsCreated } = await supabase
    .from("groups")
    .select("group_id, group_name")
    .eq("created_by", user_id as string);
  const groupsJoined = [];
  if (user_email !== null) {
    console.log("RUNNING CONDITION", user_email);
    const { data } = await supabase
      .from("groups")
      .select("group_id, group_name")
      .contains("members", [user_email]);
    console.log("DATA", data);
    groupsJoined.push(data);
  }
  return NextResponse.json({
    options: [...(groupsCreated ?? []), ...(groupsJoined ?? [])],
  });
}
