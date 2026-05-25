"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

type ProfileAvatarUploaderProps = {
  initialAvatarUrl: string | null;
  displayName: string;
};

export default function ProfileAvatarUploader({
  initialAvatarUrl,
  displayName,
}: ProfileAvatarUploaderProps) {
  const { data: session, update } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    };
  }, [sourceUrl]);

  const initials = displayName.charAt(0).toUpperCase();

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Selecciona una imagen valida.");
      return;
    }

    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    setSourceUrl(URL.createObjectURL(file));
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
    setError(null);
    setCropOpen(true);
  };

  const createCroppedBlob = async () => {
    if (!sourceUrl) return null;

    const image = new Image();
    image.src = sourceUrl;
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("No se pudo leer la imagen"));
    });

    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) return null;

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, size, size);

    const baseScale = Math.max(size / image.width, size / image.height);
    const scale = baseScale * zoom;
    const width = image.width * scale;
    const height = image.height * scale;
    const x = size / 2 - width / 2 + offsetX;
    const y = size / 2 - height / 2 + offsetY;
    context.drawImage(image, x, y, width, height);

    return await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9);
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const blob = await createCroppedBlob();
      if (!blob) throw new Error("No se pudo recortar la imagen");

      const formData = new FormData();
      formData.append("avatar", blob, "avatar.jpg");

      const response = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "No se pudo subir la foto");
      }

      setAvatarUrl(payload.avatarUrl);
      await update({
        user: {
          ...session?.user,
          image: payload.avatarUrl,
        },
      });
      setCropOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => avatarUrl && setViewOpen(true)}
            className="group relative h-28 w-28 overflow-hidden rounded-2xl bg-[#00498d]/[0.08] text-[#00498d]"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-3xl font-bold">
                {initials}
              </span>
            )}
          </button>

          <div className="min-w-0 flex-1">
            <h2 className="text-[17px] font-semibold text-gray-900">
              Foto de perfil
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Sube una foto cuadrada para que tu perfil sea reconocible dentro
              del campus.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-lg bg-[#00498d] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#003d7a]"
              >
                Cambiar foto
              </button>
              {avatarUrl && (
                <button
                  type="button"
                  onClick={() => setViewOpen(true)}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Ver foto
                </button>
              )}
            </div>
            {error && <p className="mt-3 text-[12px] text-red-600">{error}</p>}
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>

      {cropOpen && sourceUrl && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-950/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-gray-900">
                Recortar foto
              </h3>
              <button
                type="button"
                onClick={() => setCropOpen(false)}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-[12px] font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cerrar
              </button>
            </div>

            <div className="mx-auto h-72 w-72 overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={sourceUrl}
                alt="Vista previa"
                className="h-full w-full object-cover"
                style={{
                  transform: `translate(${offsetX / 2}px, ${offsetY / 2}px) scale(${zoom})`,
                }}
              />
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1 block text-[12px] font-semibold text-gray-600">
                  Zoom
                </span>
                <input
                  type="range"
                  min="1"
                  max="2.4"
                  step="0.05"
                  value={zoom}
                  onChange={(event) => setZoom(Number(event.target.value))}
                  className="w-full"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[12px] font-semibold text-gray-600">
                    Horizontal
                  </span>
                  <input
                    type="range"
                    min="-120"
                    max="120"
                    value={offsetX}
                    onChange={(event) => setOffsetX(Number(event.target.value))}
                    className="w-full"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[12px] font-semibold text-gray-600">
                    Vertical
                  </span>
                  <input
                    type="range"
                    min="-120"
                    max="120"
                    value={offsetY}
                    onChange={(event) => setOffsetY(Number(event.target.value))}
                    className="w-full"
                  />
                </label>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCropOpen(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-[#00498d] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#003d7a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Guardando..." : "Guardar foto"}
              </button>
            </div>
          </div>
        </div>
      )}

      {viewOpen && avatarUrl && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-950/70 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-2xl">
            <img
              src={avatarUrl}
              alt={displayName}
              className="aspect-square w-full rounded-xl object-cover"
            />
            <button
              type="button"
              onClick={() => setViewOpen(false)}
              className="mt-3 w-full rounded-lg border border-gray-200 px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
