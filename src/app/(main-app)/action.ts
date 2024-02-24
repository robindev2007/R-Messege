"use server";

import { createSupabaseServerClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export const getConversitionId = async (id1: string, id2: string) => {
  const supabase = createSupabaseServerClient();

  const { data } = await supabase
    .from("conversations")
    .select()
    .or(`id1.eq.${id1},id2.eq.${id2}`)
    .or(`id1.eq.${id2},id2.eq.${id1}`)
    .single();

  return data;
};

export const getConversitions = async (id: string) => {
  const supabase = createSupabaseServerClient();

  const { data: conversations } = await supabase
    .from("conversations")
    .select()
    .or(`id1.eq.${id},id2.eq.${id}`)
    .limit(60);
  return conversations ? conversations : [];
};

export const chackIsFriend = async (id1: string, id2: string) => {
  const supabase = createSupabaseServerClient();

  const res = await supabase
    .from("conversations")
    .select()
    .or(`id1.eq.${id1},id2.eq.${id1}`)
    .or(`id1.eq.${id2},id2.eq.${id2}`);
  console.log(res.data);
  if (!res.data || res.data.length < 1) return false;
  if (res.data?.length > 0) return true;
  return false;
};

export const createNewFriend = async (friendId: string) => {
  const supabase = createSupabaseServerClient();

  const newConver = await supabase.from("conversations").insert({
    id2: friendId,
  });

  return newConver.status;
  console.log(newConver);
};
export const getUserById = async (id: string) => {
  const supabase = createSupabaseServerClient();

  const userdata = await supabase
    .from("users")
    .select()
    .eq("user_id", id)
    .single();

  return userdata.data;
};

export const revalidateAction = (path?: string) => {
  revalidatePath(path ? path : "/");
};
