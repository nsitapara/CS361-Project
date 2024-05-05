import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.user_metadata.username}!
      <form action={signOut}>
        <button className="py-2 px-3 mr-4 flex rounded-md no-underline bg-emerald-700 hover:bg-emerald-800">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 mr-4 flex rounded-md no-underline bg-emerald-700 hover:bg-emerald-800"
    >
      Login
    </Link>
  );
}
