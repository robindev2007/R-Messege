"use client";
import React, { useContext, useEffect, useRef } from "react";
import SingleMessege from "./SingleMessege";
import { MessegeT } from "@/types/types";
import { ChatContext } from "@/context/ChatContext";

function Messeges() {
  const { messeges, activeUserData, userData } = useContext(ChatContext);

  const messegeBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messegeBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messeges]);

  return (
    <div className="flex h-full flex-col justify-end gap-[2px] overflow-y-scroll border-y border-border p-1">
      {messeges.map((messege, i) => {
        const isMidInRow =
          messeges[i - 1]?.sender_id === messege.sender_id &&
          messeges[i + 1]?.sender_id === messege.sender_id;

        const isInRow =
          messeges[i - 1]?.sender_id === messege.sender_id ||
          messeges[i + 1]?.sender_id === messege.sender_id;

        const isFirstInRow =
          messeges[i - 1]?.sender_id !== messege.sender_id &&
          messeges[i + 1]?.sender_id === messege.sender_id;

        const isLastInRow =
          messeges[i + 1]?.sender_id !== messege.sender_id &&
          messeges[i - 1]?.sender_id === messege.sender_id;

        const isFromMe = messege.sender_id == userData?.user_id;

        return (
          <SingleMessege
            messege={messege}
            isFirstInRow={Boolean(isFirstInRow)}
            isFromMe={Boolean(isFromMe)}
            isMidInRow={Boolean(isMidInRow)}
            isInRow={Boolean(isInRow)}
            isLastInRow={Boolean(isLastInRow)}
            key={messege.message_id}
          />
        );
      })}
      <div ref={messegeBottomRef}></div>
    </div>
  );
}

export default Messeges;
