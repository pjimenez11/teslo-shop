"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!address) {
      return null;
    }

    const { countryId, ...restAddress } = address;

    return {
      ...restAddress,
      country: countryId,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
