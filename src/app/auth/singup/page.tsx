import React from "react";
import Link from "next/link";
import SingUpForm from "./SingUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Singup",
  description: "Create new account | Chatter",
};

async function SingUpMainPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col gap-3 rounded-md border border-border bg-foreground px-3 py-2 md:min-w-80">
        <div className="flex flex-col items-center justify-center">
          <p>Welcome to MeChat</p>
        </div>
        <SingUpForm />
        <div className="text-left text-sm text-text-secondary">
          <p>
            Already a user?{" "}
            <Link href={"/auth/sinup"} className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingUpMainPage;
