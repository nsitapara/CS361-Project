import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Expenses() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-1">
      <h3 className="font-bold text-3xl text-center pt-5">Manage Expenses</h3>
    </div>
  );
}
