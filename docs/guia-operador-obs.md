# Guía rápida para el operador de OBS

## Configuración inicial (una sola vez)

Una persona con acceso al proyecto debe agregar en **Vercel → Project Settings → Environment Variables**:

- `MUX_TOKEN_ID`
- `MUX_TOKEN_SECRET`
- `MUX_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

En Mux debe registrar el webhook `https://idc-huancayo.vercel.app/api/webhooks/mux` y copiar su secreto a `MUX_WEBHOOK_SECRET`. Las credenciales permanentes nunca se escriben en OBS ni se muestran en el navegador.

Para la radio se agregan `AZURACAST_BASE_URL`, `AZURACAST_STATION_SHORTCODE` y `AZURACAST_PUBLIC_STREAM_URL`.

## Cada transmisión

1. Entra a `/admin/medios` y completa “Nueva transmisión con OBS”.
2. Pulsa **Crear señal para OBS**.
3. En OBS abre **Ajustes → Emisión**.
4. Selecciona **Servicio: Personalizado**.
5. Copia el servidor y la clave que entrega el panel.
6. Controla cámaras, micrófonos y escenas desde OBS.
7. Pulsa **Iniciar transmisión** en OBS.

Mux notificará a la web cuando la señal empiece y termine. El operador no necesita cambiar manualmente el estado salvo en una contingencia.

## Recomendación de salida

- Resolución: 1920×1080 o 1280×720 si la conexión es limitada.
- Video: H.264, fotogramas clave cada 2 segundos.
- Audio: AAC, 48 kHz.
- Usa conexión por cable y activa grabación local en MKV.

La llave de transmisión se muestra una sola vez. Guárdala en el perfil de OBS y no la envíes por chat.
