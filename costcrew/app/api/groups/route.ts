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
    const { data } = await supabase
      .from("groups")
      .select("group_id, group_name")
      .contains("members", [user_email]);
    groupsJoined.push(data);
  }

  return NextResponse.json({
    options: [...(groupsCreated ?? []), ...(groupsJoined ?? [])],
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const group_name = body["group_name"];
  const members = body["group_members"];
  const members_list = members.split(",");

  const { data, error } = await supabase
    .from("groups")
    .update({
      group_name: group_name,
      members: members_list,
    })
    .eq("group_id", body.group_id)
    .select();
  if (error) throw error;
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const group_id = body["group_id"];

  const { data, error } = await supabase
    .from("groups")
    .delete()
    .eq("group_id", group_id)
    .select();
  if (error) {
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 },
    );
  }
  return NextResponse.json(data);
}
