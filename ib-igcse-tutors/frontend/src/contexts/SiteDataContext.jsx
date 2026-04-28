import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getSiteDataSnapshot, refreshPublicSiteData, subscribeSiteData } from "../services/publicSiteService";

const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [siteData, setSiteData] = useState(getSiteDataSnapshot);
  const [isSiteDataLoading, setIsSiteDataLoading] = useState(true);
  const [siteDataError, setSiteDataError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = subscribeSiteData(setSiteData);

    async function loadSiteData() {
      setIsSiteDataLoading(true);
      try {
        await refreshPublicSiteData();
        if (isMounted) {
          setSiteData(getSiteDataSnapshot());
          setSiteDataError("");
        }
      } catch (error) {
        if (isMounted) {
          setSiteData(getSiteDataSnapshot());
          setSiteDataError(error?.message || "Unable to load public site data.");
        }
      } finally {
        if (isMounted) {
          setIsSiteDataLoading(false);
        }
      }
    }

    loadSiteData();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      siteData,
      isSiteDataLoading,
      siteDataError,
      refreshSiteData: async () => {
        setIsSiteDataLoading(true);
        await refreshPublicSiteData().then(() => {
          setSiteDataError("");
        }).catch((error) => {
          setSiteDataError(error?.message || "Unable to load public site data.");
        });
        setSiteData(getSiteDataSnapshot());
        setIsSiteDataLoading(false);
      },
    }),
    [isSiteDataLoading, siteData, siteDataError],
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
