import { createSupabaseServerClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function AuthLayout({ children }: { children: ReactNode }) {
  const supabase = createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();

  if (userData.user) return redirect("/");

  if (!userData.user)
    return <div className="h-screen w-screen">{children}</div>;
  return "Loading";
}

export default AuthLayout;

// npx supabase gen types typescript --project-id uzvunajzkvpimdfiyhzb --schema public > src/types/supabase.ts
