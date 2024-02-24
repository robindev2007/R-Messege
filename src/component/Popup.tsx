"use client";
import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

type PopupBgProps = { children: ReactNode; handleClick?: () => void };

const PopupBg: FC<PopupBgProps> = ({ children, handleClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClick}
      className="fixed left-0 top-0 z-30 flex h-screen w-screen bg-black bg-opacity-50"
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </motion.div>
  );
};

export default PopupBg;
