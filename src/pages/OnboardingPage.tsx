import { useState } from "react";
import SignupStep1 from "../components/onboarding/SignupStep1";
import SignupStep2 from "../components/onboarding/SignupStep2";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom"; // navigate 쓸거면 필요

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("");

  // 이 안에 API 요청해야 함
  const handleSignup = async () => {
    try {
      const response = await axiosInstance.post("/members/join", {
        email,
        password,
        nickname,
        profileImage,
      });

      console.log(response.data);
      alert("회원가입 성공!");
      navigate("/"); // 회원가입 완료 후 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
      alert("회원가입 실패 ");
    }
  };

  return (
    <>
      {step === 1 && (
        <SignupStep1
          onNext={() => setStep(2)}
          onBack={() => navigate("/")}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      )}
      {step === 2 && (
        <SignupStep2
          onBack={() => setStep(1)}
          nickname={nickname}
          setNickname={setNickname}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          handleComplete={handleSignup}
        />
      )}
    </>
  );
};

export default OnboardingPage;
