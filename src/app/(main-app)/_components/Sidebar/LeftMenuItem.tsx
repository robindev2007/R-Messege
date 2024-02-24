"use client";
import React from "react";
import { motion } from "framer-motion";

function LeftMenuItem({ menuItems }: any) {
  return (
    <motion.ul
      initial={{ opacity: 0, left: -100 }}
      animate={{ opacity: 1, left: 0 }}
      exit={{ opacity: 0, left: -60 }}
      className="absolute top-full z-20 min-w-72 overflow-hidden rounded-md border border-border bg-black bg-opacity-[.75] px-1 py-2 shadow-2xl shadow-neutral-800 backdrop-blur-xl"
    >
      {menuItems.map((item: any, i: any) => (
        <button
          key={i}
          onClick={item.function}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1 hover:bg-foreground"
        >
          <div className="w-5">{item.icon}</div>
          <p>{item.name}</p>
        </button>
      ))}
    </motion.ul>
  );
}

export default LeftMenuItem;
