import styled from 'styled-components';
import { useState } from 'react';

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
  color: black;
`;

const SectionTitle = styled.h3`
  font-family: Bold;
  font-size: 18px;
  margin-bottom: 1rem;
  color: black;
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

const LearningSection = styled.div`
  margin-top: 1.5rem;
`;

const CardBox = styled.div`
  width: 100%;
  background: white;
  border-radius: 16px;
  padding: 1.3rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05);
`;

const ImageBox = styled.div`
  width: 100%;
  height: 160px;
  background: #f3f4f6;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WordText = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.8rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Btn = styled.button`
  padding: 8px 14px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
  background: #e8eeff;
  color: #4a68a1;
`;

const LearningPage = () => {
  // 🔹 레벨 추천 더미데이터
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
        {items.map(item => (
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

  // 🔹 학습 카드 영역
  const dummyWord = {
    image: '/assets/dog.png', // 실제 프로젝트에 맞게 교체
    word: '강아지',
    sentence: '강아지가 뛰어요.',
  };

  return (
    <Outer>
      <Wrapper>

        {/* 🔥 ① 추천 학습 (레벨 기반) */}
        {renderProgramCards('추천 학습 (레벨 2)', levelRecommend)}

        {/* 🔥 ③ 실제 학습 (그림·단어·문장) */}
        <LearningSection>
          <SectionTitle>오늘의 그림 카드</SectionTitle>

          <CardBox>
            <ImageBox>
              <img src={dummyWord.image} alt="" style={{ width: '85%' }} />
            </ImageBox>
            <WordText>{dummyWord.word}</WordText>

            <ButtonRow>
              <Btn>발음 듣기 🔊</Btn>
              <Btn>따라 말하기 🎤</Btn>
            </ButtonRow>
          </CardBox>
        </LearningSection>

      </Wrapper>
    </Outer>
  );
};

export default LearningPage;
