"use client";

import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openMenu = useUIStore((state) => state.openSideMenu);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [scroll, setScroll] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={clsx(
        "flex px-5 py-2 justify-between items-center w-full sticky bg-white z-10 top-0 transition-all duration-500",
        {
          "shadow-md": scroll,
        }
      )}
    >
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Niños
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/search">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href="/cart">
          <div className="relative">
            {loaded && (
              <span className="absolute px-1 text-xs rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItems}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          className="p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={() => openMenu()}
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
