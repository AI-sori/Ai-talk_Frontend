import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import HospitalList from '../components/HospitalList';
import { useNavigate } from "react-router-dom";
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
  height: 140px;
  margin: 1rem 0;
  overflow: hidden;
  border-radius: 18px;
  position: relative;
`;

const BannerWrapper = styled.div<{ index: number }>`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => `-${props.index * 56.5}vw`});
`;


const BannerCard = styled.div`
  width: 100%;
  flex-shrink: 0;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 18px;
  color: #333;
  font-family: Pretendard;
  cursor: pointer;
`;

const BannerIcon = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
`;

const BannerTitle = styled.div`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const BannerDesc = styled.div`
  font-size: 13px;
  opacity: 0.85;
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
  background: ${(props) => (props.active ? "#fff" : "rgba(255,255,255,0.5)")};
`;

const banners = [
  {
    icon: "🧠",
    title: "발달 진단 하러가기",
    desc: "우리 아이 발달 단계를 빠르게 확인해보세요.",
    bg: "linear-gradient(135deg, #A3D8FF 0%, #D0E8FF 100%)",
    link: "/assessment",
  },
  {
    icon: "💬",
    title: "부모 커뮤니티 참여하기",
    desc: "다른 부모들과 경험을 나누고 도움을 받아요.",
    bg: "linear-gradient(135deg, #FFE3A3 0%, #FFD18C 100%)",
    link: "/community",
  },
  {
    icon: "🤖",
    title: "AI 학습 프로그램 추천",
    desc: "우리 아이에게 꼭 맞는 학습 계획을 받아보세요.",
    bg: "linear-gradient(135deg, #D3C6FF 0%, #E8DDFF 100%)",
    link: "/ai-program",
  },
];


const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [graphData, setGraphData] = useState<any[]>([]);
const navigate = useNavigate();

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const hospitalOverlays = useRef<any[]>([]);
const [index, setIndex] = useState(0);

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
// 자동 슬라이드 (3초마다)
useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % banners.length);
  }, 3000);
  return () => clearInterval(interval);
}, []);
  // ---------------------- 2) 그래프 컴포넌트
  const DevelopmentGraph = () => {
  //  기록 없을 때: 안내 UI
  if (graphData.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          padding: "0.5rem 0rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontSize: "17px",
            fontWeight: 700,
            color: "#333",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          아직 평가 기록이 없어요
        </div>

        <div
          style={{
            fontSize: "13.3px",
            color: "#777",
            lineHeight: 1.5,
            textAlign: "center",
            maxWidth: "260px",
          }}
        >
          발달 진단을 먼저 진행하면<br />
          우리 아이의 발달 변화를 확인할 수 있어요.
        </div>

        <button
          onClick={() =>
            (window.location.href =
              "https://ai-talkk.netlify.app/diagnosis")
          }
          style={{
            marginTop: "4px",
            padding: "10px 20px",
            background:
              "linear-gradient(135deg, #6d8dff 0%, #89a8ff 100%)",
            border: "none",
            borderRadius: "14px",
            color: "white",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
          }}
        >
          발달 진단 하러가기
        </button>
      </div>
    );
  }

  //  기록 있을 때: 원래 그래프 UI
  const colorMap = {
    집중력: "#a2b7f3",
    명확성: "#3f52dd",
    유창성: "#e2dcfc",
  };

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
              label={{ angle: -90, position: "insideLeft" }}
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
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", margin: "0 8px" }}
          >
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
       <Card> {graphData.length > 0 && <h3>우리 아이 발달 그래프</h3>} <DevelopmentGraph /> </Card>
<BannerContainer>
  <BannerWrapper count={banners.length} index={index}>
    {banners.map((b, i) => (
      <BannerCard
        key={i}
        style={{ background: b.bg }}
        onClick={() => navigate(b.link)}
      >
        <BannerIcon>{b.icon}</BannerIcon>
        <BannerTitle>{b.title}</BannerTitle>
        <BannerDesc>{b.desc}</BannerDesc>
      </BannerCard>
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
