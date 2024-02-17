import { TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh flex flex-col">
      <TopMenu />
      {children}
    </main>
  );
}
