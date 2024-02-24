import Avater from "@/component/Avater";
import Button from "@/component/UI/Button";
import { ChatContext } from "@/context/ChatContext";
import { DUMMY_IMG } from "@/lib/constance";
import { UserT } from "@/types/types";
import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa6";

function ChatHead({ userData }: { userData: UserT }) {
  const { activeConversition, changeActiveConverseationId } =
    useContext(ChatContext);
  return (
    <div className="flex w-full items-center justify-between bg-foreground px-1 py-2 md:px-3">
      <div className="flex items-center gap-1">
        <Button
          onClick={() => changeActiveConverseationId("")}
          variant="Rounded"
          className="flex md:hidden"
        >
          <FaArrowLeft className="h-5 w-5" />
        </Button>
        <Avater src={userData?.avater} alt="" className={"h-12 w-12"} />
        <div>
          <p>{userData?.user_name}</p>
          <span>{userData?.created_at}</span>
        </div>
      </div>
      <div>Hello</div>
    </div>
  );
}

export default ChatHead;
