import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
  width: 100vw;
  min-height: 100dvh;
  background: #f9f9f9;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Card = styled.div`
  max-width: 420px;
  margin: 0 auto;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1.2rem;
`;

const StoryImg = styled.div`
  width: 100%;
  height: 160px;
  background: #eef1f6;
  border-radius: 16px;
  margin-bottom: 1rem;
`;

const StoryText = styled.div`
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 1.2rem;
`;

const Result = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 15px;
`;

const AccuracyBox = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 14px;
  color: #666;
`;

const BtnRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Btn = styled.button`
  padding: 10px 16px;
  border-radius: 12px;
  border: none;
  font-size: 15px;
  background: #e8eeff;
  color: #4a68a1;
`;

const StoryLearningPage = () => {
  const storyPages = [
    "강아지는 아침마다 정원에서 산책을 해요.",
    "그러다 예쁜 빨간 공을 발견했어요.",
    "강아지는 신나게 공을 가지고 놀기 시작했어요!",
  ];

  const [index, setIndex] = useState(0);
  const [spoken, setSpoken] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalTry, setTotalTry] = useState(0);

  const accuracy = totalTry === 0 ? 0 : Math.round((correctCount / totalTry) * 100);

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
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("음성 인식을 지원하지 않는 브라우저입니다.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.start();

    recognition.onresult = (e: any) => {
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
      <Card>
        <Title>스토리 학습</Title>

        <StoryImg />

        <StoryText>{storyPages[index]}</StoryText>

        <BtnRow>
          <Btn onClick={() => speak(storyPages[index])}>듣기 🔊</Btn>
          <Btn onClick={startRecognition}>말하기 🎤</Btn>
          <Btn onClick={prev}>⬅ 이전</Btn>
          <Btn onClick={next}>다음 ➜</Btn>
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
          {accuracy >= 70 && totalTry >= 3 && (
            <div style={{ marginTop: 6, color: "#4a68a1" }}>
              잘했어요! 스토리 이해력이 좋아지고 있어요!
            </div>
          )}
        </AccuracyBox>
      </Card>
    </Container>
  );
};

export default StoryLearningPage;
