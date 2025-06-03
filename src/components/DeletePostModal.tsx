import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 14px;
  width: 300px;
  text-align: center;
  font-family: Regular;
`;

const Title = styled.div`
  font-size: 16px;
  margin-bottom: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  border: none;
`;

const CancelButton = styled(Button)`
  background: #ccc;
  color: white;
`;

const ConfirmButton = styled(Button)`
  background: #4171d6;
  color: white;
`;

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

const DeletePostModal = ({ onCancel, onConfirm }: Props) => {
  return (
    <Overlay>
      <ModalBox>
        <Title>게시글을 삭제하시겠어요?</Title>
        <ButtonRow>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>삭제</ConfirmButton>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
};

export default DeletePostModal;
