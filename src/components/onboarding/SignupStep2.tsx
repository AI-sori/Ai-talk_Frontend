import styled from "styled-components";
import back from "../../assets/Back.svg";

const Outer = styled.div`
  height: 100dvh;
  width: 100vw;
  background: white;
  display: flex;
  justify-content: center;
   align-items: flex-start; 
  padding-top: 5vh;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem 1.5rem;
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
 width: 100%;
  height: 50px;
  padding: 12px;
  border-radius: 10px;
  border: 1.2px solid #7595D3;
  font-size: 14px;
  box-sizing: border-box;
   outline: none;
`;

const Button = styled.button`
  margin: 1.2rem auto 0; // 가운데 정렬
  background-color: #a8cbff;
  border: none;
  border-radius: 30px;
  padding: 14px;
  width: 100%;
  max-width: 300px; // 선택: 너무 넓지 않게
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


interface Props {
    onBack: () => void;
  }


  const SignupStep2: React.FC<Props> = ({ onBack }) => {
  const handleComplete = () => {
    alert("회원가입이 완료되었습니다!");
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
          <ProfileImage>이미지</ProfileImage>
          <ProfileLabel>프로필 사진</ProfileLabel>
        </ProfileWrapper>

        <Label>*닉네임</Label>
        <Input placeholder="닉네임을 입력하세요" />

        <Label>*대표 소개</Label>
        <Input placeholder="소개를 입력하세요" />

        <Button onClick={handleComplete}>완료</Button>
      </Container>
    </Outer>
  );
};

export default SignupStep2;
