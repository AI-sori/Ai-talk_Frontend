import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { createHospitalOverlay } from '../utils/createHospitalOverlay';
import HospitalList from '../components/HospitalList';

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
  margin: 1rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const MapWrapper = styled.div`
  width: 100%; 
  height: 400px;
  border-radius: 12px;
`;

const MapControl = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 2;
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


const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const hospitalOverlays = useRef<kakao.maps.CustomOverlay[]>([]);
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
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
    const { kakao } = window;
    const map = mapInstance.current;
  
    // 기존 마커 제거
    hospitalOverlays.current.forEach(marker => marker.setMap(null));
    hospitalOverlays.current = [];
  
    const ps = new kakao.maps.services.Places();
    ps.categorySearch(
      "HP8",
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          //  병원 리스트 저장
          setHospitalList(
            data.map((place, idx) => ({
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

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = new kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        const map = new kakao.maps.Map(mapRef.current, {
          center: userPos,
          level: 4,
        });

      // 내 위치 원 표시
new kakao.maps.Circle({
  center: userPos,
  radius: 10, // 미터 단위
  strokeWeight: 2,
  strokeColor: '#6495cf',
  strokeOpacity: 0.8,
  fillColor: '#6495cf',
  fillOpacity: 0.5,
  map,
});


        mapInstance.current = map;
        searchHospitals(userPos);
      },
      () => {
        const fallbackPos = new kakao.maps.LatLng(37.5665, 126.978); // fallback: 서울 시청
        const map = new kakao.maps.Map(mapRef.current, {
          center: fallbackPos,
          level: 4,
        });
        mapInstance.current = map;
        searchHospitals(fallbackPos);
      }
    );
  }, [loaded]);

  return (
    <Outer>
      <Container>
        <Card>
          <h3>우리 아이 발달 그래프</h3>
          <div
            style={{ height: 160, background: "#f0f0ff", borderRadius: 12 }}
          />
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