import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import PageMotion from "@/components/ui/PageMotion";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white pb-[calc(76px+env(safe-area-inset-bottom))]">
      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
      <WhatsAppButton />
      <PageMotion />
    </div>
  );
}
