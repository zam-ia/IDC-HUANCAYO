# Despliegue de medios

## Aplicación web

1. Copia `.env.example` a `.env.local` y completa solo valores del entorno.
2. Aplica `supabase/migrations/202609080001_media_platform.sql` en staging.
3. Configura en Mux el webhook `https://TU_DOMINIO/api/webhooks/mux` y usa el mismo `MUX_WEBHOOK_SECRET` en Vercel.
4. Configura `AZURACAST_BASE_URL`, `AZURACAST_STATION_SHORTCODE` y `AZURACAST_PUBLIC_STREAM_URL`.
5. Ejecuta `npm run lint` y `npm run build` antes de promover a producción.

## Relay SRS

1. Provisiona un VPS con IP estable, Docker, TLS y firewall.
2. Copia `infra/relay`, ejecuta `docker compose up -d` y verifica el health check.
3. Expón 1935/RTMP solo a las IP necesarias. Mantén 1985 privado.
4. Implementa workers FFmpeg por destino desde un controlador autenticado. Un worker fallido no debe detener los demás.
5. Guarda URLs y stream keys en un secret manager del VPS, nunca en Git ni en variables `NEXT_PUBLIC_*`.

## AzuraCast

Instala AzuraCast siguiendo su instalador oficial en un VPS con volumen persistente. Crea cuentas DJ individuales, playlists por franja y una rotación AutoDJ. Publica únicamente el mount de escucha y la API pública de Now Playing. Mantén la API administrativa y los backups fuera del cliente web.
