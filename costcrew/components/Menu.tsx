import AuthButton from "@/components/AuthButton";
import HomeButton from "@/components/HomeButton";
import DashboardButton from "@/components/DashboardButton";
import { createClientServer } from "@/utils/supabase/server";
import React from "react";
import SignUpButton from "./SignUpButton";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

export default async function Menu() {
  const supabase = createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full max-w-4xl flex justify-center border-b border-b-foreground/10 h-16">
      <div className="flex items-center justify-center">
        <Link href="/" className="btn-menu">
          CostCrew
        </Link>
        {user && (
          <Link href="/dashboard" className="btn-menu">
            Dashboard
          </Link>
        )}
        {user && (
          <Link href="/groups" className="btn-menu">
            Groups
          </Link>
        )}
        {user && (
          <Link href="/expenses" className="btn-menu">
            Expenses
          </Link>
        )}
        {user && (
          <Link href="/about" className="btn-menu">
            About
          </Link>
        )}
      </div>
      <div className="w-full max-w-4xl flex items-center justify-end p-3 text-sm">
        <AuthButton />
        <SignUpButton />
        <ModeToggle />
      </div>
    </nav>
  );
}
