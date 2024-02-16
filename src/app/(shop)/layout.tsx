
export default function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh bg-red-500">
      {children}
    </main>
  );
}