import { isAuthenticated } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="p-5 mx-auto max-w-[800px]">
      <nav>
        <Link href="/" className="flex  item-center gap-1">
          <Image src="/logo.svg" height={31} width={37} alt="logo"></Image>
          <h2>PrepCorn</h2>
        </Link>
        {children}
      </nav>
    </div>
  );
};

export default RootLayout;
