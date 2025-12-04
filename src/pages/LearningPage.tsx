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
  font-weight: 500;
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

const LearningPage = () => {
  const navigate = useNavigate();

  const [programList, setProgramList] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axiosInstance.get("/program");
        setProgramList(res.data.data); 
      } catch (err) {
        console.error("프로그램 목록 불러오기 실패:", err);
      }
    };

    fetchPrograms();
  }, []);

  const levelGroups: any = {};
  programList.forEach((p) => {
    if (!levelGroups[p.level]) levelGroups[p.level] = [];
    levelGroups[p.level].push(p);
  });

  const renderProgramCards = (level: string, items: any[]) => (
    <Card>
      <SectionTitle>추천 학습 ({level})</SectionTitle>

      <HorizontalScroll>
        {items.map((item) => (
          <ProgramCard key={item.id}>
            <Video src={item.videoUrl} allowFullScreen />
            <MetaRow>
              <span style={{ color: '#7595D3' }}>{item.category}</span>
            </MetaRow>
            <ProgramTitle>{item.category}</ProgramTitle>
            <Description>{item.description}</Description>
          </ProgramCard>
        ))}
      </HorizontalScroll>
    </Card>
  );

  return (
    <Outer>
      <Wrapper>

        {Object.keys(levelGroups).map((level) =>
          renderProgramCards(level, levelGroups[level])
        )}

        <Card>
          <SectionTitle>그림 카드</SectionTitle>
          <SimpleDesc>
            단어의 의미를 명확하게 이해하고 이름을 정확히 말하는 연습을 해요.
          </SimpleDesc>
          <ButtonRow>
            <StartBtn onClick={() => navigate('/learning/word')}>학습하기</StartBtn>
          </ButtonRow>
        </Card>

        <Card>
          <SectionTitle>문장 따라 말하기</SectionTitle>
          <SimpleDesc>
            자연스러운 문장 구조를 듣고 따라 말하며 유창성을 키워요.
          </SimpleDesc>
          <ButtonRow>
            <StartBtn onClick={() => navigate('/learning/sentence')}>학습하기</StartBtn>
          </ButtonRow>
        </Card>

        <Card>
          <SectionTitle>미니 스토리북</SectionTitle>
          <SimpleDesc>
            짧은 이야기를 읽으며 문맥 속에서 단어와 표현을 익혀요.
          </SimpleDesc>
          <ButtonRow>
            <StartBtn onClick={() => navigate('/learning/story')}>학습하기</StartBtn>
          </ButtonRow>
        </Card>

      </Wrapper>
    </Outer>
  );
};

export default LearningPage;
