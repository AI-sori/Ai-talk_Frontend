import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import HospitalList from '../components/HospitalList';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axiosInstance from "../api/axiosInstance";

type Hospital = {
  id: string;
  name: string;
  address: string;
};

type LevelRecord = {
  id: number;
  level: string;
  totalScore: number;
  concentration: number;
  clarity: number;
  fluency: number;
  assessedDate: string;
};

const Outer = styled.div`
  width: 100vw;
  height: auto;
  min-height: 100dvh;
  background: #f9f9f9;
  display: flex;
  flex-direction: column; 
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  flex: 1;
  background: white;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  color: black;
  padding: 1.5rem;
  font-family: SemiBold;
  font-size: 17px;
  margin: 0.9rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const MapWrapper = styled.div`
  width: 100%; 
  height: 400px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
`;

const MapControl = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
`;

const ControlButton = styled.button`
  background-color: #94b5e9;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #7ca9e0;
  }
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const hospitalOverlays = useRef<any[]>([]);
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [graphData, setGraphData] = useState<any[]>([]);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const res = await axiosInstance.get("/api/graph");
        const records: LevelRecord[] = res.data.data ?? [];

        const formatted = records.map((item) => ({
          date: item.assessedDate,
          집중력: item.concentration,
          명확성: item.clarity,
          유창성: item.fluency,
        }));

        setGraphData(formatted);
      } catch (err) {
        console.error("그래프 데이터 불러오기 실패:", err);
      }
    };

    fetchGraph();
  }, []);

  const DevelopmentGraph = () => {
    if (graphData.length === 0) {
      return (
        <div style={{ fontSize: 14, color: "#777", marginTop: 10 }}>
          아직 평가 기록이 없어요.
        </div>
      );
    }

    const colorMap = {
      집중력: "#a2b7f3",
      명확성: "#3f52dd",
      유창성: "#e2dcfc",
    };

    return (
      <div style={{ width: '100%', height: 200 }}>
        <div style={{ width: '100%', height: 160, marginLeft: '-30px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData}>
              <CartesianGrid stroke="#f0f0f0" vertical={false} />

              <XAxis dataKey="date" tick={{ fontSize: 12 }} />

              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                label={{ value: "점수", angle: -90, position: "insideLeft" }}
              />

              <Tooltip 
                formatter={(value: number) => `${value}점`}
                labelFormatter={(label) => `평가일: ${label}`}
              />

              {Object.keys(colorMap).map((key) => (
                <Line
                  key={key}
                  dataKey={key}
                  stroke={colorMap[key as keyof typeof colorMap]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          {Object.entries(colorMap).map(([label, color]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', margin: '0 8px' }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: color,
                  marginRight: 6,
                }}
              />
              <span style={{ fontSize: 12 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!window.kakao) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP_KEY
      }&autoload=false&libraries=services`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => setLoaded(true));
      };
      document.head.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  const searchHospitals = (center: any) => {
    const { kakao } = window as any;
    const map = mapInstance.current;
    const ps = new kakao.maps.services.Places();

    const keywords = ["소아과", "정신과", "종합병원", "대학병원"];

    hospitalOverlays.current.forEach((marker) => marker.setMap(null));
    hospitalOverlays.current = [];

    const seenIds = new Set<string>();
    const uniqueResults: any[] = [];
    let completed = 0;
    let currentInfoOverlay: any = null;

    keywords.forEach((keyword) => {
      ps.keywordSearch(
        keyword,
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            data.forEach((place: any) => {
              if (!seenIds.has(place.id)) {
                seenIds.add(place.id);
                uniqueResults.push({
                  id: place.id,
                  name: place.place_name,
                  address: place.address_name,
                  x: Number(place.x),
                  y: Number(place.y),
                  tag: keyword,
                });
              }
            });
          }

          completed++;

          if (completed === keywords.length) {
            const resultsWithDistance = uniqueResults.map((place) => {
              const dx = place.x - center.getLng();
              const dy = place.y - center.getLat();
              return { ...place, distance: Math.sqrt(dx * dx + dy * dy) };
            });

            const sorted = resultsWithDistance.sort((a, b) => a.distance - b.distance).slice(0, 5);

            setHospitalList(
              sorted.map((place) => ({
                id: place.id,
                name: `[${place.tag}] ${place.name}`,
                address: place.address,
              }))
            );

            sorted.forEach((place) => {
              const position = new kakao.maps.LatLng(place.y, place.x);

              const marker = new kakao.maps.Marker({ map, position });
              hospitalOverlays.current.push(marker);

              const infoContent = `
                <div style="background:white;border-radius:6px;padding:8px 10px;box-shadow:0 1px 4px rgba(0,0,0,0.2);min-width:150px;max-width:200px;font-size:12px;">
                  <div style="font-weight:600;margin-bottom:4px;">[${place.tag}] ${place.name}</div>
                  <div style="color:#555;">${place.address}</div>
                </div>
              `;

              const infoOverlay = new kakao.maps.CustomOverlay({
                content: infoContent,
                position,
                yAnchor: 1,
              });

              kakao.maps.event.addListener(marker, "click", () => {
                if (currentInfoOverlay) currentInfoOverlay.setMap(null);
                infoOverlay.setMap(map);
                currentInfoOverlay = infoOverlay;
              });
            });
          }
        },
        { location: center, radius: 3000 }
      );
    });
  };


  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    const { kakao } = window;

    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(37.5665, 126.978),
      level: 4,
    });

    mapInstance.current = map;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const userPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

        map.setCenter(userPos);

        new kakao.maps.Circle({
          center: userPos,
          radius: 10,
          strokeWeight: 2,
          strokeColor: "#6495cf",
          strokeOpacity: 0.8,
          fillColor: "#6495cf",
          fillOpacity: 0.5,
          map,
        });

        searchHospitals(userPos);
      },
      (err) => console.error("위치 추적 실패:", err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [loaded]);


  return (
    <Outer>
      <Container>

        {/* 발달 그래프 */}
        <Card>
          <h3>우리 아이 발달 그래프</h3>
          <DevelopmentGraph />
        </Card>

        {/* 병원 검색 */}
        <Card>
          <h3>주변 병원 찾기</h3>

          <MapWrapper>
            <MapControl>
              <ControlButton onClick={() => searchHospitals(mapInstance.current.getCenter())}>
                이 위치에서 다시 찾기
              </ControlButton>
            </MapControl>

            <div ref={mapRef} style={{ width: "100%", height: "100%", borderRadius: 12 }} />
          </MapWrapper>

          <HospitalList hospitals={hospitalList} />
        </Card>

      </Container>
    </Outer>
  );
};

export default HomePage;
