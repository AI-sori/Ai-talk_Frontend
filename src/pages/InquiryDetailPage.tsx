import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import BackSvg from "../assets/community/Back.svg";

interface InquiryDetail {
  id: number;
  title: string;
  content: string;
  reply: string;
  memberId: number;
}

const InquiryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axiosInstance.get(`/qna/${id}`);
        setInquiry(res.data);
      } catch (e) {
        console.error("문의 상세 조회 실패", e);
      }
    };
    fetchDetail();
  }, [id]);

  if (!inquiry) return null;

  return (
    <Outer>
      <Wrapper>
        <Container>
          <Header>
            <BackIcon src={BackSvg} onClick={() => navigate("/mypage/inquiry")} />
            <Title>문의하기</Title>
          </Header>
       
            <InquiryTitle>{inquiry.title}</InquiryTitle>
            <TopRow>
              <StatusTag status={inquiry.reply ? "답변완료" : "답변대기"}>
                {inquiry.reply ? "답변완료" : "답변대기"}
              </StatusTag>
              <ContentText>{inquiry.content}</ContentText>
            </TopRow>
            {inquiry.reply && <ReplyBox>{inquiry.reply}</ReplyBox>}
    
        </Container>
      </Wrapper>
    </Outer>
  );
};

export default InquiryDetailPage;
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
  margin-bottom: 1.5rem;
`;

const BackIcon = styled.img`
  width: 20px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  font-family: Bold;
`;

const InquiryTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.6rem;
  margin-left: 8px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const StatusTag = styled.span<{ status: string }>`
  background: ${({ status }) => (status === "답변완료" ? "#f0e8ff" : "#f2f2f2")};
  color: ${({ status }) => (status === "답변완료" ? "#b48efb" : "#999")};
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 15px;
  font-family: Regular;
  font-weight: 500;
`;

const ContentText = styled.p`
  font-size: 14px;
  color: #444;
  margin-top: 4px;
  flex: 1;
`;

const ReplyBox = styled.div`
  background: #F8FAFC;
  color: #333;
  font-size: 14px;
  border-radius: 10px;
  padding: 0.9rem;
  margin-top: 1rem;
  line-height: 1.5;
  white-space: pre-line;
`;



