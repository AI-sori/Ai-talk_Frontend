import styled from 'styled-components';
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  width: 300px;
  padding: 1.2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  font-family: Regular;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.8rem;
  font-family: Bold;
`;

const Description = styled.p`
  font-size: 15px;
  color: #444;
  margin-bottom: 1.5rem;
   font-family: Regular;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  flex: 1;
  margin-right: 0.5rem;
  padding: 0.5rem 0;
  background: white;
  border: 1px solid #707070;
  border-radius: 8px;
  font-family: Regular;
  cursor: pointer;
  width: 120px;
  height: 42px;
  font-size: 14px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const ActionButton = styled.button<{ red?: boolean }>`
  flex: 1;
  width: 120px;
  height: 42px;
  padding: 0.5rem 0;
  font-family: Regular;
  background: ${({ red }) => (red ? '#ffffff' : '#9FC9FF')};
  color: ${({ red }) => (red ? '#FF7272' : '#FFFFFF')};
  border: 1px solid ${({ red }) => (red ? '#FF7272' : 'none')};
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

interface ModalProps {
  type: 'logout' | 'withdraw';
  onCancel: () => void;
onConfirm: () => void;
}

const Modal = ({ type, onCancel }: ModalProps) => {
  const navigate = useNavigate();

 const handleAction = async () => {
  if (type === 'logout') {
    try {
      const response = await axiosInstance.post("/members/logout");
      console.log("로그아웃 성공:", response.data);
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  } else if (type === 'withdraw') {
    try {
      await axiosInstance.delete("/members/delete");
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다.");
    }
  }
};

  return (
    <ModalBackground>
      <ModalContainer>
        {type === 'logout' ? (
          <>
            <Title>로그아웃</Title>
            <Description>로그아웃 하시겠습니까?</Description>
          </>
        ) : (
          <>
            <Title>정말 탈퇴하시겠습니까?</Title>
            <Description>탈퇴 시 모든 학습 데이터가 삭제되며 복구가 불가능합니다.</Description>
          </>
        )}
        <ButtonRow>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ActionButton red={type === 'withdraw'} onClick={handleAction}>
            {type === 'logout' ? '로그아웃' : '탈퇴하기'}
          </ActionButton>
        </ButtonRow>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;