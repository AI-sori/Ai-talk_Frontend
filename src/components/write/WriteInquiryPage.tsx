import styled from "styled-components";
import BackSvg from "../../assets/community/Back.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance"; 

const WriteInquiryPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await axiosInstance.post("/qna", { title, content });
      alert("문의가 정상적으로 등록되었습니다.");
      navigate("/mypage/inquiry");
    } catch (error) {
      alert("문의 등록에 실패했습니다. 다시 시도해주세요.");
      console.error("문의 등록 실패:", error);
    }
  };

  return (
    <Outer>
      <Wrapper>
        <Container>
          <Header>
            <BackIcon src={BackSvg} alt="back" onClick={() => navigate("/mypage/inquiry")} />
            <Title>문의하기</Title>
          </Header>
          <InputTitle
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="문의 내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <SubmitButton onClick={handleSubmit}>문의하기</SubmitButton>
        </Container>
      </Wrapper>
    </Outer>
  );
};

export default WriteInquiryPage;
// ---------------------- 스타일 ----------------------

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
  color: black;
  margin-bottom: 1.5rem;
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

const InputTitle = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  color: black;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  background: #f9f9f9;
  font-family: Regular;
  font-size: 14px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  color: black;
  min-height: 150px;
  padding: 0.8rem;
  margin-bottom: 2rem;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  background: #f9f9f9;
  font-family: Regular;
  font-size: 14px;
  resize: none;
  box-sizing: border-box;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.9rem;
  background-color: #c9a8f7;
  color: white;
  font-family: Medium;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`; 