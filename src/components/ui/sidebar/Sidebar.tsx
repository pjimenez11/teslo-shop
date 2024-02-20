"use client";

import { useUIStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <div>
      {isSideMenuOpen && (
        <>
          <div className="fixed top-0 left-0 w-dvw h-screen z-10 bg-black opacity-30"></div>

          <div
            className="fade-in fixed top-0 left-0 w-dvw h-screen z-10 backdrop-filter backdrop-blur-sm"
            onClick={() => closeMenu()}
          ></div>
        </>
      )}

      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-full sm:w-[400px] md:w-[450px] lg:[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
            placeholder="Buscar"
          />
        </div>

        <Link
          href="/"
          className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={() => closeMenu()}
        >
          <IoPersonOutline size={30} />
          <span className="ml-3">Perfil</span>
        </Link>

        <Link
          href="/orders"
          className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={() => closeMenu()}
        >
          <IoTicketOutline size={30} />
          <span className="ml-3">Ordenes</span>
        </Link>

        <Link
          href="/auth/login"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={() => closeMenu()}
        >
          <IoLogInOutline size={30} />
          <span className="ml-3">Ingresar</span>
        </Link>

        <Link
          href="/logout"
          className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={() => closeMenu()}
        >
          <IoLogOutOutline size={30} />
          <span className="ml-3">Salir</span>
        </Link>

        <div className="w-full h-px bg-gray-200 my-8"></div>

        <Link
          href="/products"
          className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={() => closeMenu()}
        >
          <IoShirtOutline size={30} />
          <span className="ml-3">Productos</span>
        </Link>

        <Link
          href="/orders"
          className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={() => closeMenu()}
        >
          <IoTicketOutline size={30} />
          <span className="ml-3">Ordenes</span>
        </Link>

        <Link
          href="/users"
          className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={() => closeMenu()}
        >
          <IoPeopleOutline size={30} />
          <span className="ml-3">Usuarios</span>
        </Link>
      </nav>
    </div>
  );
};
