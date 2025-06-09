import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  width: 300px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-family: Regular;
  font-weight: bold;
  margin-bottom: 1rem;
  color: black;
`;

const Message = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 1.5rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
`;

const CancelBtn = styled.button`
  background: white;
  border: 1px solid #ccc;
  padding: 0.4rem 1rem;
  color: black;
  font-size: 13px;
  font-family: Regular;
  border-radius: 6px;
  cursor: pointer;
  &:focus,
  &:hover,
  &:active {
    outline: none;
    box-shadow: none;
    border: 1px solid #ccc; /* 유지하거나 원하면 transparent */
  }
`;

const DeleteBtn = styled.button`
  background: #f44336;
  color: white;
  border: none;
  font-size: 13px;
  font-family: Regular;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
   &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const DeletePostModal = ({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) => (
  <ModalBackground>
    <ModalBox>
      <Title>게시글 삭제</Title>
      <Message>
        정말로 이 게시글을을 삭제하시겠습니까? <br />
        삭제된 게시글은 복구할 수 없습니다.
      </Message>
      <ButtonRow>
        <CancelBtn onClick={onCancel}>취소</CancelBtn>
        <DeleteBtn onClick={onConfirm}>삭제</DeleteBtn>
      </ButtonRow>
    </ModalBox>
  </ModalBackground>
);

export default DeletePostModal;
