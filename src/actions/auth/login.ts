"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData.entries()),
      redirect: false,
    });
    return "Success";
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return "CredentialsSignin";
    }
    return "UnknownError";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { ok: true, message: "Usuario logueado correctamente." };
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return { ok: false, message: "Credenciales incorrectas." };
    }
    return {
      ok: false,
      message: "No se puedo loguear el usuario. Intente de nuevo.",
    };
  }
};
