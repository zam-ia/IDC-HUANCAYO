import { ImageResponse } from "next/og";

export const alt = "Iglesia Discípulos de Cristo Huancayo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "linear-gradient(135deg, #071b2c, #00498d)", color: "white", padding: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 26, fontWeight: 700, letterSpacing: 2, color: "#7dd3fc" }}>IDC HUANCAYO</div>
      <div style={{ display: "flex", marginTop: 34, maxWidth: 900, fontSize: 72, lineHeight: 1.08, fontWeight: 700 }}>Fe, comunidad y formación para la vida</div>
      <div style={{ display: "flex", marginTop: 32, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>Transmisiones en vivo · IDC Radio · Campus virtual</div>
    </div>,
    size
  );
}
