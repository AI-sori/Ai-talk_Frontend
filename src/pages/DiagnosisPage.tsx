import styled from 'styled-components';

const PageWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100dvh;  /* 화면 높이 100% */
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
  overflow-y: auto;  /* 스크롤 생기지 않게 처리 */
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Image = styled.div`
  width: 300px;
  height: 150px;
  background: #dcdcdc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-size: 18px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 1.5rem;
`;

const Steps = styled.div`
  font-size: 14px;
  margin-bottom: 1.5rem;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StepNumber = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #6485cf;
  margin-right: 0.5rem;
`;

const StepDescription = styled.span`
  color: #555;
`;

const StartButton = styled.button`
  background-color: #6485cf;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 1.5rem;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #5078a3;
  }
`;

const DevelopmentalDiagnosisPage = () => {
  return (
    <PageWrapper>
      {/* 시선추적 테스트 카드 */}
      <Card>
        <SectionTitle>시선추적 테스트 시뮬레이션</SectionTitle>
        <Image>300 × 150</Image>
        <Description>
          시선추적 테스트는 아이의 시선 움직임을 분석하여 발달 상태를 진단하는 테스트입니다.
        </Description>

        <Steps>
          <Step>
            <StepNumber>1</StepNumber>
            <StepDescription>화면에 나타나는 점을 응시해 주세요</StepDescription>
          </Step>
          <Step>
            <StepNumber>2</StepNumber>
            <StepDescription>총 5개의 점이 순차적으로 표시됩니다</StepDescription>
          </Step>
          <Step>
            <StepNumber>3</StepNumber>
            <StepDescription>모든 점을 응시하면 테스트가 완료됩니다</StepDescription>
          </Step>
        </Steps>

        <StartButton>시작하기</StartButton>
      </Card>
    </PageWrapper>
  );
};

export default DevelopmentalDiagnosisPage;
