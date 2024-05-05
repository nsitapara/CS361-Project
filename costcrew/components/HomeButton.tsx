import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function HomeButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Link
      href={user ? "/dashboard" : "/"}
      className="py-2 px-3 mr-4 flex rounded-md no-underline bg-emerald-700 hover:bg-emerald-800"
    >
      CostCrew
    </Link>
  );
}
