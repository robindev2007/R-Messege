"use client";
import PopupBg from "@/component/Popup";
import Input from "@/component/UI/Input";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createSupabaseBrowserClient } from "@/supabase/client";
import { useDebounce } from "use-debounce";
import { UserT } from "@/types/types";
import Avater from "@/component/Avater";
import Button from "@/component/UI/Button";
import { IoPersonAdd } from "react-icons/io5";
import { ChatContext } from "@/context/ChatContext";
import {
  chackIsFriend,
  createNewFriend,
  revalidateAction,
} from "@/app/(main-app)/action";
import { toast } from "sonner";
import Image from "next/image";
import { LoadingSVG } from "@/lib/constance";

function AddFriendComponent({ closeTab }: { closeTab: () => void }) {
  const [users, setUsers] = useState<UserT[]>();
  const [inputName, setInputName] = useState("");
  const [serarch] = useDebounce(inputName, 500);

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const getdata = async () => {
      const { data } = await supabase
        .from("users")
        .select()
        .ilike("user_name", `%${inputName}%`)
        .limit(20);
      setUsers(data ? data : []);
      console.log(data);
    };
    getdata();
  }, [serarch]);

  return (
    <PopupBg handleClick={closeTab}>
      <motion.div
        initial={{ left: -50, opacity: 0 }}
        animate={{ left: 0, opacity: 1 }}
        exit={{ left: -50, opacity: 0 }}
        className="fixed left-0 top-0 flex h-full min-w-96 flex-col border-r border-border bg-foreground p-2"
      >
        <Input
          type="text"
          placeHolder="Search"
          autoFocus
          className="h-fit rounded-full"
          onValueChange={(value) => setInputName(value)}
        />
        <div className="flex flex-col gap-1 pt-2">
          {users &&
            users.map((user) => <SingleUser key={user.user_id} user={user} />)}
        </div>
      </motion.div>
      <p>Type to get user sujjection</p>
    </PopupBg>
  );
}

export default AddFriendComponent;

export function SingleUser({ user }: { user: UserT }) {
  const { userData } = useContext(ChatContext);
  const [loading, setLoading] = useState(false);

  const handleAddFriend = async () => {
    if (loading) return;
    setLoading(true);
    if (!userData) {
      return revalidateAction("/");
    }
    const isFriend = await chackIsFriend(
      userData?.user_id as string,
      user.user_id,
    );

    if (isFriend) {
      setLoading(false)
      return toast("User already friend");
    }

    const addNewConv = await createNewFriend(user.user_id);
    console.log(addNewConv);
    toast.success("Added new friend");
    setLoading(false);
  };
  return (
    <div className="flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-150 ease-out hover:bg-secondary">
      <Avater src={user.avater} alt={user.user_name} className={"h-10 w-10"} />
      <div>
        <p>{user.user_name}</p>
      </div>
      <Button onClick={handleAddFriend} variant="Rounded" className="ml-auto">
        {loading ? (
          <Image
            src={LoadingSVG}
            height={20}
            width={20}
            className="h-5 w-5"
            alt="loading svg"
          />
        ) : (
          <IoPersonAdd className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
