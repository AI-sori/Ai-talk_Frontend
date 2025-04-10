import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Outer = styled.div`
  width: 100vw;
  height: 100dvh;
  background: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;
  background: white;
  overflow-y: auto;
  padding: 1.5rem;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
`;

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.kakao) {
      const script = document.createElement("script");
      // `autoload=false` 추가
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer,drawing`;
      script.async = true;
      script.onload = () => {
        console.log("카카오맵 API 로딩 완료");
        // sdk가 로드되면 load() 호출
        window.kakao.maps.load(() => {
          setLoaded(true);
        });
      };
      script.onerror = (e) => {
        console.error("카카오맵 API 로딩 실패", e);
      };
      document.head.appendChild(script);
    } else {
      setLoaded(true); // 이미 로드된 경우
    }
  }, []);

  useEffect(() => {
    if (loaded && mapRef.current) {
      if (window.kakao) {
        const { kakao } = window;

        const mapContainer = mapRef.current;
        const mapOption = {
          center: new kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };

        const map = new kakao.maps.Map(mapContainer, mapOption);

        const markerPosition1 = new kakao.maps.LatLng(37.5665, 126.978);
        const marker1 = new kakao.maps.Marker({
          position: markerPosition1,
        });
        marker1.setMap(map);

        const markerPosition2 = new kakao.maps.LatLng(37.5700, 126.978);
        const marker2 = new kakao.maps.Marker({
          position: markerPosition2,
        });
        marker2.setMap(map);
      } else {
        console.error("카카오맵 API가 로드되지 않았습니다.");
      }
    }
  }, [loaded]);

  return (
    <Outer>
      <Container>
        <Card>
          <h3>우리 아이 발달 그래프</h3>
          <div style={{ height: 160, background: "#f0f0ff", borderRadius: 12 }} />
        </Card>

        <Card>
          <h3>맞춤 학습 프로그램</h3>
          <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
            <div style={{ width: 160, height: 100, background: "#e0e0ff", borderRadius: 12 }} />
            <div style={{ width: 160, height: 100, background: "#e0e0ff", borderRadius: 12 }} />
          </div>
        </Card>

        <Card>
          <h3>주변 병원 찾기</h3>
          <MapWrapper ref={mapRef} />
        </Card>
      </Container>
    </Outer>
  );
};

export default HomePage;
