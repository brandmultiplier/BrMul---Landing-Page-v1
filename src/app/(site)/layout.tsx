import Navbar from "@/components/navigation/Navbar";
import GlobalMouseHalo from "@/components/ui/GlobalMouseHalo";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GlobalMouseHalo />
      <Navbar />
      <main className="relative z-10">{children}</main>
    </>
  );
}
