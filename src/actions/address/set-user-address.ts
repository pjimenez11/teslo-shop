"use server";

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const saveAddress = await createOrReplaceAddress(address, userId);
    return {
      ok: true,
      message: "Dirección guardada correctamente.",
      address: saveAddress,
    };
  } catch (error) {
    console.error("Error in setUserAddress:", error);
    return {
      ok: false,
      message: "No se pudo guardar la dirección.",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      address: address.address,
      address2: address.address2,
      city: address.city,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
    };

    if (!storedAddress) {
      const newAddres = await prisma.userAddress.create({
        data: {
          userId: userId,
          ...addressToSave,
        },
      });
      return newAddres;
    }

    const updateAddres = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    });
    return updateAddres;
  } catch (error) {
    console.error("Error in createOrReplaceAddress:", error);
    throw new Error("No se pudo guardar la dirección.");
  }
};
