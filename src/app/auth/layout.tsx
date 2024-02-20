
export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-4/6 md:w-3/6 lg:w-2/6 max-w-[600px] px-10">{children}</div>
    </main>
  );
}