"use client";
import { getConversitions, getUserById } from "@/app/(main-app)/action";
import { NEW_MSG_SOUND } from "@/lib/constance";
import { createSupabaseBrowserClient } from "@/supabase/client";
import { ConversitionsT, MessegeT, UserT } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "sonner";

type ChatContextType = {
  conversitions?: ConversitionsT[];
  activeConversition: string;
  messeges: MessegeT[] | [];
  activeUserData: UserT | undefined;
  changeActiveId: (value: string) => void;
  changeActiveConverseationId: (value: string) => void;
  friendList?: any[];
  userData?: UserT | null;
};

export const ChatContext = createContext<ChatContextType>({
  changeActiveId: () => "",
  changeActiveConverseationId: () => "",
  messeges: [],
  activeUserData: undefined,
  activeConversition: "",
});

function ChatContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserT | null>(null);
  const [activeConversition, setActiveConversition] = useState<string>("");
  const [activeFriendId, setActiveFriendId] = useState<string>("");
  const [messeges, setMesseges] = useState<MessegeT[] | []>([]);
  const [activeUserData, setActiveUserData] = useState<UserT | undefined>();
  const [friendList, sertFriendList] = useState<any>();
  const [conversitions, setConversitions] = useState<ConversitionsT[]>();

  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const changeActiveId = (id: string) => {
    setActiveFriendId(id);
  };
  const changeActiveConverseationId = (id: string) => {
    setActiveConversition(id);
    console.log(`new conv-id:${id}`);
  };

  useEffect(() => {
    console.log("listning to messeges:" + activeConversition);
    const converSitionRoom = supabase.channel(activeConversition);

    converSitionRoom
      .on("broadcast", { event: "messege:new" }, async (payload) => {
        const newMessege = payload.payload.messege as MessegeT;
        setMesseges((prev) => [...prev, newMessege]);

        if (newMessege.sender_id !== userData?.user_id) {
          const notification = new Audio(NEW_MSG_SOUND);
          notification.play();
        }

        const lastMsgUpdate = await supabase
          .from("conversations")
          .update({
            last_messege: newMessege.text_content,
          })
          .eq("conversations_id", activeConversition)
          .select()
          .single();
        console.log(lastMsgUpdate.data);
      })
      .subscribe();

    return () => {
      converSitionRoom.unsubscribe();
    };
  }, [supabase, activeConversition]);

  useEffect(() => {
    const getData = async () => {
      const userAuth = await supabase.auth.getUser();

      const userDataRes = await supabase
        .from("users")
        .select()
        .eq("user_id", userAuth.data.user?.id as string)
        .single();

      if (!userDataRes.data) {
        router.refresh();
        toast.warning("Refresing website");
      }

      setUserData(userDataRes.data);

      const conversitionsRes = await getConversitions(
        userAuth.data.user?.id as string,
      );
      console.log(conversitionsRes);
      setConversitions(conversitionsRes);
    };

    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const { data: messegesRes } = await supabase
        .from("messages")
        .select("*")
        .eq("conversations_id", activeConversition);

      setMesseges(messegesRes ? messegesRes : []);

      const userdata = await getUserById(activeFriendId);

      setActiveUserData(userdata as UserT);
    }

    getData();
  }, [activeConversition, activeFriendId]);

  return (
    <ChatContext.Provider
      value={{
        messeges,
        conversitions,
        friendList,
        userData,
        changeActiveId,
        activeConversition,
        activeUserData,
        changeActiveConverseationId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
