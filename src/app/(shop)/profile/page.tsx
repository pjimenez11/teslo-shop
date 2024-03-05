import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    // redirect("/auth/login?returnTo=/perfil");
    redirect("/");
  }

  return (
    <div>
      <Title title="Perfil" />
      <h1>Perfil</h1>
      <p>Id: {session?.user?.id}</p>
      <p>Nombre: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <p>Image: {session?.user?.image}</p>
      <p>Expiracion: {session.expires} </p>
    </div>
  );
}
