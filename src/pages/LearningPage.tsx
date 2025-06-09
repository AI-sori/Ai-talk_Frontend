import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

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

// 공통 카드 스타일
const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
   color: black;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

// 타이틀
const SectionTitle = styled.h3`
  font-family: Bold;
  font-size: 18px;
   color: black;
  margin-bottom: 1rem;
`;

// 진행중인 학습 카드 컴포넌트 (섹션)
const OngoingCard = styled.div`
  background: #F8FAFC;
  border-radius: 14px;
  display: flex;
   color: black;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;

const ThumbnailBox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
`;

const InfoBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
`;

const Tag = styled.span`
  background: #E9F0FF;
  color: #7595D3;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
`;

const TimeText = styled.span`
  font-size: 13px;
  color: #999;
`;

const OngoingTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
   color: black;
  margin-bottom: 0.4rem;
`;

const OngoingBar = styled.div`
  height: 6px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
`;

const OngoingFill = styled.div`
  height: 100%;
  width: 60%; /* 예시 진행도 */
  background: #9FC9FF;
`;

// 추천 영상 섹션 스타일
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

const LearningPage = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axiosInstance.get('/program');
        console.log('/program 응답 데이터:', response.data);
        setPrograms(response.data);
      } catch (error) {
        console.error('프로그램 데이터를 불러오는 중 오류 발생:', error);
      }
    };
    fetchPrograms();
  }, []);

  const filterByCategory = (category: string) =>
    programs.filter((item: any) => item.category === category);

  const renderProgramCards = (category: string) => {
    const filtered = filterByCategory(category);
    return (
      <Card>
        <SectionTitle>{category}</SectionTitle>
        <HorizontalScroll>
          {filtered.map((item: any) => (
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
  };

  return (
    <Outer>
      <Wrapper>
        {/* 진행중인 학습*/}
        <Card>
          <SectionTitle>진행중인 학습</SectionTitle>
          <OngoingCard>
            <ThumbnailBox>
              <iframe
                width="80"
                height="80"
                src="https://www.youtube.com/embed/P2zGhgMYyrA?si=jh3LMiiTI5j3mu_4"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </ThumbnailBox>
            <InfoBox>
              <TagRow>
                <Tag>운동발달</Tag>
                <TimeText>20분</TimeText>
              </TagRow>
              <OngoingTitle>소근육 발달 미술활동</OngoingTitle>
              <OngoingBar>
                <OngoingFill />
              </OngoingBar>
            </InfoBox>
          </OngoingCard>
        </Card>

        {renderProgramCards('언어발달')}
        {renderProgramCards('인지발달')}
        {renderProgramCards('운동발달')}
      </Wrapper>
    </Outer>
  );
};

export default LearningPage;