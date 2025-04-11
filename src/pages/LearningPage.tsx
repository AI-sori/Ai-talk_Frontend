import styled from 'styled-components';

const Page = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
  background: #f7f9fb;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  font-family: SemiBold;
  font-size: 18px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

const SectionTitle = styled.h3`
  font-family: SemiBold;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ProgressRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProgressItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.span`
  font-weight: 500;
  width: 80px;
  font-family: SemiBold;
  font-size: 17px;
`;

const Gauge = styled.div`
  flex: 1;
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  margin: 0 1rem;
  position: relative;
`;

const Fill = styled.div<{ color: string; percent: number }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  background: ${({ color }) => color};
  border-radius: 5px;
`;

const Percent = styled.span`
  font-size: 13px;
  font-weight: bold;
`;

const ProgramCard = styled.div`
  background: #f7f7fb;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const Thumbnail = styled.div<{ color?: string }>`
  height: 160px;
  background: ${({ color }) => color || '#dcdcff'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 14px;
  font-weight: 500;
   font-family: SemiBold;
  color: #777;
  padding: 0.8rem 1rem 0 1rem;
`;

const ProgramTitle = styled.div`
  font-size: 15px;
  font-family: SemiBold;
  font-weight: bold;
  padding: 0.3rem 1rem 0 1rem;
`;

const Description = styled.div`
  font-size: 14px;
   font-family: SemiBold;
  color: #666;
  padding: 0.3rem 1rem 1rem 1rem;
`;

const LearningPage = () => {
  return (
    <Page>
      {/* 진단 기반 학습 카드 */}
      <Card>
        <SectionTitle>진단 결과 기반 맞춤 학습</SectionTitle>
        <ProgressRow>
          <ProgressItem>
            <Label>언어발달</Label>
            <Gauge>
              <Fill color="#6495cf" percent={75} />
            </Gauge>
            <Percent>75%</Percent>
          </ProgressItem>
          <ProgressItem>
            <Label>인지발달</Label>
            <Gauge>
              <Fill color="#6f3bd8" percent={85} />
            </Gauge>
            <Percent>85%</Percent>
          </ProgressItem>
        </ProgressRow>
      </Card>

      {/* 언어발달 콘텐츠 */}
      <Card>
        <SectionTitle>언어발달</SectionTitle>

        <ProgramCard>
          <Thumbnail>240 × 160</Thumbnail>
          <MetaRow>
            <span style={{ color: '#6485cf' }}>동영상</span>
            <span>15분</span>
            <span>초급</span>
          </MetaRow>
          <ProgramTitle>단어 카드 놀이와 함께하는 읽기</ProgramTitle>
          <Description>시선 추적 결과를 반영한 맞춤 추천</Description>
        </ProgramCard>

        <ProgramCard>
          <Thumbnail>240 × 160</Thumbnail>
          <MetaRow>
            <span style={{ color: '#6485cf' }}>동영상</span>
            <span>20분</span>
            <span>중급</span>
          </MetaRow>
          <ProgramTitle>소리내어 읽기 연습</ProgramTitle>
          <Description>읽기 속도 향상에 도움</Description>
        </ProgramCard>
      </Card>

      {/* 인지발달 콘텐츠 */}
      <Card>
        <SectionTitle>인지발달</SectionTitle>

        <ProgramCard>
          <Thumbnail color="#d8caff">240 × 160</Thumbnail>
          <MetaRow>
            <span style={{ color: '#6f3bd8' }}>동영상</span>
            <span>15분</span>
            <span>초급</span>
          </MetaRow>
          <ProgramTitle>그림으로 이해하는 수학</ProgramTitle>
          <Description>시각적 학습 선호도 반영</Description>
        </ProgramCard>

        <ProgramCard>
          <Thumbnail color="#d8caff">240 × 160</Thumbnail>
          <MetaRow>
            <span style={{ color: '#6f3bd8' }}>동영상</span>
            <span>25분</span>
            <span>중급</span>
          </MetaRow>
          <ProgramTitle>패턴 찾기 놀이</ProgramTitle>
          <Description>논리력 향상 추천</Description>
        </ProgramCard>
      </Card>
    </Page>
  );
};

export default LearningPage;
