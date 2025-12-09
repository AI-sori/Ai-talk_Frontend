import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useEffect, useState } from 'react';

const Outer = styled.div`
  width: 100vw;
  min-height: 100dvh;
  background: #f9f9f9;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  background: #f8fafc;
  padding: 1.5rem;
  box-sizing: border-box;
  color: #000;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

const SectionTitle = styled.h3`
  font-family: Bold;
  font-size: 18px;
  margin-bottom: 0.6rem;
`;

const SimpleDesc = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 1.2rem;
  line-height: 1.5;
`;

const Tabs = styled.div`
  width: 100%;
  background: #eef1f6;
  padding: 6px;
  border-radius: 14px;
  display: flex;
  gap: 6px;
  margin-bottom: 1.4rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px 12px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
  background: ${(p) => (p.active ? "#6d8dff" : "transparent")};
  color: ${(p) => (p.active ? "white" : "#5a5a5a")};
  box-shadow: ${(p) => (p.active ? "0 4px 12px rgba(77,107,255,0.35)" : "none")};
  outline: none;

  &:active {
    transform: scale(0.97);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;

const StartBtn = styled.button`
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  font-size: 15px;
  background: #e8eeff;
  color: #4a68a1;
  font-weight: 600;
`;

const HorizontalScroll = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-snap-type: x mandatory;
`;

const ProgramCard = styled.div`
  flex: 0 0 auto;
  width: 240px;
  scroll-snap-align: start;
  background: #f7f7fb;
  border-radius: 12px;
  overflow: hidden;
`;

const Video = styled.iframe`
  width: 100%;
  height: 140px;
  border: none;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 13px;
  font-weight: 600;
  color: #777;
  padding: 0.8rem 1rem 0 1rem;
`;

const ProgramTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding: 0.3rem 1rem 0 1rem;
`;

const Description = styled.div`
  font-size: 13px;
  color: #666;
  padding: 0.3rem 1rem 1rem 1rem;
`;

const EmptyState = styled.div`
  width: 100%;
  padding: 1.2rem 0rem;
  text-align: center;
  color: #4a4a4a;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const EmptyTitle = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: #3d3d3d;
`;

const EmptyText = styled.div`
  font-size: 14px;
  color: #777;
  line-height: 1.4;
  max-width: 260px;
`;

const GoDiagnosisBtn = styled.button`
  margin-top: 6px;
  padding: 10px 18px;
  background: linear-gradient(135deg, #6d8dff 0%, #89a8ff 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0,0,0,0.12);
`;

const toEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("embed")) return url;
  if (url.includes("youtu.be")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
};

/* ---------------------------------------------------
레벨 & 카테고리 한국어 변환
--------------------------------------------------- */
const translateLevel = (level: string) => {
  const map: any = {
    BEGINNER: "초급",
    INTERMEDIATE: "중급",
    ADVANCED: "고급",
  };
  return map[level] || level;
};

const translateCategory = (category: string) => {
  const map: any = {
    CONCENTRATION: "집중력",
    CLARITY: "명확성",
    FLUENCY: "유창성",
  };
  return map[category] || category;
};

const LearningPage = () => {
  const navigate = useNavigate();
  const [programList, setProgramList] = useState<any[]>([]);
  const [tab, setTab] = useState("word");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get("/program");
        setProgramList(res.data.data || []);
      } catch {
        setProgramList([]);
      }
    };
    load();
  }, []);

  // LEVEL 그룹화
  const levelGroups: any = {};
  programList.forEach((p) => {
    if (!levelGroups[p.level]) levelGroups[p.level] = [];
    levelGroups[p.level].push(p);
  });

  const renderProgramCards = (level: string, items: any[]) => (
    <Card key={level}>
      <SectionTitle>추천 학습 ({translateLevel(level)})</SectionTitle>

      <HorizontalScroll>
        {items.map((item) => (
          <ProgramCard key={item.id}>
            <Video src={toEmbedUrl(item.videoUrl)} allowFullScreen />

            <MetaRow>
              <span style={{ color: "#7595D3" }}>
                {translateCategory(item.category)}
              </span>
              <span>| {translateLevel(item.level)}</span>
            </MetaRow>

            <ProgramTitle>{translateCategory(item.category)}</ProgramTitle>
            <Description>{item.description}</Description>
          </ProgramCard>
        ))}
      </HorizontalScroll>
    </Card>
  );

  return (
    <Outer>
      <Wrapper>

        {/* 빈 상태 */}
        {programList.length === 0 && (
          <Card>
            <EmptyState>
              <EmptyTitle>아직 발달 진단을 하지 않았어요</EmptyTitle>
              <EmptyText>
                진단을 진행하면 우리 아이에게 꼭 맞는 추천 학습 영상을 제공해드려요 😊
              </EmptyText>
              <GoDiagnosisBtn
                onClick={() =>
                  (window.location.href = "https://ai-talkk.netlify.app/diagnosis")
                }
              >
                발달 진단 하러가기
              </GoDiagnosisBtn>
            </EmptyState>
          </Card>
        )}

        {/* 추천 학습 카드 */}
        {Object.keys(levelGroups).map((lv) => renderProgramCards(lv, levelGroups[lv]))}

        {/* 탭 */}
        <Tabs>
          <TabButton active={tab === "word"} onClick={() => setTab("word")}>
            그림 카드
          </TabButton>
          <TabButton active={tab === "sentence"} onClick={() => setTab("sentence")}>
            문장 연습
          </TabButton>
          <TabButton active={tab === "story"} onClick={() => setTab("story")}>
            스토리북
          </TabButton>
        </Tabs>

        {/* 탭 내용 */}
        {tab === "word" && (
          <Card>
            <SectionTitle>그림 카드</SectionTitle>
            <SimpleDesc>단어의 의미를 정확히 이해하고 말하는 연습을 해요.</SimpleDesc>
            <ButtonRow>
              <StartBtn onClick={() => navigate('/learning/word')}>학습하기</StartBtn>
            </ButtonRow>
          </Card>
        )}

        {tab === "sentence" && (
          <Card>
            <SectionTitle>문장 따라 말하기</SectionTitle>
            <SimpleDesc>문장을 듣고 따라 말하며 유창성을 키워요.</SimpleDesc>
            <ButtonRow>
              <StartBtn onClick={() => navigate('/learning/sentence')}>학습하기</StartBtn>
            </ButtonRow>
          </Card>
        )}

        {tab === "story" && (
          <Card>
            <SectionTitle>미니 스토리북</SectionTitle>
            <SimpleDesc>짧은 이야기를 읽으며 문맥 속 표현을 익혀요.</SimpleDesc>
            <ButtonRow>
              <StartBtn onClick={() => navigate('/learning/story')}>학습하기</StartBtn>
            </ButtonRow>
          </Card>
        )}

      </Wrapper>
    </Outer>
  );
};

export default LearningPage;
