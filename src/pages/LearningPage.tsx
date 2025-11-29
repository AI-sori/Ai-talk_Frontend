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

const SentenceText = styled.div`
  font-size: 17px;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
`;

const StoryImage = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 14px;
  background: #eef1f6;
  margin-bottom: 1rem;
`;

const StoryText = styled.div`
  font-size: 15px;
  line-height: 1.4;
  color: #444;
  text-align: center;
  margin-bottom: 1rem;
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

  // -----------------------------
  // ① 추천 영상 더미데이터
  // -----------------------------
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


  // -----------------------------
  // 🔥 ② 명확성 학습 : 그림 카드
  // -----------------------------
  const wordCards = [
    { image: '/assets/dog.png', word: '강아지' },
    { image: '/assets/apple.png', word: '사과' },
    { image: '/assets/car.png', word: '자동차' },
  ];

  const [wordIndex, setWordIndex] = useState(0);

  const nextWord = () => {
    setWordIndex((prev) => (prev + 1) % wordCards.length);
  };


  // -----------------------------
  // 🔥 ③ 유창성 학습 : 문장 따라 말하기
  // -----------------------------
  const sentences = [
    "강아지가 공을 가지고 놀아요.",
    "사과가 빨갛게 익었어요.",
    "자동차가 길을 달리고 있어요."
  ];

  const [sentenceIndex, setSentenceIndex] = useState(0);

  const nextSentence = () => {
    setSentenceIndex((prev) => (prev + 1) % sentences.length);
  };


  // -----------------------------
  // 🔥 ④ 읽기 학습 : 미니 스토리북
  // -----------------------------
  const storyPages = [
    { text: "강아지는 아침마다 정원에서 산책을 해요." },
    { text: "그러다 예쁜 빨간 공을 발견했어요." },
    { text: "강아지는 신나게 공을 가지고 놀기 시작했어요!" },
  ];

  const [storyIndex, setStoryIndex] = useState(0);

  const nextStory = () => {
    setStoryIndex((prev) => (prev + 1) % storyPages.length);
  };

  const prevStory = () => {
    setStoryIndex((prev) => (prev - 1 + storyPages.length) % storyPages.length);
  };


  return (
    <Outer>
      <Wrapper>

        {/* ---------------------- */}
        {/* 🔥 추천 학습 섹션 */}
        {/* ---------------------- */}
        {renderProgramCards('추천 학습 (레벨 2)', levelRecommend)}

        {/* ---------------------- */}
        {/* 🔥 명확성 학습 : 그림 카드 */}
        {/* ---------------------- */}
        <Card>
          <SectionTitle>그림 카드</SectionTitle>

          <ImageBox>
            <img 
              src={wordCards[wordIndex].image} 
              alt=""
              style={{ width: "85%" }}
            />
          </ImageBox>

          <WordText>{wordCards[wordIndex].word}</WordText>

          <ButtonRow>
            <Btn onClick={() => alert("발음 재생 (추후 연결 가능)")}>발음 듣기 🔊</Btn>
            <Btn onClick={() => alert("따라 말하기 기능")}>따라 말하기 🎤</Btn>
            <Btn onClick={nextWord}>다음 카드 ➜</Btn>
          </ButtonRow>
        </Card>


        {/* ---------------------- */}
        {/* 🔥 유창성 학습 : 문장 따라 말하기 */}
        {/* ---------------------- */}
        <Card>
          <SectionTitle>문장 따라 말하기</SectionTitle>

          <SentenceText>{sentences[sentenceIndex]}</SentenceText>

          <ButtonRow>
            <Btn onClick={() => alert("문장 듣기 🔊")}>듣기 🔊</Btn>
            <Btn onClick={() => alert("따라 말하기 🎤")}>말하기 🎤</Btn>
            <Btn onClick={nextSentence}>다음 문장 ➜</Btn>
          </ButtonRow>
        </Card>


        {/* ---------------------- */}
        {/* 🔥 읽기 학습 : 미니 스토리북 */}
        {/* ---------------------- */}
        <Card>
          <SectionTitle>미니 스토리북</SectionTitle>

          <StoryImage />
          <StoryText>{storyPages[storyIndex].text}</StoryText>

          <ButtonRow>
            <Btn onClick={prevStory}>⬅ 이전</Btn>
            <Btn onClick={nextStory}>다음 ➜</Btn>
          </ButtonRow>
        </Card>

      </Wrapper>
    </Outer>
  );
};

export default LearningPage;
