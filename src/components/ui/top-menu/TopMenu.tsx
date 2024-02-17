import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React from "react";

export const TopMenu = () => {
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
        </Link>
      </div>
    </nav>
  );
};
