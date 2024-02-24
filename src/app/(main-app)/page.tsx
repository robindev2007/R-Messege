import Sidebar from "./_components/Sidebar/Sidebar";
import Chats from "./_components/ChatComponent/Chat";
import { createSupabaseServerClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user?.id) return redirect("/auth/login");

  if (userData.user?.id)
    return (
      <div className="flex h-full w-full flex-row overflow-hidden">
        <Sidebar />
        <Chats />
      </div>
    );
}

// BXPYKSF196WDA1H8NU24WPNX
