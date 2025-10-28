import { useEffect, useMemo, useState } from "react";
import { programApi } from "../api/program";
import type { Program } from "../types/program";

export const usePrograms = (pickCount = 3) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await programApi.getAll();
        if (controller.signal.aborted) return;

        const shuffled = [...list].sort(() => 0.5 - Math.random());
        setPrograms(shuffled.slice(0, pickCount));
      } catch (e) {
        if ((e as any)?.name !== "CanceledError") setError(e);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    run();
    return () => controller.abort();
  }, [pickCount]);

  return useMemo(() => ({ programs, loading, error }), [programs, loading, error]);
};
