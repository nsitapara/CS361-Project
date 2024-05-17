import { createClientServer } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignUpButton() {
  const supabase = createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClientServer();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    !user && (
      <Link
        href="/signup"
        className="py-2 px-3 mr-4 flex rounded-md no-underline bg-emerald-700 hover:bg-emerald-800"
      >
        Sign Up
      </Link>
    )
  );
}
