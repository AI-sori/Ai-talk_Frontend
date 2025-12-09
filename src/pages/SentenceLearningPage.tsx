import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackSvg from "../assets/community/Back.svg";

const Container = styled.div`
  width: 100vw;
  min-height: 100dvh;
  background: #f9f9f9;
  padding: 0rem;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 380px;
`;

const Back = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 19px;
  border: none;
  background: transparent;
  margin-bottom: 1rem;
  margin-top: 10px;
  cursor: pointer;
  font-weight: bold;
  margin-left: -20px;

  &:focus {
    outline: none;
  }
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1.2rem;
`;

const SentenceBox = styled.div`
  width: 100%;
  margin: 2rem 0 1.5rem 0;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  background: none;   
  padding: 0;         
  border: none;       
  box-shadow: none; 
`;

const BtnRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  margin-top: 1rem;
`;

const Btn = styled.button`
  flex: 1;
  padding: 12px 0;
  border-radius: 12px;
  border: none;
  font-size: 15px;
  background: #e8eeff;
  color: #4a68a1;
  font-weight: 600;
`;

const Result = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 15px;
`;

const AccuracyBox = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #666;
`;

const StoryLearningPage = () => {
  const navigate = useNavigate();

const storyPages = [
  "강아지는 아침마다 정원에서 산책을 해요.",
  "그러다 예쁜 빨간 공을 발견했어요.",
  "강아지는 신나게 공을 가지고 놀기 시작했어요!",
  "공을 굴리며 정원을 빠르게 달렸어요.",
  "그러다 공이 큰 나무 뒤로 굴러가 버렸어요.",
  "강아지는 공을 찾으려고 이리저리 살펴보았어요.",
  "마침내 나무 아래에서 공을 발견했어요!",
  "강아지는 다시 공을 물고 집 쪽으로 걸어갔어요.",
  "집 앞에서 주인이 강아지를 반갑게 맞아주었어요.",
  "강아지는 즐거운 마음으로 공놀이를 마쳤어요."
];


  const [index, setIndex] = useState(0);
  const [spoken, setSpoken] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalTry, setTotalTry] = useState(0);

  const accuracy =
    totalTry === 0 ? 0 : Math.round((correctCount / totalTry) * 100);

  const next = () => {
    setSpoken("");
    setIsCorrect(null);
    setIndex((prev) => (prev + 1) % storyPages.length);
  };

  const prev = () => {
    setSpoken("");
    setIsCorrect(null);
    setIndex((prev) => (prev - 1 + storyPages.length) % storyPages.length);
  };

  const speak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ko-KR";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const startRecognition = () => {
    const Recognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!Recognition) {
      alert("음성 인식을 지원하지 않는 브라우저입니다.");
      return;
    }

    const rec = new Recognition();
    rec.lang = "ko-KR";
    rec.interimResults = false;
    rec.start();

    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setSpoken(text);

      const answer = storyPages[index];
      const success = text.includes(answer);

      setTotalTry((prev) => prev + 1);

      if (success) {
        setCorrectCount((prev) => prev + 1);
        setIsCorrect(true);
        setTimeout(() => next(), 700);
      } else {
        setIsCorrect(false);
      }
    };
  };

  return (
    <Container>
      <Inner>
          <Back onClick={() => navigate(-1)}>
            <img src={BackSvg} width={20} />
            뒤로 가기
          </Back>
        <Card>

          <Title>문장 학습</Title>

          <SentenceBox>{storyPages[index]}</SentenceBox>

          <BtnRow>
            <Btn onClick={prev}>이전</Btn>
            <Btn onClick={() => speak(storyPages[index])}>듣기 🔊</Btn>
            <Btn onClick={startRecognition}>말하기 🎤</Btn>
            <Btn onClick={next}>다음</Btn>
          </BtnRow>

          {spoken && (
            <Result style={{ color: isCorrect ? "green" : "red" }}>
              {isCorrect ? "🎉 정답이에요!" : "다시 말해볼까요?"}
              <br />
              인식된 말: {spoken}
            </Result>
          )}

          <AccuracyBox>
            정답률: {accuracy}% ({correctCount} / {totalTry})
          </AccuracyBox>
        </Card>
      </Inner>
    </Container>
  );
};

export default StoryLearningPage;
