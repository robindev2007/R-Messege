"use client";
import Button from "@/component/UI/Button";
import Input from "@/component/UI/Input";
import { ChatContext } from "@/context/ChatContext";
import { createSupabaseBrowserClient } from "@/supabase/client";
import React, { FormEvent, useContext, useState } from "react";
import { FaPaperPlane } from "react-icons/fa6";

function NewMessegeInput() {
  const [messege, setMessege] = useState("");

  const { activeConversition, activeUserData } = useContext(ChatContext);

  const supabase = createSupabaseBrowserClient();

  const handleMssegeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messege.length < 1) return;

    const { data } = await supabase
      .from("messages")
      .insert({
        conversations_id: activeConversition,
        receiver_id: "",
        text_content: messege,
      })
      .select()
      .single();
    console.log(activeConversition);

    setMessege("");

    const brodCast = await supabase.channel(activeConversition).send({
      type: "broadcast",
      event: "messege:new",
      payload: { messege: data },
    });

    console.log(brodCast);
  };
  return (
    <div className="bg-foreground px-3 py-2">
      <form onSubmit={handleMssegeSubmit} className="flex items-center gap-1">
        <Input
          value={messege}
          placeHolder="Aa"
          name="messege"
          autoComplete={"off"}
          autoFocus
          onValueChange={(value) => setMessege(value)}
          className="rounded-full"
        />
        <Button type="submit" variant="Rounded">
          <FaPaperPlane className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}

export default NewMessegeInput;
