import PublicLayout from "@/components/layouts/PublicLayout";

const testimonios = [
  {
    id: 1,
    name: "María García",
    role: "Miembro desde 2018",
    text: "Llegué a IDC Huancayo completamente rota, sin propósito ni dirección. Había pasado por un divorcio doloroso y sentía que mi vida no tenía sentido. Desde el primer día que pisé esta iglesia, sentí una paz que no puedo explicar. Hoy, 7 años después, soy líder de discipulado y ayudo a otras mujeres a encontrar su propósito en Cristo. Dios no solo restauró mi vida, sino que me dio una nueva familia.",
    initials: "MG",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "Líder de jóvenes",
    text: "Crecí en un hogar disfuncional. Mi papá nos abandonó cuando yo tenía 8 años y mi mamá trabajaba todo el día para sacarnos adelante. A los 15 años ya estaba metido en malas amistades. Un amigo me invitó a una vigilia en IDC Huancayo y ahí entendí que Dios tenía un plan para mi vida. Hoy soy líder de jóvenes y trabajo con adolescentes que están pasando por lo mismo que yo pasé. Si Dios me transformó a mí, puede transformar a cualquiera.",
    initials: "CM",
  },
  {
    id: 3,
    name: "Lucía Quispe",
    role: "Miembro desde 2020",
    text: "Durante la pandemia, mi ansiedad llegó a niveles que nunca había experimentado. No podía dormir, tenía ataques de pánico constantes. Una noche, buscando respuestas en internet, encontré un devocional de IDC Huancayo. Empecé a leerlos todos los días. Luego me inscribí en el campus virtual y comencé el discipulado nivel 1. Cada lección era justo lo que necesitaba. Hoy estoy completamente libre de la ansiedad y ayudo a otros a encontrar paz en la Palabra.",
    initials: "LQ",
  },
  {
    id: 4,
    name: "Pedro Huamán",
    role: "Diácono",
    text: "Fui alcohólico por más de 20 años. Perdí mi trabajo, mi familia estaba a punto de dejarme, y yo ya no encontraba salida. Mi esposa me trajo a rastras a IDC Huancayo. Al principio me resistía, pero poco a poco la Palabra fue haciendo su obra. Hoy estoy completamente restaurado, soy diácono de la iglesia y mi matrimonio es más fuerte que nunca. Dios me dio una segunda oportunidad y no la voy a desperdiciar.",
    initials: "PH",
  },
  {
    id: 5,
    name: "Ana López",
    role: "Nueva creyente",
    text: "Nunca había pisado una iglesia en mis 35 años de vida. Crecí en un hogar ateo y siempre pensé que la fe era para personas débiles. Un día, una compañera de trabajo me invitó a un evento de IDC Huancayo. Fui por compromiso, pero lo que viví ese día cambió mi vida para siempre. Sentí una presencia tan real de Dios que no pude negarlo. Hace dos meses me bauticé y estoy feliz de pertenecer a esta familia.",
    initials: "AL",
  },
  {
    id: 6,
    name: "David Rojas",
    role: "Músico del ministerio",
    text: "Siempre creí en Dios, pero lo veía distante. Venir a IDC Huancayo me enseñó que Dios quiere tener una relación personal conmigo. Hoy sirvo en el ministerio de alabanza y cada acorde que toco es una expresión de gratitud por todo lo que Él ha hecho en mi vida.",
    initials: "DR",
  },
];

export const metadata = {
  title: "Testimonios",
  description:
    "Historias reales de vidas transformadas por el poder de Dios en la Iglesia Discípulos de Cristo Huancayo.",
};

export default function TestimoniosPage() {
  return (
    <PublicLayout>
      {/* ── Hero de la página ── */}
      <section className="relative bg-gradient-to-br from-[#002b5e] via-[#00498d] to-[#003d7a] py-16 lg:py-20 overflow-hidden">
        {/* Círculos decorativos con blur */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        {/* Textura sutil */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-soft-light pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-3 block">
            Impacto real
          </span>
          <h1 className="text-[2rem] sm:text-[2.5rem] font-bold text-white tracking-tight">
            Testimonios
          </h1>
          <p className="text-white/55 text-[16px] mt-3 max-w-lg leading-relaxed font-normal">
            Historias reales de personas cuyas vidas fueron transformadas por el
            poder de Dios.
          </p>
        </div>
      </section>

      {/* ── Grid de testimonios ── */}
      <section className="relative py-16 lg:py-20 bg-[#fafbfc] overflow-hidden">
        {/* Fondo decorativo sutil */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00498d]/[0.01] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonios.map((testimonio) => (
              <blockquote
                key={testimonio.id}
                className="group bg-white border border-gray-100/80 rounded-2xl p-8 hover:border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 transition-all duration-500"
              >
                {/* Avatar con sombra suave */}
                <div className="relative mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#00498d]/[0.06] backdrop-blur-sm border border-[#00498d]/[0.08] flex items-center justify-center shadow-sm shadow-[#00498d]/[0.04] group-hover:shadow-md group-hover:shadow-[#00498d]/[0.06] group-hover:scale-105 transition-all duration-500">
                    <span className="text-[13px] font-semibold text-[#00498d]/70">
                      {testimonio.initials}
                    </span>
                  </div>
                  {/* Comilla decorativa de fondo */}
                  <svg
                    className="absolute -top-3 -right-2 w-10 h-10 text-[#00498d]/[0.04] rotate-180"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.224 11 15c0 1.933-1.567 3.5-3.5 3.5-1.239 0-2.259-.611-2.917-1.179zM16.583 17.321c-1.03-.894-1.583-2.121-1.583-4.11 0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C21.591 11.69 23 13.224 23 15c0 1.933-1.567 3.5-3.5 3.5-1.239 0-2.259-.611-2.917-1.179z" />
                  </svg>
                </div>

                {/* Texto del testimonio */}
                <p className="text-[14px] text-gray-500/70 leading-relaxed mb-6 line-clamp-6 font-normal relative z-10">
                  &ldquo;{testimonio.text}&rdquo;
                </p>

                {/* Separador y autor */}
                <div className="border-t border-gray-100/80 pt-4 flex items-center gap-3">
                  {/* Mini avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00498d]/[0.08] to-[#00498d]/[0.04] flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-semibold text-[#00498d]/60">
                      {testimonio.initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-gray-800 leading-tight">
                      {testimonio.name}
                    </p>
                    <p className="text-[11px] text-gray-400/90 mt-0.5 font-medium">
                      {testimonio.role}
                    </p>
                  </div>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}