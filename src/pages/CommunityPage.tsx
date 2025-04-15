import styled from "styled-components";
import AnonView from "../components/community/AnonView";
import ExpertView from "../components/community/ExpertView";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Outer = styled.div`
  width: 100vw;
  min-height: 100dvh;
  height: auto;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100dvh;
  height: auto;
  max-width: 400px;
  background: #F8FAFC;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: SemiBold;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  font-family: ExtraBold;
`;


const TopButton = styled.button`
  background-color: #94b5e9;
  color: white;
  font-size: 14px;
  font-family: Regular;
  border: none;
  border-radius: 7px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
  outline: none;

  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:hover {
    background-color: #7ca9e0;
  }
`;

const CardRow = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const InfoCard = styled.div<{ activeType?: 'anon' | 'expert'; tab: 'anon' | 'expert' }>`
  flex: 1;
  padding: 1.1rem;
  border-radius: 14px;
  font-size: 14px;
  width: 215px;
  height: 80px;
  font-weight: 500;
  color: #333;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  background-color: ${({ activeType, tab }) => {
    if (activeType === 'anon' && tab === 'anon') return '#C9E6FF';
    if (activeType === 'expert' && tab === 'expert') return '#F0EFFF';
    return '#f9f9f9';
  }};
  cursor: pointer;
`;

const CardTitle = styled.div<{ color: string; isActive: boolean }>`
  font-size: 17px;
  font-weight: bold;
 color: ${({ color }) => color};
  margin-bottom: 0.4rem;
  font-family: Bold;
`;

const CardText = styled.div`
  font-size: 14px;
  color: #424242;
  line-height: 1.4;
  font-family: Regular;
`;

const CommunityPage = () => {
  const [tab, setTab] = useState<"anon" | "expert">("anon");
  const navigate = useNavigate();
  const location = useLocation();

  const handleWriteClick = () => {
    if (tab === "anon") navigate("/community/write");
    else navigate("/consult/write");
  };

  useEffect(() => {
    if (location.state?.tab === "expert") {
      setTab("expert");
    } else if (location.state?.tab === "anon") {
      setTab("anon");
    }
  }, [location.state]);

  return (
    <Outer>
      <Container>
        <TitleRow>
          <Title>{tab === "anon" ? "커뮤니티" : "전문가 상담"}</Title>
          <TopButton
  style={{ backgroundColor: tab === "expert" ? "#C48DEF" : "#94b5e9" }}
  onClick={handleWriteClick}
>
  {tab === "anon" ? "글쓰기" : "상담 신청하기"}
</TopButton>

        </TitleRow>

        <CardRow>
        <InfoCard activeType="anon" tab={tab} onClick={() => setTab('anon')}>
        <CardTitle color="#6485CF" isActive={tab === "anon"}>
    익명 커뮤니티
  </CardTitle>
  <CardText>자유롭게 이야기를 나눌 수 있는 공간입니다</CardText>
</InfoCard>

<InfoCard activeType="expert" tab={tab} onClick={() => setTab('expert')}>
<CardTitle color="#C48DEF" isActive={tab === "expert"}>
    전문가 상담
  </CardTitle>
  <CardText>전문가와 상담할 수 있는 공간입니다</CardText>
</InfoCard>


        </CardRow>

        {tab === "anon" ? <AnonView /> : <ExpertView />}
      </Container>
    </Outer>
  );
};

export default CommunityPage;
