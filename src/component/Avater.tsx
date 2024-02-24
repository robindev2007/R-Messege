"use client";
import { cn } from "@/lib/utlis";
import { ClassValue } from "clsx";
import Image from "next/image";
import { FC, Suspense } from "react";

type AvaterProps = {
  src: string;
  alt: string;
  className?: ClassValue;
};

const Avater: FC<AvaterProps> = ({ src, alt, className }) => {
  return (
    <Suspense fallback={<ImgLoadingIndicatior />}>
      <div
        className={cn(
          "h-14 w-14 shrink-0 overflow-hidden rounded-full bg-secondary",
          className,
        )}
      >
        <Image src={src} alt={alt} height={600} width={600} />
      </div>
    </Suspense>
  );
};

export default Avater;

export const ImgLoadingIndicatior = () => {
  return (
    <div className="h-14 w-14 animate-pulse rounded-full bg-secondary"></div>
  );
};
