import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      {/* ── Fondos decorativos globales ── */}
      {/* Círculo superior derecho */}
      <div className="fixed top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#00498d]/[0.015] blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none z-0" />
      {/* Círculo inferior izquierdo */}
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00498d]/[0.01] blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none z-0" />
      {/* Círculo central sutil */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00498d]/[0.008] blur-3xl pointer-events-none z-0" />

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Contenido principal ── */}
      <main className="flex-1 relative z-10">{children}</main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Botón de WhatsApp ── */}
      <WhatsAppButton />
    </div>
  );
}