import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
("use server");

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
    console.error(error);
    return {
      ok: false,
      message: "No se puedo crear el usuario. Intente de nuevo.",
      user: null,
    };
  }
};
