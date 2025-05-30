import styled from "styled-components";
import back from "../../assets/Back.svg";
import { useState } from "react";

const Outer = styled.div`
  height: 100dvh;
  width: 100vw;
  background:rgb(247, 247, 247);
  display: flex;
  justify-content: center;
  align-items: center; 
  overflow: hidden; 
`;

const Container = styled.div`
  width: 390px; 
  height: 100%;
  padding: 2rem 1.5rem;
  background: white; 
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center; 
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #e0e0e0;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #777;
`;

const ProfileLabel = styled.p`
  font-size: 14px;
  color: #7b9acc;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #7b9acc;
  margin-bottom: 0.3rem;
  margin-top: 1rem;
`;

const Input = styled.input`
 width: 350px;
  height: 50px;
  padding: 12px;
  border-radius: 10px;
   background-color: white;
  border: 1.2px solid #7595D3;
  font-size: 14px;
  box-sizing: border-box;
   outline: none;
`;

const Button = styled.button`
  margin: 1.2rem auto 0; 
  background-color: #a8cbff;
  border: none;
  border-radius: 30px;
  padding: 14px;
  width: 270px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  display: block;

  &:hover {
    background-color: #94b5e9;
  }
`;
const HeaderWrapper = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h2`
  font-size: 26px;
  color: #7b9acc;
  margin: 0;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
  margin-top: 8px;
  text-align: center;
`;

const SignupStep2 = ({
  onBack,
  nickname,
  setNickname,
  profileImage,
  setProfileImage,
  handleComplete,
}: {
  onBack: () => void;
  nickname: string;
  setNickname: (nickname: string) => void;
   profileImage: File | null;
setProfileImage: (file: File) => void;
  handleComplete: () => void;
}) => {
  const [error, setError] = useState("");

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setProfileImage(file); // 이제 파일 자체 저장
};


  const handleClick = () => {
    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      return;
    }
    setError("");
    handleComplete();
  };

  return (
    <Outer>
      <Container>
        <HeaderWrapper>
          <BackButton onClick={onBack}>
            <img src={back} alt="뒤로가기" />
          </BackButton>
          <Title>회원가입</Title>
        </HeaderWrapper>

        <ProfileWrapper>
          <ProfileImage>
{profileImage ? (
  <img
    src={URL.createObjectURL(profileImage)}
    alt="프로필"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "50%",
    }}
  />
) : (
  "이미지"
)}
          </ProfileImage>
          <ProfileLabel>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </ProfileLabel>
        </ProfileWrapper>

        <Label>*닉네임</Label>
        <Input
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button onClick={handleClick}>완료</Button>
      </Container>
    </Outer>
  );
};

export default SignupStep2;