"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({
      where: {
        userId: userId,
      },
    });
    return {
      ok: true,
      message: "Dirección eliminada correctamente.",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "No se pudo eliminar la dirección.",
    };
  }
};
