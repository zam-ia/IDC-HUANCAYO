"use client";

import { SessionProvider } from "next-auth/react";
import RadioProvider from "@/components/media/RadioProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RadioProvider>{children}</RadioProvider>
    </SessionProvider>
  );
}
