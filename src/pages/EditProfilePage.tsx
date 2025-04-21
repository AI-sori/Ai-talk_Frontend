import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackSvg from "../assets/community/Back.svg";
import CameraSvg from "../assets/mypage/Camera.svg";

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
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  font-family: Bold;
`;

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-family: Regular;
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  position: relative;
`;

const CameraIcon = styled.div`
  width: 28px;
  height: 28px;
  background: #abcfff;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 4px;
  right: 4px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 0.3rem;
  display: block;
  font-family: Medium;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 300px;
  padding: 0.7rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  margin-bottom: 1rem;
  font-size: 14px;
  font-family: Regular;
  background: white;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  margin-top: 0.3rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SaveBtn = styled.button`
  flex: 1;
  background: #9FC9FF;
  color: white;
  font-size: 15px;
  padding: 0.7rem;
  border: none;
  font-family: Regular;
  border-radius: 10px;
  cursor: pointer;

  &:focus,
  &:focus-visible {
    outline: none;
  }
  &:hover {
    background: #94b5e9;
  }
`;

const CancelBtn = styled.button`
  flex: 1;
  background: #fff;
  border: 1px solid #aaa;
  padding: 0.7rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
    font-family: Regular;
    
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const EditProfilePage = () => {
  const navigate = useNavigate();

  return (
    <Outer>
      <Wrapper>
        <Container>
          <Header>
            <Title>프로필 수정</Title>
            <BackBtn onClick={() => navigate(-1)}>
              <img src={BackSvg} alt="뒤로가기" width={18} />
              뒤로가기
            </BackBtn>
          </Header>

          <ProfileImageWrapper>
            <ProfileImage>120 × 120
            <CameraIcon>
  <img src={CameraSvg} alt="카메라" width={16} height={16} />
</CameraIcon>

            </ProfileImage>
            <div style={{ fontSize: "13px", color: "#999", marginTop: "0.5rem" }}>
              프로필 사진 변경
            </div>
          </ProfileImageWrapper>

          <Label>이름</Label>
          <InputWrapper>
          <Input placeholder="이름을 입력하세요" />
          </InputWrapper>

          <Label>이메일</Label>
          <InputWrapper>
          <Input placeholder="이메일을 입력하세요" />
          </InputWrapper>
          <Label>비밀번호</Label>
          <InputWrapper>
          <Input type="password" placeholder="비밀번호를 입력하세요" />
          </InputWrapper>
          <Label>소개</Label>
          <InputWrapper>
          <Input placeholder="간단한 소개를 입력하세요" />
          </InputWrapper>
          <CheckboxWrapper>
            <input type="checkbox" />
            학습 알림 받기
          </CheckboxWrapper>

          <ButtonRow>
            <SaveBtn>저장하기</SaveBtn>
            <CancelBtn onClick={() => navigate(-1)}>취소</CancelBtn>
          </ButtonRow>
        </Container>
      </Wrapper>
    </Outer>
  );
};

export default EditProfilePage;
