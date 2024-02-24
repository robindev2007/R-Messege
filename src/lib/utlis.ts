"use client";
import clsx from "clsx";
import { ClassValue } from "clsx";
import { formatDistance, formatDistanceStrict, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs ?? inputs));
}

export const getIdFromUrl = (url: string) => {
  const id = url.split("#")[1];
  console.log(url);
  return id;
};

export const formateActiveTime = (date: any) => {
  // Assuming 'fiveMinutesAgo' is your date object representing 5 minutes ago

  // Get the relative time
  // const relativeTime = formatDistance(date, new Date(), {
  //   addSuffix: true,
  // });
  const d = new Date(date);
  const distance = formatDistanceStrict(d, new Date(), {
    addSuffix: true,
  });

  return distance
    .toString()
    .replaceAll("hours", "h")
    .replaceAll("minute", "m")
    .replaceAll("day", "d")
    .replaceAll("month", "m")
    .replaceAll("year", "y")
    .replaceAll("ago", "");
};
