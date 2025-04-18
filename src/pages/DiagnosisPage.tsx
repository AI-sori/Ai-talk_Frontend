import styled from "styled-components";

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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  font-family: ExtraBold;
  margin-bottom: 1rem;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 150px;
  background: #e0e0e0;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: 10px;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 1.5rem;
  font-family: Regular;
`;

const StepList = styled.ul`
  font-size: 14px;
  font-family: Regular;
  margin-bottom: 1.5rem;
  padding: 0;
`;

const StepItem = styled.li`
  background: #f4f6ff;
  border-radius: 12px;
  padding: 0.8rem 1rem;
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  font-family: Regular;
  gap: 0.8rem;

  &::before {
    content: counter(step);
    counter-increment: step;
    background: #c9e6ff;
    color: #6485cf;
    font-weight: bold;
    font-size: 13px;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StartButton = styled.button`
  width: 100%;
  background-color: #94b5e9;
  color: white;
  font-size: 15px;
  font-family: SemiBold;
  padding: 0.8rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #7ca9e0;
  }
`;

const DevelopmentalDiagnosisPage = () => {
  return (
    <Outer>
      <Wrapper>
        <Card>
          <SectionTitle>시선추적 테스트 시뮬레이션</SectionTitle>
          <ImageBox>300 × 150</ImageBox>
          <Description>
            시선추적 테스트는 아이의 시선 움직임을 분석하여 발달 상태를 진단하는 테스트입니다.
          </Description>
          <StepList>
            <StepItem>화면에 나타나는 점을 응시해주세요</StepItem>
            <StepItem>총 5개의 점이 순차적으로 표시됩니다</StepItem>
            <StepItem>모든 점을 응시하면 테스트가 완료됩니다</StepItem>
          </StepList>
          <StartButton>시작하기</StartButton>
        </Card>
      </Wrapper>
    </Outer>
  );
};

export default DevelopmentalDiagnosisPage;
