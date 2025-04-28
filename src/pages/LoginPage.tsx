import styled from "styled-components";
import logo from "../assets/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Outer = styled.div`
  height: 100dvh;
  width: 100vw;
  background: white;
  display: flex;
   overflow: hidden; 
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 375px; 
  height: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
   overflow: hidden; 
  justify-content: center;
  padding: 2rem 1.5rem;
  background: linear-gradient(180deg, #c9e6ff 0%, #e9f0ff 30%, #f0efff 100%);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;


const Input = styled.input`
  width: 320px;
  margin: 0.5rem 0;
  padding: 14px;
  border-radius: 12px;
  border: none;
  height: 25px;
  outline: none;
  color: #707070;
  font-size: 16px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Button = styled.button`
  margin-top: 1.5rem;
  background-color: #9FC9FF;
  border: none;
  border-radius: 30px;
  padding: 14px 0;
   width: 270px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
   outline: none;

  &:hover {
    background-color: #91B6FF;
      }
`;

const LinkRow = styled.div`
  margin-top: 1.5rem;
  font-size: 14px;
  color: #7595D3;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/members/login", {
        email,
        password,
      });
  
      console.log(response.data);
      alert("로그인 성공!");
      navigate("/home"); 
    } catch (error) {
      console.error(error);
      alert("로그인 실패 ");
    }
  };
  

  return (
    <Outer>
      <Container>
        <LogoImg src={logo} alt="Ai-Talk 로고" />
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>로그인</Button>
        <LinkRow>
          <a onClick={() => navigate("/onboarding")}>회원가입</a>
        </LinkRow>
      </Container>
    </Outer>
  );
};

export default LoginPage;