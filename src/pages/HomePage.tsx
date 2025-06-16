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

const Outer = styled.div`
  width: 100vw;
  height: auto;
  min-height: 100dvh;
  background: #f9f9f9;
  display: flex;
  flex-direction: column; 
  align-items: center;
  overflow: hidden; /* 스크롤 안 생기게 */
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
  position: relative; /* 지도 안에 절대 위치 배치 위해 추가 */
  overflow: hidden;
`;

const MapControl = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10; /* 지도 위에 보이도록 충분히 높은 값 */
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

type Program = {
  id: number;
  category: string;
  title: string;
  type: string;
  duration: number;
  description: string;
  videoUrl: string;
};


const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const hospitalOverlays = useRef<any[]>([]);
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);

const getRandomPrograms = (arr: Program[], count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

  const data = [
    { month: '3월', 언어발달: 60, 인지발달: 40, 정서발달: 35 },
    { month: '4월', 언어발달: 55, 인지발달: 30, 정서발달: 40 },
    { month: '5월', 언어발달: 70, 인지발달: 25, 정서발달: 30 },
    { month: '6월', 언어발달: 65, 인지발달: 50, 정서발달: 60 },
  ];
  
  const colorMap = {
    언어발달: '#a2b7f3',
    인지발달: '#3f52dd',
    정서발달: '#e2dcfc',
  };

  const DevelopmentGraph = () => (
    <div style={{ width: '100%', height: 200 }}>
      {/* 그래프만 왼쪽으로 이동 */}
      <div style={{ width: '100%', height: 160, marginLeft: '-30px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
            <CartesianGrid stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip />
            {Object.keys(colorMap).map((key) => (
              <Line
                key={key}
                type="linear"
                dataKey={key}
                stroke={colorMap[key as keyof typeof colorMap]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
  
      {/* 범례는 고정 위치에서 따로 아래 그려줌 */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: 6 }}>
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
  
  // 초기 카카오맵 로딩
  useEffect(() => {
    if (!window.kakao) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP_KEY
      }&autoload=false&libraries=services`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          setLoaded(true);
        });
      };
      document.head.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  

  // 병원 검색 함수
const searchHospitals = (center: kakao.maps.LatLng) => {
  const map = mapInstance.current;
  const ps = new kakao.maps.services.Places();

  const keywords = ["소아과", "정신과", "종합병원", "대학병원"];

  hospitalOverlays.current.forEach(marker => marker.setMap(null));
  hospitalOverlays.current = [];

  const seenIds = new Set<string>();
  const uniqueResults: {
    id: string;
    name: string;
    address: string;
    x: number;
    y: number;
    tag: string;
  }[] = [];

  let completed = 0;
  let markerIndex = 1;
  let currentInfoOverlay: any = null; // ✅ 현재 열려있는 말풍선 추적

  keywords.forEach((keyword) => {
    ps.keywordSearch(
      keyword,
      (data: kakao.maps.services.PlacesSearchResult[], status: kakao.maps.services.Status) => {
        if (status === kakao.maps.services.Status.OK) {
          data.forEach((place) => {
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
          const trimmed = uniqueResults.slice(0, 5);
          setHospitalList(
            trimmed.map((place) => ({
              id: place.id,
              name: `[${place.tag}] ${place.name}`,
              address: place.address,
            }))
          );

          trimmed.forEach((place) => {
            const position = new kakao.maps.LatLng(place.y, place.x);

            // ✅ 1. 마커 생성 (기본 Kakao 마커)
            const marker = new kakao.maps.Marker({
              map,
              position,
            });

            hospitalOverlays.current.push(marker);

            // ✅ 2. 말풍선(content) 만들기 - 크기 축소됨
            const infoContent = `
              <div style="background:white;border-radius:6px;padding:8px 10px;box-shadow:0 1px 4px rgba(0,0,0,0.2);min-width:150px;max-width:200px;font-size:12px;">
                <div style="font-weight:600;margin-bottom:4px;">[${place.tag}] ${place.name}</div>
                <div style="color:#555;">${place.address}</div>
                <div style="margin-top:6px;">
                  <a href="https://map.kakao.com/link/map/${encodeURIComponent(place.name)},${place.y},${place.x}"
                     target="_blank"
                     style="color:#3366cc;text-decoration:underline;font-size:11px;">
                    카카오맵에서 보기
                  </a>
                </div>
              </div>
            `;

            const infoOverlay = new kakao.maps.CustomOverlay({
              content: infoContent,
              position,
              yAnchor: 1,
            });

            // ✅ 3. 마커 클릭 시 말풍선 열기 (이전 말풍선 닫고 새로 열기)
           (kakao.maps.event as any).addListener(marker, 'click', () => {
              if (currentInfoOverlay) currentInfoOverlay.setMap(null);
              infoOverlay.setMap(map);
              currentInfoOverlay = infoOverlay;
            });

            markerIndex++;
          });

          // ✅ 4. 지도 클릭 시 열려 있던 말풍선 닫기
          kakao.maps.event.addListener(map, 'click', () => {
            if (currentInfoOverlay) {
              currentInfoOverlay.setMap(null);
              currentInfoOverlay = null;
            }
          });
        }
      },
      {
        location: center,
        radius: 3000,
      }
    );
  });
};

/*
  // 현재 위치로 지도 이동
  const goToMyLocation = () => {
  const { kakao } = window;

  if (!mapInstance.current) {
    console.warn("지도 인스턴스가 아직 초기화되지 않았습니다.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const userLatLng = new kakao.maps.LatLng(
        pos.coords.latitude,
        pos.coords.longitude
      );

      const map = mapInstance.current;
      map.setCenter(userLatLng);

      new kakao.maps.Marker({
        position: userLatLng,
        map,
      });

      searchHospitals(userLatLng);
    },
    (err) => {
      alert("위치 정보를 가져올 수 없습니다. 브라우저 위치 권한을 확인하세요.");
      console.error(err);
    }
  );
};  */


  useEffect(() => {
    if (!loaded || !mapRef.current) return;
    const { kakao } = window;
  
    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 fallback 위치
      level: 4,
    });
    mapInstance.current = map;
  
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userPos = new kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
  
        map.setCenter(userPos);
  
        // 내 위치 표시용 원
        new kakao.maps.Circle({
          center: userPos,
          radius: 10,
          strokeWeight: 2,
          strokeColor: '#6495cf',
          strokeOpacity: 0.8,
          fillColor: '#6495cf',
          fillOpacity: 0.5,
          map,
        });
  
        searchHospitals(userPos);
      },
      (err) => {
        console.error("위치 추적 실패", err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  
    return () => {
      navigator.geolocation.clearWatch(watchId); // 언마운트 시 추적 중단
    };
  }, [loaded]);
  
useEffect(() => {
  const fetchPrograms = async () => {
    try {
      const res = await axiosInstance.get("/program");
      const data: Program[] = res.data;
      setPrograms(getRandomPrograms(data, 3)); // 랜덤 3개
      console.log(data)
    } catch (err) {
      console.error("학습 프로그램 불러오기 실패:", err);
    }
  };
  fetchPrograms();
}, []);


  return (
    <Outer>
      <Container>
      <Card>
  <h3>우리 아이 발달 그래프</h3>
  <DevelopmentGraph />
</Card>
       <Card>
  <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "1rem" }}>맞춤 학습 프로그램</h3>
  <div style={{ display: "flex", gap: "1rem", overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: "0.5rem" }}>
    {programs.map((program) => (
      <div
        key={program.id}
        style={{
          flex: "0 0 auto",
          width: 240,
          scrollSnapAlign: "start",
          background: "#f7f7fb",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <iframe
          src={program.videoUrl}
          style={{ width: "100%", height: 140, border: "none" }}
          allowFullScreen
        />
        <div style={{ display: "flex", gap: "1rem", fontSize: 13, fontWeight: 500, color: "#777", padding: "0.8rem 1rem 0 1rem" }}>
          <span style={{ color: "#7595D3" }}>{program.type}</span>
          <span>{program.duration}분</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: "bold", padding: "0.3rem 1rem 0 1rem" }}>{program.title}</div>
        <div style={{ fontSize: 13, color: "#666", padding: "0.3rem 1rem 1rem 1rem" }}>{program.description}</div>
      </div>
    ))}
  </div>
</Card>
        <Card>
          <h3>주변 병원 찾기</h3>
          <MapWrapper>
            <MapControl>
              <ControlButton onClick={() => searchHospitals(mapInstance.current.getCenter())}>
                이 위치에서 다시 찾기
              </ControlButton>

            </MapControl>
            <div
              ref={mapRef}
              style={{ width: "100%", height: "100%", borderRadius: "12px" }}
            />
          </MapWrapper>
         <HospitalList hospitals={hospitalList} />
        </Card>
      </Container>
    </Outer>
  );
};

export default HomePage;