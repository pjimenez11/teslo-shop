"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { string } from "zod";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      message: "Usuario creado correctamente.",
      user: user,
    };
  } catch (error) {
    console.error("Error de registro", error);

    const errorAny = error as any;

    if (errorAny?.code === "P2002" && errorAny?.meta?.target?.includes("email")) {
      return {
        ok: false,
        message: "El correo ya está en uso. Intente con otro.",
        user: null,
      };
    }
    return {
      ok: false,
      message: "No se puedo crear el usuario. Intente de nuevo.",
      user: null,
    };
  }
};
