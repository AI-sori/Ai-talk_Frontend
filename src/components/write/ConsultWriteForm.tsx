import styled from "styled-components";
import BackSvg from "../../assets/community/Back.svg";
import { useNavigate } from "react-router-dom";

const Back = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 19px;
  border: none;
  background: transparent;
  margin-bottom: 1.2rem;
   margin-left: -20px;
  cursor: pointer;
  font-weight: bold;
  color: #333; 
  font-family: ExtraBold;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 0.6rem;
  font-family: Bold;
`;

const CategoryRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const CategoryButton = styled.button<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? "#F0EFFF" : "#F3F4F6")};
  color: ${({ active }) => (active ? "#C48DEF" : "#666666")};
  font-size: 14px;
  border: none;
  border-radius: 20px;
  padding: 8px 14px;
  cursor: pointer;
    font-family: Regular;
`;

const Input = styled.input`
  width: 280px;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #E5E7EB;
  background: #f8f9fb;
  margin-bottom: 1.5rem;
  font-size: 14px;
    font-family: Regular;
`;

const Textarea = styled.textarea`
  width: 280px;
  height: 120px;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #E5E7EB;
  background: #f8f9fb;
  resize: none;
  margin-bottom: 1.5rem;
  font-size: 14px;
    font-family: Regular;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin-top: 2rem;
`;

const CancelBtn = styled.button`
  flex: 1;
  background: #f8f9fb;
 border: 1px solid #aaa;
  color: #888;
  padding: 0.7rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
    font-family: Regular;
`;

const SubmitBtn = styled.button`
  flex: 1;
  background: #c48def;
  border: none;
  color: white;
  padding: 0.7rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
    font-family: Regular;

  &:hover {
    background: #b278e0;
  }
`;

const ConsultWriteForm = () => {
  const navigate = useNavigate();
  return (
    <>
       <Back onClick={() => navigate("/community", { state: { tab: "expert" } })}>
        <img src={BackSvg} alt="뒤로가기" width={20} height={20} />
       상담 등록 
      </Back>

      <Label>상담 분야</Label>
      <CategoryRow>
        {["심리상담", "발달치료", "교육상담"].map((cat, i) => (
          <CategoryButton key={cat} active={i === 0}>
            {cat}
          </CategoryButton>
        ))}
      </CategoryRow>

      <Label>제목</Label>
      <Input placeholder="제목을 입력해주세요" />

      <Label>상담 내용</Label>
      <Textarea placeholder="상담 내용을 입력해주세요" />

      <ButtonRow>
        <CancelBtn>취소</CancelBtn>
        <SubmitBtn>등록하기</SubmitBtn>
      </ButtonRow>
    </>
  );
};

export default ConsultWriteForm;
