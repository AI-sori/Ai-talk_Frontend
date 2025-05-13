import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { createHospitalOverlay } from '../utils/createHospitalOverlay';
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



const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
 const hospitalOverlays = useRef<any[]>([]);
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);

  const data = [
    { month: '3월', 언어발달: 60, 인지발달: 40, 사회성발달: 20, 운동발달: 55, 정서발달: 35 },
    { month: '4월', 언어발달: 55, 인지발달: 30, 사회성발달: 35, 운동발달: 70, 정서발달: 40 },
    { month: '5월', 언어발달: 70, 인지발달: 25, 사회성발달: 50, 운동발달: 60, 정서발달: 30 },
    { month: '6월', 언어발달: 65, 인지발달: 50, 사회성발달: 80, 운동발달: 50, 정서발달: 60 },
  ];
  
  const colorMap = {
    언어발달: '#a2b7f3',
    인지발달: '#3f52dd',
    사회성발달: '#8bb4f9',
    운동발달: '#c49cf2',
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
  
    // 기존 마커 제거
    hospitalOverlays.current.forEach(marker => marker.setMap(null));
    hospitalOverlays.current = [];
  
    const ps = new (window as any).kakao.maps.services.Places();
    ps.categorySearch(
      "HP8",
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          //  병원 리스트 저장
          setHospitalList(
            data.slice(0, 3).map((place) => ({
              id: place.id,
              name: place.place_name,
              address: place.address_name,
            }))
          );
  
          data.forEach((place, idx) => {
            const overlay = createHospitalOverlay(
              map,
              Number(place.y),
              Number(place.x),
              idx + 1
            );
            overlay.setMap(map);
            hospitalOverlays.current.push(overlay);
          });
        }
      },
      {
        location: center,
        radius: 3000,
      }
    );
  };
  

  // 현재 위치로 지도 이동
  const goToMyLocation = () => {
    const { kakao } = window;

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
        alert("위치 정보를 가져올 수 없습니다.");
        console.error(err);
      }
    );
  };

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
  

  return (
    <Outer>
      <Container>
      <Card>
  <h3>우리 아이 발달 그래프</h3>
  <DevelopmentGraph />
</Card>
        <Card>
          <h3>맞춤 학습 프로그램</h3>
          <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
            <div
              style={{
                width: 160,
                height: 100,
                background: "#e0e0ff",
                borderRadius: 12,
              }}
            />
            <div
              style={{
                width: 160,
                height: 100,
                background: "#e0e0ff",
                borderRadius: 12,
              }}
            />
          </div>
        </Card>

        <Card>
          <h3>주변 병원 찾기</h3>
          <MapWrapper>
            <MapControl>
              <ControlButton onClick={() => searchHospitals(mapInstance.current.getCenter())}>
                이 위치에서 다시 찾기
              </ControlButton>
              <ControlButton onClick={goToMyLocation}>
                내 위치로 이동
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