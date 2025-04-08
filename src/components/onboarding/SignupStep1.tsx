import styled from "styled-components";

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
  width: 100%;
  height: 50px;
  padding: 12px;
  border-radius: 10px;
  border: 1.2px solid #7595D3;
  font-size: 14px;
  box-sizing: border-box;
   outline: none;
`;

const InlineButton = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  background-color: #9FC9FF;
  color: white;
  border-radius: 15px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
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
   outline: none;

  &:hover {
    background-color: #94b5e9;
  }
`;


const SignupStep1 = ({ onNext }: { onNext: () => void }) => {
  return (
    <Outer>
      <Container>
        <Title>회원가입</Title>

        <Label>*이메일</Label>
        <InputWrapper>
          <Input type="email" placeholder="이메일을 입력하세요" />
          <InlineButton>중복 확인</InlineButton>
        </InputWrapper>

        <Label>*비밀번호</Label>
        <Input type="password" placeholder="영문/숫자 조합 8~16자 이내로 입력하세요" />

        <Label>*비밀번호 확인</Label>
        <Input type="password" placeholder="비밀번호를 한 번 더 입력하세요" />

        <Button onClick={onNext}>다음</Button>
      </Container>
    </Outer>
  );
};

export default SignupStep1;
