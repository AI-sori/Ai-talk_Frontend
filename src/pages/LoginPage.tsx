import styled from "styled-components";
import logo from "../assets/logo.svg"; 
import { useNavigate } from "react-router-dom";

const Outer = styled.div`
  height: 100dvh;
  width: 100vw;
  background: linear-gradient(180deg, #c9e6ff 0%, #e9f0ff 30%, #f0efff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 350px;
  margin: 0.5rem 0;
  padding: 14px;
  border-radius: 12px;
  border: none;
   outline: none;
  font-size: 1rem;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Button = styled.button`
  margin-top: 1.5rem;
  background-color: #abcfff;
  border: none;
  border-radius: 30px;
  padding: 14px 0;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
   outline: none;

  &:hover {
    background-color: #94b5e9;
      }
`;

const LinkRow = styled.div`
  margin-top: 1.5rem;
  font-size: 13px;
  color: #666;
  display: flex;
  gap: 8px;

  a {
    color: #7595D3;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const LogoImg = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 3rem;
`;
const LoginPage = () => {
    const navigate = useNavigate();
  return (
    <Outer>
      <Container>
      <LogoImg src={logo} alt="Ai-Talk 로고" />
        <Input type="email" placeholder="이메일" />
        <Input type="password" placeholder="비밀번호" />
        <Button>로그인</Button>
        <LinkRow>
        <a onClick={() => navigate("/onboarding")}>회원가입</a>
        </LinkRow>
      </Container>
    </Outer>
  );
};

export default LoginPage;
