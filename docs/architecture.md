# Arquitectura del ecosistema de medios

IDC Huancayo conserva Next.js y Supabase como núcleo. La señal de producción sale una sola vez desde OBS o vMix hacia un relay SRS en un VPS. El relay distribuye la señal de manera independiente a Mux y a cada red social habilitada. Mux entrega el video HLS a `/en-vivo`; los webhooks actualizan el estado público en Supabase.

La radio funciona como un subsistema separado. AzuraCast se despliega en un VPS, mantiene AutoDJ e Icecast y permite la entrada de locutores. La aplicación consume únicamente su API pública de Now Playing y la URL pública del mount. El reproductor de audio vive en el layout raíz para continuar sonando durante la navegación.

```text
OBS/vMix ──una señal──> SRS/FFmpeg ──> Mux ──> Web /en-vivo
                           ├─────────> YouTube
                           ├─────────> Facebook
                           └─────────> destinos autorizados

Cabina/DJ ───────────> AzuraCast ───> Web /radio + player persistente

Mux/AzuraCast ───────> Next.js APIs ─> Supabase estado agenda logs
```

## Límites de despliegue

- Vercel aloja la aplicación Next.js, no SRS, FFmpeg, Icecast ni AzuraCast.
- `MUX_TOKEN_SECRET`, stream keys, credenciales sociales y `AZURACAST_API_KEY` son secretos de servidor.
- `live_destinations` guarda referencias a secretos, nunca el valor de una stream key.
- El puerto de administración de SRS se enlaza a `127.0.0.1`; publíquese únicamente detrás de VPN o proxy autenticado.

## Componentes implementados

- `/en-vivo`: estado automático, cuenta regresiva, MuxPlayer, replay y fallback social.
- `/radio`: Now Playing, oyentes, historial y parrilla semanal.
- Player global persistente sin autoplay.
- `/admin/transmisiones` y `/admin/radio` con autorización en servidor y audit log.
- `/api/webhooks/mux`, `/api/live/status` y `/api/radio/now-playing`.
- Migración Supabase con RLS para eventos, destinos, medios, radio y auditoría.
