import styled from "styled-components";
import BackSvg from "../assets/community/Back.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

interface Inquiry {
  id: number;
  title: string;
  content: string;
  reply: string;
  memberId: number;
}

const InquiryPage = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axiosInstance.get<Inquiry[]>("/qna");
        setInquiries(response.data);
      } catch (error) {
        console.error("문의 내역 조회 실패:", error);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <Outer>
      <Wrapper>
        <Container>
          <Header>
            <img src={BackSvg} alt="back" width={20} onClick={() => navigate("/mypage")} />
            <Title>문의내역</Title>
          </Header>

          <AskButton onClick={() => navigate("/mypage/inquiry/write")}>
            새 문의하기
          </AskButton>

          {inquiries.map(({ id, title, reply }) => (
             <InquiryCard key={id} onClick={() => navigate(`/mypage/inquiry/${id}`)}>
              <InquiryTitleRow>
                <strong>{title}</strong>
                <StatusTag status={reply ? "답변완료" : "답변대기"}>
                  {reply ? "답변완료" : "답변대기"}
                </StatusTag>
              </InquiryTitleRow>
              {reply && <p>{reply}</p>}
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
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const InquiryCard = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
   font-family: Regular;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
   cursor: pointer;
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
