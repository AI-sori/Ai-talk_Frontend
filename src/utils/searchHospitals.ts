import type { Hospital } from "../types/hospital";

type Args = {
  map: kakao.maps.Map;
  center: kakao.maps.LatLng;
  overlaysRef: React.MutableRefObject<kakao.maps.Marker[]>;
  onListReady: (list: Hospital[]) => void;
  limit?: number;
};

export const searchHospitals = ({ map, center, overlaysRef, onListReady, limit = 5 }: Args) => {
  const { kakao } = window as any;
  const ps = new kakao.maps.services.Places();
  const keywords = ["소아과", "정신과", "종합병원", "대학병원"];

  // 기존 마커 제거
  overlaysRef.current.forEach((m) => m.setMap(null));
  overlaysRef.current = [];

  const seenIds = new Set<string>();
  const unique: Array<{ id: string; name: string; address: string; x: number; y: number; tag: string }> = [];

  let completed = 0;
  let currentInfoOverlay: kakao.maps.CustomOverlay | null = null;

  const finalize = () => {
    const withDist = unique.map((p) => {
      const dx = p.x - center.getLng();
      const dy = p.y - center.getLat();
      const distance = Math.sqrt(dx * dx + dy * dy);
      return { ...p, distance };
    });

    const sorted = withDist.sort((a, b) => a.distance - b.distance).slice(0, limit);

    onListReady(sorted.map((p) => ({ id: p.id, name: `[${p.tag}] ${p.name}`, address: p.address })));

    sorted.forEach((p) => {
      const pos = new kakao.maps.LatLng(p.y, p.x);
      const marker = new kakao.maps.Marker({ map, position: pos });
      overlaysRef.current.push(marker);

      const infoContent = `
        <div style="background:white;border-radius:6px;padding:8px 10px;box-shadow:0 1px 4px rgba(0,0,0,0.2);min-width:150px;max-width:220px;font-size:12px;">
          <div style="font-weight:600;margin-bottom:4px;">[${p.tag}] ${p.name}</div>
          <div style="color:#555;">${p.address}</div>
          <div style="margin-top:6px;">
            <a href="https://map.kakao.com/link/map/${encodeURIComponent(p.name)},${p.y},${p.x}" target="_blank" style="color:#3366cc;text-decoration:underline;font-size:11px;">
              카카오맵에서 보기
            </a>
          </div>
        </div>
      `;

      const infoOverlay = new kakao.maps.CustomOverlay({ content: infoContent, position: pos, yAnchor: 1 });

      kakao.maps.event.addListener(marker, "click", () => {
        if (currentInfoOverlay) currentInfoOverlay.setMap(null);
        infoOverlay.setMap(map);
        currentInfoOverlay = infoOverlay;
      });

      kakao.maps.event.addListener(map, "click", () => {
        if (currentInfoOverlay) {
          currentInfoOverlay.setMap(null);
          currentInfoOverlay = null;
        }
      });
    });
  };

  keywords.forEach((kw) => {
    ps.keywordSearch(
      kw,
      (data: kakao.maps.services.PlacesSearchResult[], status: kakao.maps.services.Status) => {
        if (status === kakao.maps.services.Status.OK) {
          data.forEach((place) => {
            if (!seenIds.has(place.id)) {
              seenIds.add(place.id);
              unique.push({
                id: place.id,
                name: place.place_name,
                address: place.address_name,
                x: Number(place.x),
                y: Number(place.y),
                tag: kw,
              });
            }
          });
        }
        if (++completed === keywords.length) finalize();
      },
      { location: center, radius: 3000 }
    );
  });
};
