import { createClientServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import GroupsPanels from "./GroupsPanel";
import ExpenseSummaryPanel from "./ExpenseSummaryPanel";
import CostSummaryPanel from "./CostSummaryPanel";

export default async function Dashboard() {
  const supabase = createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="grid grid-col-4 gap-4 divide-x-8 divide-y-8 divide-double">
      <div className="col-span-4">
        <h3 className="font-bold text-3xl text-center pt-5">Dashboard</h3>
      </div>
      <div className="col-span-2 divide-x rounded-lg">
        <GroupsPanels />
      </div>
      <div className="col-span-2 rounded-lg">
        <CostSummaryPanel />
      </div>
      <div className="col-span-4 rounded-lg">
        <ExpenseSummaryPanel />
      </div>
    </div>
  );
}
