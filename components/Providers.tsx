"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import RadioProvider from "@/components/media/RadioProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const radioEnabled = !/\/(?:admin|campus|dashboard)(?:\/|$)/.test(pathname);

  return (
    <SessionProvider>
      {radioEnabled ? <RadioProvider>{children}</RadioProvider> : children}
    </SessionProvider>
  );
}
