import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import BackSvg from "../assets/community/Back.svg";
import useAuthStore from "../stores/useAuthStore";
import DeleteInquiryModal from "../components/DeleteInquiryModal";

interface InquiryDetail {
  id: number;
  title: string;
  content: string;
  reply: string;
  userId: number; 
}

const InquiryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axiosInstance.get(`/qna/${id}`);
        setInquiry(res.data);
        setEditTitle(res.data.title);
        setEditContent(res.data.content);
      } catch (e) {
        console.error("문의 상세 조회 실패", e);
      }
    };
    fetchDetail();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/qna/${id}`, {
        title: editTitle,
        content: editContent,
      });
      setIsEditing(false);
      const res = await axiosInstance.get(`/qna/${id}`);
      setInquiry(res.data);
    } catch (e) {
      console.error("문의 수정 실패", e);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/qna/${id}`);
      navigate("/mypage/inquiry");
    } catch (e) {
      console.error("문의 삭제 실패", e);
    }
  };

  if (!inquiry) return null;

  return (
    <Outer>
      <Wrapper>
        <Container>
          <Header>
            <BackArea>
              <BackIcon src={BackSvg} onClick={() => navigate("/mypage/inquiry")} />
              <Title>문의하기</Title>
            </BackArea>
            {user?.userId === inquiry.userId && !isEditing && (
              <ButtonGroup>
               <TextButton onClick={() => setIsEditing(true)}>수정</TextButton>
               <TextButton onClick={() => setShowDeleteModal(true)}>삭제</TextButton>
              </ButtonGroup>
              )} 
          </Header>

          {isEditing ? (
            <>
              <EditInput value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              <EditTextarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
              <ButtonGroup style={{ marginTop: "1rem" }}>
                <CancelButton onClick={() => setIsEditing(false)}>취소</CancelButton>
                <SaveButton onClick={handleUpdate}>저장</SaveButton>
              </ButtonGroup>
            </>
          ) : (
            <>
              <InquiryTitle>{inquiry.title}</InquiryTitle>
              <TopRow>
                <StatusTag status={inquiry.reply ? "답변완료" : "답변대기"}>
                  {inquiry.reply ? "답변완료" : "답변대기"}
                </StatusTag>
                <ContentText>{inquiry.content}</ContentText>
              </TopRow>
              {inquiry.reply && <ReplyBox>{inquiry.reply}</ReplyBox>}
            </>
          )}
        </Container>
      </Wrapper>

      {showDeleteModal && (
        <DeleteInquiryModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </Outer>
  );
};

export default InquiryDetailPage;

// 스타일 컴포넌트
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: black;
`;

const BackArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const BackIcon = styled.img`
  width: 20px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: black;
  font-family: Bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const TextButton = styled.button`
  font-size: 13px;
  color: #4171d6;
  background: none;
  border: none;
  cursor: pointer;
`;

const InquiryTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: black;
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
  background: #f8fafc;
  color: #333;
  font-size: 14px;
  border-radius: 10px;
  padding: 0.9rem;
  margin-top: 1rem;
  line-height: 1.5;
  white-space: pre-line;
`;

const EditInput = styled.input`
  font-size: 15px;
  width: 280px;
  margin-bottom: 1rem;
  padding: 0.7rem;
  background: #f8fafc;
  color: black;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-family: Regular;
`;

const EditTextarea = styled.textarea`
  font-size: 14px;
  width: 280px;
  color: black;
  background: #f8fafc;
  font-family: Regular;
  height: 120px;
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
`;

const CancelButton = styled.button`
  font-size: 14px;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  color: black;
  font-family: Regular;
  background: #eee;
  cursor: pointer;
`;

const SaveButton = styled.button`
  font-size: 14px;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  background: #94b5e9;
  font-family: Regular;
  color: white;
  cursor: pointer;
`;
