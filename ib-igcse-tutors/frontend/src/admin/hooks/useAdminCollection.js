import { useCallback, useEffect, useState } from "react";

export function useAdminCollection(loader) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const nextItems = await loader();
      setItems(nextItems);
    } catch (loadError) {
      setError(loadError.message || "Unable to load items right now.");
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    items,
    loading,
    error,
    refresh,
    setItems,
  };
}
