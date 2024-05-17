import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const group_id = params.get("group_id") as string;
  let { data: expenses, error } = await supabase
    .from("expenses")
    .select("total_cost, split_by")
    .eq("group", group_id);
  if (error) {
    console.error("error fetching expenses", error);
  }

  if (!expenses) {
    return NextResponse.json({ summary: [], total: "0" });
  }

  let total = 0;
  let summary: any = {};
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const split_by = expense.split_by;
    const total_cost = expense.total_cost;
    const len_of_split_by = split_by?.length;

    if (!split_by || !total_cost || !len_of_split_by) {
      continue;
    }
    for (let j = 0; j < len_of_split_by; j++) {
      const member = split_by[j] as string;
      if (summary[member]) {
        summary[member] += total_cost / len_of_split_by;
      } else {
        summary[member] = total_cost / len_of_split_by;
      }
    }
    total += total_cost;
  }

  console.log("summary", summary);
  console.log("total", total);
  const data = Object.entries(summary).map(([member, cost]) => {
    return {
      member: member,
      cost: (cost as number).toFixed(2),
      percentage: (((cost as number) / total) * 100).toFixed(2),
    };
  });

  const to_return = { summary: data, total: total };
  return NextResponse.json(to_return);
}
