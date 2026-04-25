import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getSiteDataSnapshot, refreshPublicSiteData, subscribeSiteData } from "../services/publicSiteService";

const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [siteData, setSiteData] = useState(getSiteDataSnapshot);

  useEffect(() => {
    const unsubscribe = subscribeSiteData(setSiteData);
    refreshPublicSiteData().catch(() => {});
    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      siteData,
      refreshSiteData: async () => {
        await refreshPublicSiteData().catch(() => {});
        setSiteData(getSiteDataSnapshot());
      },
    }),
    [siteData],
  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const context = useContext(SiteDataContext);

  if (!context) {
    throw new Error("useSiteData must be used inside SiteDataProvider");
  }

  return context;
}
