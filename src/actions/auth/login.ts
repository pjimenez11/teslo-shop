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
    console.error(error);
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return "CredentialsSignin";
    }
    return "UnknownError";
  }
}
