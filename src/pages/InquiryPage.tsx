// src/pages/InquiryPage.tsx

import styled from "styled-components";
import BackSvg from "../assets/community/Back.svg";
import { useNavigate } from "react-router-dom";

const InquiryPage = () => {
  const navigate = useNavigate();

  return (
    <Outer>
      <Wrapper>
        <Container>
          <Header>
            <img src={BackSvg} alt="back" width={20} onClick={() => navigate(-1)} />
            <Title>문의내역</Title>
          </Header>

          <AskButton>새 문의하기</AskButton>

          {[
            {
              title: "학습 진도 초기화 문의",
              status: "답변완료",
              reply: "고객님, 학습 진도 복구를 도와드리겠습니다. 걱정마세요...",
              date: "2024.01.15",
            },
            {
              title: "결제 내역 확인",
              status: "답변대기",
              reply: "",
              date: "2024.01.14",
            },
          ].map(({ title, status, reply, date }) => (
            <InquiryCard key={title}>
              <InquiryTitleRow>
                <strong>{title}</strong>
                <StatusTag status={status}>{status}</StatusTag>
              </InquiryTitleRow>
              {reply && <p>{reply}</p>}
              <Date>{date}</Date>
            </InquiryCard>
          ))}
        </Container>
      </Wrapper>
    </Outer>
  );
};

export default InquiryPage;

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
  font-size: 18px;
  font-weight: bold;
  font-family: Bold;
  cursor: pointer;
`;

const AskButton = styled.button`
  width: 100%;
  background: #f5f1ff;
  border: none;
  border-radius: 10px;
  padding: 0.8rem;
   font-family: Medium;
  font-size: 15px;
  color: #8b61e6;
  font-weight: 600;
  margin-bottom: 1.5rem;
  cursor: pointer;
`;

const InquiryCard = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
   font-family: Regular;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
`;

const InquiryTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 0.4rem;
  font-family: Bold;
`;

const StatusTag = styled.span<{ status: string }>`
  background: ${({ status }) =>
    status === "답변완료" ? "#EFFFE9" : "#F2F2F2"};
  color: ${({ status }) =>
    status === "답변완료" ? "#126B00" : "#666"};
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 15px;
   font-family: Regular;
  font-weight: 500;
`;

const Date = styled.div`
  font-size: 12px;
  color: #999;
   font-family: Regular;
  margin-top: 0.5rem;
`;
