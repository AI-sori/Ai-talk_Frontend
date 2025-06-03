import React from "react";
import styled from "styled-components";

interface DeleteInquiryModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 15px;
  color: #333;
  margin-bottom: 1.5rem;
  font-family: Regular;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 0.6rem 1rem;
  font-size: 14px;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 0.6rem 1rem;
  font-size: 14px;
  background: #ff6961;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const DeleteInquiryModal = ({ onCancel, onConfirm }: DeleteInquiryModalProps) => {
  return (
    <Overlay>
      <ModalBox>
        <Message>정말로 이 문의를 삭제하시겠습니까?</Message>
        <ButtonRow>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>삭제</ConfirmButton>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
};

export default DeleteInquiryModal;
