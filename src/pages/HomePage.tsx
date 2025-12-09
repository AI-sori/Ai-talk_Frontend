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
} from "recharts";
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

declare global {
  interface Window {
    kakao: any;
  }
}

const Outer = styled.div`
  width: 100vw;
  min-height: 100dvh;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin: 1rem 0;
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

  &:hover {
    background-color: #7ca9e0;
  }
`;
const BannerContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 140px;
  margin: 1rem 0;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
`;

const BannerWrapper = styled.div<{ index: number }>`
  display: flex;
  width: 300%;
  transform: translateX(${(props) => -props.index * 100}%);
  transition: transform 0.4s ease-in-out;
`;

const BannerSlide = styled.div`
  width: 100%;
  flex-shrink: 0;
  height: 140px;
  border-radius: 16px;
  cursor: pointer;
  background-size: cover;
  background-position: center;
`;

const BannerDots = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#ffffff" : "rgba(255,255,255,0.5)")};
  transition: background 0.3s;
`;


const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [graphData, setGraphData] = useState<any[]>([]);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const hospitalOverlays = useRef<any[]>([]);
const [index, setIndex] = useState(0);
const navigate = useNavigate();

// 자동 슬라이드 (3초마다)
useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % banners.length);
  }, 3000);
  return () => clearInterval(interval);
}, []);

  // ---------------------- 1) 그래프 불러오기
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

  // ---------------------- 2) 그래프 컴포넌트
  const DevelopmentGraph = () => {
    if (graphData.length === 0) {
      return <div style={{ color: "#777", marginTop: 10 }}>아직 평가 기록이 없어요.</div>;
    }

    const colorMap = {
      집중력: "#a2b7f3",
      명확성: "#3f52dd",
      유창성: "#e2dcfc",
    };

const banners = [
  {
    img: "https://images.unsplash.com/photo-1581091870632-1c89b097e30b",
    link: "/assessment",
  },
  {
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692",
    link: "/community",
  },
  {
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    link: "/ai-program",
  },
];

    return (
      <div style={{ width: "100%", height: 200 }}>
        <div style={{ width: "100%", height: 160, marginLeft: "-30px" }}>
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
                formatter={(value) => `${value}점`}
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

        <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
          {Object.entries(colorMap).map(([label, color]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", margin: "0 8px" }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
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

  // ---------------------- 3) 카카오맵 로드
  useEffect(() => {
    if (!window.kakao) {
      const script = document.createElement("script");
      script.src =
        `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
      script.onload = () => {
        window.kakao.maps.load(() => setLoaded(true));
      };
      document.head.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  // ---------------------- 4) 병원 검색 함수 (TS 오류 해결 버전)
  const searchHospitals = (center: any) => {
    const { kakao } = window;
    const map = mapInstance.current;
    const ps = new kakao.maps.services.Places();

    const keywords = ["소아과", "정신과", "종합병원", "대학병원"];

    hospitalOverlays.current.forEach((m) => m.setMap(null));
    hospitalOverlays.current = [];

    const seen = new Set<string>();
    const results: any[] = [];
    let completed = 0;

    keywords.forEach((keyword) => {
      ps.keywordSearch(
        keyword,
        (
          data: kakao.maps.services.PlacesSearchResult[],
          status: kakao.maps.services.Status
        ) => {
          if (status === kakao.maps.services.Status.OK) {
            data.forEach((place) => {
              if (!seen.has(place.id)) {
                seen.add(place.id);
                results.push({
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
            const withDistance = results.map((p) => ({
              ...p,
              distance: Math.sqrt(
                Math.pow(p.x - center.getLng(), 2) +
                Math.pow(p.y - center.getLat(), 2)
              ),
            }));

            const sorted = withDistance.sort((a, b) => a.distance - b.distance).slice(0, 5);

            setHospitalList(
              sorted.map((p) => ({
                id: p.id,
                name: `[${p.tag}] ${p.name}`,
                address: p.address,
              }))
            );

            sorted.forEach((p) => {
              const pos = new kakao.maps.LatLng(p.y, p.x);
              const marker = new kakao.maps.Marker({ map, position: pos });
              hospitalOverlays.current.push(marker);

              const overlay = new kakao.maps.CustomOverlay({
                position: pos,
                content: `
                  <div style="background:white;padding:6px 10px;border-radius:6px;box-shadow:0 1px 4px rgba(0,0,0,0.2);">
                    <b>[${p.tag}] ${p.name}</b><br />
                    <span style="color:#555">${p.address}</span>
                  </div>
                `,
                yAnchor: 1,
              });

              kakao.maps.event.addListener(marker, "click", () => {
                overlay.setMap(map);
              });
            });
          }
        },
        { location: center, radius: 3000 }
      );
    });
  };

  // ---------------------- 5) 현재 위치 기반 병원 검색
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
        const user = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        map.setCenter(user);

        new kakao.maps.Circle({
          center: user,
          radius: 10,
          strokeWeight: 2,
          strokeColor: "#6495cf",
          fillColor: "#6495cf",
          fillOpacity: 0.5,
          map,
        });

        searchHospitals(user);
      },
      () => {},
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [loaded]);

  // ---------------------- UI 출력
  return (
    <Outer>
      <Container>
        <Card>
          <h3>우리 아이 발달 그래프</h3>
          <DevelopmentGraph />
        </Card>
<BannerContainer>
  <BannerWrapper index={index}>
    {banners.map((b, i) => (
      <BannerSlide
        key={i}
        style={{
          backgroundImage: `url(${b.img})`,
        }}
        onClick={() => navigate(b.link)}
      />
    ))}
  </BannerWrapper>

  <BannerDots>
    {banners.map((_, i) => (
      <Dot key={i} active={i === index} />
    ))}
  </BannerDots>
</BannerContainer>

        <Card>
          <h3>주변 병원 찾기</h3>
          <MapWrapper>
            <MapControl>
              <ControlButton onClick={() => searchHospitals(mapInstance.current.getCenter())}>
                이 위치에서 다시 찾기
              </ControlButton>
            </MapControl>

            <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
          </MapWrapper>

          <HospitalList hospitals={hospitalList} />
        </Card>
      </Container>
    </Outer>
  );
};

export default HomePage;
