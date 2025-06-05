import Header from "@/components/layout/header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="bg-[#FFFDF6]">
      <main className="grid grid-rows-[10%_90%] h-screen">
        <Header />
        {children}
      </main>
    </body>
  );
}
