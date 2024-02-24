"use client";
import React, { useContext, useEffect } from "react";
import ChatHead from "./ChatHead";
import Messeges from "./Messeges";
import NewMessegeInput from "./NewMessegeInput";
import { ChatContext } from "@/context/ChatContext";
import { UserT } from "@/types/types";
import { createSupabaseBrowserClient } from "@/supabase/client";

function Chats() {
  const { activeConversition, activeUserData } = useContext(ChatContext);

  return (
    <div className="flex w-full flex-col border-l border-border">
      {activeConversition ? (
        <>
          <ChatHead userData={activeUserData as UserT} />
          <Messeges />
          <NewMessegeInput />
        </>
      ) : (
        <p className="my-auto text-center text-lg font-semibold">
          Select user to start chat
        </p>
      )}
    </div>
  );
}

export default Chats;
