
export default function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh bg-gray-500">
      {children}
    </main>
  );
}