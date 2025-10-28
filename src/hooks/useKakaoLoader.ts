import { useEffect, useState } from "react";

export const useKakaoLoader = () => {
  const [loaded, setLoaded] = useState(!!(window as any).kakao);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if ((window as any).kakao) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false&libraries=services`;
    script.async = true;

    const onLoad = () => (window as any).kakao.maps.load(() => setLoaded(true));
    const onError = (e: any) => setError(e);

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };
  }, []);

  return { loaded, error };
};
