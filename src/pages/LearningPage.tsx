import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

  const levelRecommend = [
    {
      id: 'L1',
      title: 'Level 2 추천 | 말 따라하기 리듬훈련',
      type: '언어발달',
      duration: 5,
      videoUrl: 'https://www.youtube.com/embed/y6120QOlsfU',
      description: '집중력 향상 + 언어 리듬 인지 훈련 영상',
    },
    {
      id: 'L2',
      title: 'Level 2 추천 | 스토리 기반 단어 확장',
      type: '어휘',
      duration: 6,
      videoUrl: 'https://www.youtube.com/embed/MB5IX-np5fE',
      description: '스토리를 통해 단어를 자연스럽게 습득해요',
    },
  ];

  const renderProgramCards = (title: string, items: any[]) => (
    <Card>
      <SectionTitle>{title}</SectionTitle>
      <HorizontalScroll>
        {items.map((item) => (
          <ProgramCard key={item.id}>
            <Video src={item.videoUrl} allowFullScreen />
            <MetaRow>
              <span style={{ color: '#7595D3' }}>{item.type}</span>
              <span>{item.duration}분</span>
            </MetaRow>
            <ProgramTitle>{item.title}</ProgramTitle>
            <Description>{item.description}</Description>
          </ProgramCard>
        ))}
      </HorizontalScroll>
    </Card>
  );

  return (
    <Outer>
      <Wrapper>

        {renderProgramCards('추천 학습 (레벨 2)', levelRecommend)}

        <Card>
          <SectionTitle>그림 카드</SectionTitle>
          <SimpleDesc>
            단어의 의미를 명확하게 이해하고 이름을 정확히 말하는 연습을 해요.
          </SimpleDesc>

          <ButtonRow>
            <StartBtn onClick={() => navigate('/learning/word')}>
              학습하기 
            </StartBtn>
          </ButtonRow>
        </Card>

        <Card>
          <SectionTitle>문장 따라 말하기</SectionTitle>
          <SimpleDesc>
            자연스러운 문장 구조를 듣고 따라 말하며 유창성을 키워요.
          </SimpleDesc>

          <ButtonRow>
            <StartBtn onClick={() => navigate('/learning/sentence')}>
              학습하기 
            </StartBtn>
          </ButtonRow>
        </Card>

        <Card>
          <SectionTitle>미니 스토리북</SectionTitle>
          <SimpleDesc>
            짧은 이야기를 읽으며 문맥 속에서 단어와 표현을 익혀요.
          </SimpleDesc>

          <ButtonRow>
            <StartBtn onClick={() => navigate('/learning/story')}>
              학습하기 
            </StartBtn>
          </ButtonRow>
        </Card>

      </Wrapper>
    </Outer>
  );
};

export default LearningPage;
