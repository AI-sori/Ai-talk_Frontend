import styled from "styled-components";
import { useState, useEffect } from "react";
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
  margin-bottom: 1.2rem;
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
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1.2rem;
`;

const CountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 1rem;
`;

const CountBtn = styled.button`
  padding: 12px 0;
  background: #e8eeff;
  color: #4a68a1;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 200px;
  background: #eef1f6;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const WordText = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 1.5rem;
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


// -------------------------------
// 단어 풀 (최대 50개 확장 가능)
// -------------------------------
const WORD_POOL = [
  { text: "강아지", image: "https://images.unsplash.com/photo-1517849845537-4d257902454a" },
  { text: "고양이", image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131" },
  { text: "동물", image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b" },
  { text: "밤", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba" },
  

  { text: "사과", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce" },
 

  { text: "자동차", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70" },
  { text: "바다", image: "https://images.unsplash.com/photo-1506812574058-fc75fa93fead" },
  { text: "요트", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090" },

  
  { text: "가방", image: "https://images.unsplash.com/photo-1522199710521-72d69614c702" },
 
  { text: "접시", image: "https://images.unsplash.com/photo-1505578742831-13f74a1b6a8a" },
  { text: "숟가락", image: "https://images.unsplash.com/photo-1514228742587-6b1558f39a54" },
  { text: "포크", image: "https://images.unsplash.com/photo-1514996937319-344454492b37" },
  { text: "의자", image: "https://images.unsplash.com/photo-1503602642458-232111445657" },

  { text: "책", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" },
  { text: "공책", image: "https://images.unsplash.com/photo-1473186505569-9c61870c11f9" },
  { text: "가위", image: "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d" },

  { text: "나무", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
  { text: "꽃", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6" },
  { text: "도로", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
  { text: "바다", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { text: "산", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e" },

  { text: "쿠키", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e" },

  { text: "핸드폰", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
  { text: "시계", image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92" },
  { text: "컴퓨터", image: "https://images.unsplash.com/photo-1518770660439-4636190af475" },
  { text: "텔레비전", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952" },
  { text: "카메라", image: "https://images.unsplash.com/photo-1519183071298-a2962be96a06" }
];


const WordLearningPage = () => {
  const navigate = useNavigate();

  const [selectedCount, setSelectedCount] = useState<number | null>(null);

  const [index, setIndex] = useState(0);
  const [spoken, setSpoken] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [totalTry, setTotalTry] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const words = selectedCount ? WORD_POOL.slice(0, selectedCount) : [];

  const accuracy = totalTry === 0 ? 0 : Math.round((correctCount / totalTry) * 100);

  useEffect(() => {
    if (accuracy >= 70 && totalTry >= 3) {
      setTimeout(() => navigate("/learning/sentence"), 800);
    }
  }, [accuracy, totalTry]);

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
      <Inner>

        <Card>
          
        <Back onClick={() => navigate(-1)}>
          <img src={BackSvg} width={20} />
          뒤로 가기
        </Back>
          <Title>그림 카드 학습</Title>

          {selectedCount === null && (
            <>
              <div style={{ fontSize: "16px", color: "#555", marginBottom: "1rem" }}>
                학습할 단어 개수를 선택하세요
              </div>

              <CountGrid>
                {[10, 20, 30].map((cnt) => (
                  <CountBtn key={cnt} onClick={() => setSelectedCount(cnt)}>
                    {cnt}개
                  </CountBtn>
                ))}
              </CountGrid>
            </>
          )}

          {/* ✨ STEP 2: 학습 UI */}
          {selectedCount !== null && (
            <>
              <ImageBox>
                <img
                  src={words[index].image}
                  style={{ width: "70%", objectFit: "contain" }}
                />
              </ImageBox>

              <WordText>{words[index].text}</WordText>

             <BtnRow>
  <Btn 
    onClick={() => {
      setSpoken("");
      setIsCorrect(null);
      setIndex((prev) => (prev - 1 + words.length) % words.length);
    }}
  >
    이전
  </Btn>

  <Btn onClick={() => speak(words[index].text)}>듣기 🔊</Btn>
  <Btn onClick={startRecognition}>말하기 🎤</Btn>

  <Btn onClick={next}>
    다음 
  </Btn>
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
            </>
          )}
        </Card>
      </Inner>
    </Container>
  );
};

export default WordLearningPage;
