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
  font-size: 16px;
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
  "강아지는 아침마다 주인이 열어주는 문을 통해 정원으로 나가요. 상쾌한 공기를 맡으며 천천히 주변을 살피고, 어제와 달라진 것이 있는지 꼬리를 흔들며 둘러봐요.",

  "정원을 걷던 강아지는 잔디 사이에서 반짝이는 빨간 공을 발견했어요. 햇빛에 반사되어 유난히 선명하게 보이는 공이 강아지의 관심을 끌었어요.",

  "강아지는 호기심 가득한 눈빛으로 공을 톡 건드렸어요. 공이 멀리 굴러가자 강아지는 신나게 뛰어가며 공을 다시 가져왔어요.",

  "강아지는 공을 물고 이리저리 흔들며 놀기 시작했어요. 가끔은 공을 공중으로 던지고 다시 받으려고 점프도 했어요. 정말 즐거운 시간이었어요.",

  "하지만 공은 점점 빠르게 굴러가 큰 나무 뒤로 숨어버렸어요. 강아지는 놀라 멈춰 섰지만, 금방 용기를 내어 공을 찾기 위해 나무 뒤로 갔어요.",

  "나무 뒤에는 작은 나뭇가지와 꽃잎들이 흩어져 있었어요. 강아지는 코를 킁킁대며 열심히 냄새를 따라 공의 위치를 찾기 시작했어요.",

  "마침내 나무 밑 그늘에서 빨간 공을 발견했어요! 강아지는 꼬리를 크게 흔들며 공을 앞발로 잡고, 다시 밝은 곳으로 공을 굴리며 나왔어요.",

  "강아지는 다시 정원 한복판으로 돌아와 공을 굴리며 뛰어다녔어요. 햇살이 따뜻하게 강아지를 비추고, 바람도 살짝 불어 기분 좋은 시간이 이어졌어요.",

  "놀다 지친 강아지는 공을 입에 물고 집 쪽으로 천천히 걸어갔어요. 집 앞에서는 주인이 미소를 지으며 강아지를 반겨주었어요.",

  "강아지는 주인의 손길을 느끼며 오늘 하루의 즐거운 놀이를 마무리했어요. 빨간 공은 강아지의 새로운 보물처럼 소중하게 느껴졌어요."
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
    const R =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!R) {
      alert("음성 인식을 지원하지 않는 브라우저입니다.");
      return;
    }

    const rec = new R();
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
          <Title>스토리 학습</Title>

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
