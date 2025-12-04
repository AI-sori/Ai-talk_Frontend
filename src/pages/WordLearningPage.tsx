import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

const ImageBox = styled.div`
  width: 100%;
  height: 200px;
  background: #eef1f6;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const WordText = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 1.5rem;
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

const WordLearningPage = () => {
  const navigate = useNavigate();

  const words = [
    { image: "/assets/dog.png", text: "강아지" },
    { image: "/assets/apple.png", text: "사과" },
    { image: "/assets/car.png", text: "자동차" },
  ];

  const [index, setIndex] = useState(0);
  const [spoken, setSpoken] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [totalTry, setTotalTry] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const accuracy = totalTry === 0 ? 0 : Math.round((correctCount / totalTry) * 100);

  useEffect(() => {
    if (accuracy >= 70 && totalTry >= 3) {
      setTimeout(() => {
        navigate("/learning/sentence");
      }, 1000);
    }
  }, [accuracy, totalTry, navigate]);

  const next = () => {
    setSpoken("");
    setIsCorrect(null);
    setIndex((prev) => (prev + 1) % words.length);
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

      const answer = words[index].text;
      const success = text.includes(answer);

      setTotalTry((prev) => prev + 1);
      if (success) {
        setCorrectCount((prev) => prev + 1);
        setIsCorrect(true);
        setTimeout(() => next(), 600);
      } else {
        setIsCorrect(false);
      }
    };
  };

  return (
    <Container>
      <Card>
        <Title>그림 카드 학습</Title>

        <ImageBox>
          <img src={words[index].image} style={{ width: "80%" }} />
        </ImageBox>

        <WordText>{words[index].text}</WordText>

        <BtnRow>
          <Btn onClick={() => speak(words[index].text)}>듣기 🔊</Btn>
          <Btn onClick={startRecognition}>말하기 🎤</Btn>
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
            <div style={{ color: "#4a68a1", marginTop: "6px" }}>
              난이도가 올라갑니다! 문장 학습으로 이동 중...
            </div>
          )}
        </AccuracyBox>
      </Card>
    </Container>
  );
};

export default WordLearningPage;
