import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import HospitalList from "../components/HospitalList";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { usePrograms } from "../hooks/usePrograms";
import { useKakaoLoader } from "../hooks/useKakaoLoader";
import { searchHospitals } from "../utils/searchHospitals";
import type { Hospital } from "../types/hospital";
import * as S from "./styles/HomePage.styles";

const chartData = [
  { month: "3월", 언어발달: 60, 인지발달: 40, 정서발달: 35 },
  { month: "4월", 언어발달: 55, 인지발달: 30, 정서발달: 40 },
  { month: "5월", 언어발달: 70, 인지발달: 25, 정서발달: 30 },
  { month: "6월", 언어발달: 65, 인지발달: 50, 정서발달: 60 },
];

const colorMap: Record<string, string> = {
  언어발달: "#a2b7f3",
  인지발달: "#3f52dd",
  정서발달: "#e2dcfc",
};

const DevelopmentGraph = () => (
  <S.GraphRoot>
    <S.GraphInner>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
          {/* Color.ts에 grid 토큰이 없으니 고정값 사용 */}
          <CartesianGrid stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip />
          {Object.keys(colorMap).map((key) => (
            <Line key={key} type="linear" dataKey={key} stroke={colorMap[key]} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </S.GraphInner>

    <S.GraphLegend>
      {Object.entries(colorMap).map(([label, color]) => (
        <S.LegendItem key={label}>
          <S.LegendDot style={{ backgroundColor: color }} />
          <span>{label}</span>
        </S.LegendItem>
      ))}
    </S.GraphLegend>
  </S.GraphRoot>
);

const HomePage = () => {
  const { loaded: sdkLoaded, error: sdkError } = useKakaoLoader();

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const hospitalOverlays = useRef<kakao.maps.Marker[]>([]);
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);

  const { programs, loading: programsLoading, error: programsError } = usePrograms(3);

  const canInitMap = useMemo(() => sdkLoaded && !!mapRef.current, [sdkLoaded, mapRef]);

  useEffect(() => {
    if (!canInitMap) return;
    const { kakao } = window;

    const map = new kakao.maps.Map(mapRef.current as HTMLDivElement, {
      center: new kakao.maps.LatLng(37.5665, 126.978),
      level: 4,
    });
    mapInstance.current = map;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userPos = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
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

        searchHospitals({
          map,
          center: userPos,
          overlaysRef: hospitalOverlays,
          onListReady: setHospitalList,
          limit: 5,
        });
      },
      (err) => console.error("위치 추적 실패", err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      hospitalOverlays.current.forEach((m) => m.setMap(null));
      hospitalOverlays.current = [];
    };
  }, [canInitMap]);

  const handleRelocateSearch = useCallback(() => {
    if (!mapInstance.current || !sdkLoaded) return;
    const center = mapInstance.current.getCenter();
    searchHospitals({
      map: mapInstance.current,
      center,
      overlaysRef: hospitalOverlays,
      onListReady: setHospitalList,
      limit: 5,
    });
  }, [sdkLoaded]);

  if (sdkError) return <div>지도를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <S.Outer>
      <S.Container>
        <S.Card>
          <h3>우리 아이 발달 그래프</h3>
          <DevelopmentGraph />
        </S.Card>

        <S.Card>
          <S.SectionTitle>맞춤 학습 프로그램</S.SectionTitle>
          {programsLoading && <S.HelperText>불러오는 중…</S.HelperText>}
          {programsError && <S.HelperText>프로그램 정보를 불러오지 못했습니다.</S.HelperText>}
          {!programsLoading && !programsError && (
            <S.ProgramCarousel>
              {programs.map((p) => (
                <S.ProgramCard key={p.id}>
                  <S.ProgramVideo src={p.videoUrl} allowFullScreen />
                  <S.ProgramMeta>
                    <span className="type">{p.type}</span>
                    <span>{p.duration}분</span>
                  </S.ProgramMeta>
                  <S.ProgramTitle>{p.title}</S.ProgramTitle>
                  <S.ProgramDesc>{p.description}</S.ProgramDesc>
                </S.ProgramCard>
              ))}
            </S.ProgramCarousel>
          )}
        </S.Card>

        <S.Card>
          <h3>주변 병원 찾기</h3>
          <S.MapWrapper>
            <S.MapControl>
              <S.ControlButton onClick={handleRelocateSearch} aria-label="현재 위치에서 병원 다시 검색">
                이 위치에서 다시 찾기
              </S.ControlButton>
            </S.MapControl>
            <S.MapCanvas ref={mapRef} />
          </S.MapWrapper>
          <HospitalList hospitals={hospitalList} />
        </S.Card>
      </S.Container>
    </S.Outer>
  );
};

export default HomePage;
