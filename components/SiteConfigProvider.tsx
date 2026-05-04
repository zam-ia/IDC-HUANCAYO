"use client";

import { createContext, useContext } from "react";

interface SiteConfig {
  siteName: string;
  siteDescription: string;
  primaryColor: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  email: string;
  phone: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  whatsappNumber: string;
}

const SiteConfigContext = createContext<SiteConfig | null>(null);

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error("useSiteConfig debe usarse dentro de SiteConfigProvider");
  }
  return context;
}

export default function SiteConfigProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: SiteConfig;
}) {
  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}