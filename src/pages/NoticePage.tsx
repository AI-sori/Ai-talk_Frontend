// src/pages/NoticePage.tsx

import styled from "styled-components";
import BackSvg from "../assets/community/Back.svg";
import { useNavigate } from "react-router-dom";

const NoticePage = () => {
  const navigate = useNavigate();

  return (
    <Outer>
      <Wrapper>
        <Container>
          <Header>
            <img src={BackSvg} alt="back" width={20} onClick={() => navigate(-1)} />
            <Title>공지사항</Title>
          </Header>

          {[
            {
              title: "2024년 학습 프로그램 업데이트 안내",
              date: "2024.01.15",
              desc: "더 나은 학습 경험을 위해 프로그램이 업데이트 됩니다...",
              tag: "NEW",
            },
            {
              title: "겨울방학 특별 학습 이벤트",
              date: "2024.01.10",
              desc: "겨울방학을 맞이하여 특별 학습 프로그램을 준비했습니다...",
            },
            {
              title: "시스템 점검 안내",
              date: "2024.01.08",
              desc: "1월 20일 새벽 2시부터 4시까지 시스템 점검이 있을 예정입니다...",
            },
          ].map(({ title, date, desc, tag }) => (
            <NoticeCard key={title}>
              <CardHeader>
                <strong>{title}</strong>
                {tag && <NewTag>{tag}</NewTag>}
              </CardHeader>
              <p>{desc}</p>
              <Date>{date}</Date>
            </NoticeCard>
          ))}
        </Container>
      </Wrapper>
    </Outer>
  );
};

export default NoticePage;

// ------------------------ 스타일 ------------------------

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

const Container = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 2rem;
  
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  font-family: Bold;
  cursor: pointer;
`;

const NoticeCard = styled.div`
  background: #fff;
  padding: 1rem;
  font-family: Regular;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
    font-family: Bold;
  margin-bottom: 0.3rem;
`;

const NewTag = styled.span`
  background: #ffe7e7;
  color: #f55;
  font-size: 11px;
  font-weight: bold;
  width: 33px;
  height: 18px;
  padding: 2px 6px;
  font-family: Regular;
  border-radius: 20px;
   display: flex;
  align-items: center;
  justify-content: center;
`;

const Date = styled.div`
  font-size: 12px;
  color: #999;
  font-family: Regular;
  margin-top: 0.6rem;
`;
