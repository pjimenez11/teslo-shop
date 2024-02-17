import { Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh">
      <TopMenu />
      <Sidebar />
      <div className="px-0 sm:px-4 md:px-7 lg:px-10">{children}</div>
    </main>
  );
}
