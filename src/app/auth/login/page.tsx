import React, { FormEvent } from "react";
import LogInForm from "./LogInForm";
import Link from "next/link";
import { createSupabaseServerClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page | Chatter",
};

async function LoginMainPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col gap-3 rounded-md border border-border bg-foreground px-3 py-2 md:min-w-64">
        <div className="flex flex-col items-center justify-center">
          <p>Welcome to MeChat</p>
        </div>
        <LogInForm />
        <div className="text-left text-sm text-text-secondary">
          <p>
            Don&apos;t have an account?{" "}
            <Link href={"/auth/singup"} className="text-primary">
              Create Account
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginMainPage;
