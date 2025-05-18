import styled from "styled-components";
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



const Title = styled.h2`
  font-size: 26px;
  color: #7b9acc;
  text-align: center;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #7b9acc;
  margin-bottom: 0.3rem;
  margin-top: 1rem;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 350px;
  height: 50px;
  padding: 12px;
  border-radius: 10px;
  border: 1.2px solid #7595D3;
  font-size: 14px;  
  box-sizing: border-box;
   outline: none;
    background-color: white;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
  margin-top: 8px;
  text-align: center;
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
  outline: none;

  &:hover {
    background-color: #94b5e9;
  }
    &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const SignupStep1 = ({
  onNext,
  email,
  setEmail,
  password,
  setPassword,
}: {
  onNext: () => void;
  onBack: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleNext = () => {
    if (!email || !password || !confirmPassword) {
      setError("모든 입력란을 작성해주세요.");
      return;
    }

    if (!isEmailValid(email)) {
      setError("유효한 이메일 형식이 아닙니다.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setError(""); // 에러 초기화
    onNext();
  };

  return (
    <Outer>
      <Container>
        <Title>회원가입</Title>

        <Label>*이메일</Label>
        <InputWrapper>
          <Input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>

        <Label>*비밀번호</Label>
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Label>*비밀번호 확인</Label>
        <Input
          type="password"
          placeholder="비밀번호를 한 번 더 입력하세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button onClick={handleNext}>다음</Button>
      </Container>
    </Outer>
  );
};

export default SignupStep1;
