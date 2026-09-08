# IDC Huancayo

Aplicación web, campus virtual y núcleo del ecosistema de medios de la Iglesia Discípulos de Cristo Huancayo. La solución conserva Next.js 16, React 19 y Supabase, y añade transmisión Mux, radio AzuraCast, estado en tiempo real y administración protegida.

## Funciones principales

- Sitio público, noticias, devocionales, testimonios y cursos administrables.
- Campus con lecciones, progreso y certificados.
- `/en-vivo` con estados programado, en vivo, interrumpido y finalizado.
- `/radio` con Now Playing, historial, oyentes, parrilla y player persistente.
- Paneles `/admin/transmisiones` y `/admin/radio` con autorización de servidor y auditoría.
- Webhook Mux firmado, proxy cacheado de AzuraCast y endpoint público de estado.
- Esquema Supabase versionado con políticas RLS.
- Base Docker para un relay SRS separado de Vercel.

## Inicio local

Requiere Node.js compatible con Next.js 16 y un proyecto Supabase.

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`. Sin variables de Supabase, las páginas públicas se mantienen disponibles con estados vacíos seguros; las operaciones administrativas de datos quedan deshabilitadas.

## Configuración

1. Completa `.env.local` sin prefijar secretos con `NEXT_PUBLIC_`.
2. Aplica `supabase/migrations/202609080001_media_platform.sql` en staging.
3. Configura el webhook de Mux hacia `/api/webhooks/mux`.
4. Configura el station shortcode y el mount público de AzuraCast.
5. Crea usuarios y roles en Supabase. `admin` y `superadmin` administran medios; `radio_dj` tiene privilegios mínimos sobre radio mediante RLS.

Consulta [la arquitectura](docs/architecture.md), [el despliegue](docs/deployment.md) y [el runbook operativo](docs/runbook-live-radio.md).

## Verificación

```bash
npm run lint
npm run build
```

No se incluyen stream keys ni credenciales reales en el repositorio. SRS y AzuraCast requieren uno o dos VPS con procesos persistentes; no deben ejecutarse en Vercel.
