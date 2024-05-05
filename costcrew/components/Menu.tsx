import AuthButton from "@/components/AuthButton";
import HomeButton from "@/components/HomeButton";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import SignUpButton from "./SignUpButton";
import { ModeToggle } from "./ModeToggle";

export default async function Menu() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full max-w-4xl flex justify-center border-b border-b-foreground/10 h-16">
      <div className="flex items-center justify-center">
        <HomeButton />
      </div>
      <div className="w-full max-w-4xl flex items-center justify-end p-3 text-sm">
        <AuthButton />
        <SignUpButton />
        <ModeToggle />
      </div>
    </nav>
  );
}
