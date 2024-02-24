"use client";
import Avater from "@/component/Avater";
import { cn, formateActiveTime } from "@/lib/utlis";
import { ConversitionsT, FriendT, UserT } from "@/types/types";
import Link from "next/link";
import { FC, useContext, useEffect, useState } from "react";
import { getUserById } from "../../action";
import { ChatContext } from "@/context/ChatContext";

type SingleFriendProps = {
  friendId: string;
  conversition: ConversitionsT;
};

const SingleFriend: FC<SingleFriendProps> = ({ friendId, conversition }) => {
  const [friend, setFriend] = useState<UserT>();

  const { changeActiveId, activeConversition, changeActiveConverseationId } =
    useContext(ChatContext);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserById(friendId);
      setFriend(data as UserT);
    };

    getData();
  }, []);

  return (
    <button
      onClick={() => {
        changeActiveId(friend?.user_id as string);
        changeActiveConverseationId(conversition.conversations_id);
      }}
      className={cn(
        "duration-250 flex w-full items-center gap-2 rounded-lg px-2 py-2 transition-all ease-out hover:bg-secondary",
        activeConversition === conversition.conversations_id &&
          "bg-primary bg-opacity-75 text-white",
      )}
    >
      <Avater src={friend?.avater as string} alt="" />
      <div className="flex h-full w-full flex-col justify-between gap-1">
        <div className="flex h-full items-center justify-between">
          <p>{friend?.user_name}</p>

          <p
            className={cn(
              "text-xs text-text-secondary",
              activeConversition === conversition.conversations_id &&
                "text-white text-opacity-70",
            )}
          >
            {friend?.last_active && formateActiveTime(friend?.last_active)}
          </p>
        </div>
        <p
          className={cn(
            "text-left text-xs text-text-secondary",
            activeConversition === conversition.conversations_id &&
              "text-white text-opacity-70",
          )}
        >
          {conversition.last_messege}
        </p>
      </div>
    </button>
  );
};

export default SingleFriend;
