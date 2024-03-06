import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }
  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-4/6 md:w-3/6 lg:w-2/6 max-w-[600px] px-10">
        {children}
      </div>
    </main>
  );
}
