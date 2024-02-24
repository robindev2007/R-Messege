"use client";
import Button from "@/component/UI/Button";
import Input from "@/component/UI/Input";
import React, { useContext, useState } from "react";
import { IoMenu, IoPersonAdd } from "react-icons/io5";
import SingleFriend from "./SingleFriend";
import LeftMenuItem from "./LeftMenuItem";
import { AnimatePresence } from "framer-motion";
import { TbLogout } from "react-icons/tb";
import AddFriendComponent from "./components/AddFriend";
import { ChatContext } from "@/context/ChatContext";
import { cn } from "@/lib/utlis";
import { motion } from "framer-motion";

function Sidebar() {
  const [menuActive, setMenuActive] = useState(false);
  const [addFreindActive, setAddFriendActive] = useState(false);

  const { conversitions, userData, activeConversition } =
    useContext(ChatContext);

  const menuItems = [
    {
      icon: <TbLogout className="h-5 w-5" />,
      name: "Log out",
    },
    {
      icon: <IoPersonAdd className="h-5 w-5" />,
      name: "Add friend",
      function: () => setAddFriendActive(true),
    },
  ];

  const toggleAddFrendMenu = () => {
    setAddFriendActive((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "lg:-[424px] flex h-full w-screen shrink-0 flex-col bg-foreground py-3 md:w-[324px]",
        activeConversition && "hidden md:flex",
      )}
    >
      <div className="relative flex items-center gap-2 px-2">
        <Button
          variant="Rounded"
          onClick={() => setMenuActive((prev) => !prev)}
        >
          <IoMenu className="h-6 w-6" />
        </Button>
        <AnimatePresence>
          {menuActive && <LeftMenuItem menuItems={menuItems} />}
        </AnimatePresence>
        <Input className="rounded-full" type="text" placeHolder="Search" />
      </div>
      <div className="h-full overflow-y-scroll">
        <div className="flex h-full flex-col gap-1 overflow-hidden px-2 py-2">
          {conversitions &&
            conversitions.map((conv, i) => {
              const friendId =
                (conv.id1 == userData?.user_id && conv.id2) || conv.id1;

              return (
                <SingleFriend
                  key={conv.conversations_id}
                  friendId={friendId}
                  conversition={conv}
                />
              );
            })}
        </div>
        <AnimatePresence>
          {addFreindActive && (
            <AddFriendComponent closeTab={toggleAddFrendMenu} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Sidebar;
