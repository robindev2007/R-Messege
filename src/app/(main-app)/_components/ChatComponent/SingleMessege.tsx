import { cn } from "@/lib/utlis";
import { MessegeT, UserT } from "@/types/types";
import { FC } from "react";

type SingleMessegeProps = {
  messege: MessegeT;
  isMidInRow: boolean;
  isFirstInRow: boolean;
  isFromMe: boolean;
  isInRow: boolean;
  isLastInRow: boolean;
};

const SingleMessege: FC<SingleMessegeProps> = ({
  messege,
  isFirstInRow,
  isMidInRow,
  isFromMe,
  isInRow,
  isLastInRow,
}) => {
  return (
    <div className={cn("h-fit w-fit max-w-[80%]", isFromMe && "ml-auto")}>
      <div
        className={cn(
          "px-3 py-1 text-sm",
          isFromMe
            ? "rounded-[4px] rounded-l-[20px] bg-primary"
            : "rounded-[4px] rounded-r-[20px] border border-border bg-secondary",
          isFirstInRow &&
            (isFromMe ? "rounded-tr-[15px]" : "rounded-tl-[15px]"),
          isLastInRow && (isFromMe ? "rounded-br-[15px]" : "rounded-bl-[15px]"),
          !isInRow && "rounded-[20px]",
        )}
      >
        {messege?.text_content}
      </div>
    </div>
  );
};

export default SingleMessege;
