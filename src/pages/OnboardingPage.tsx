import { useState } from "react";
import SignupStep1 from "../components/onboarding/SignupStep1";
import SignupStep2 from "../components/onboarding/SignupStep2";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom"; 

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState<string>("");


  const handleSignup = async () => {
    try {
      const base64Body = profileImage.includes(",")
        ? profileImage.split(",")[1]
        : profileImage;
  
      const payload = {
        email,
        password,
        nickname,
        profileImage: profileImage ? base64Body : "", // 선택 안 하면 빈 문자열
      };
  
      const response = await axiosInstance.post("/members/join", payload);
      console.log(response.data);
      alert("회원가입 성공!");
      navigate("/");
    } catch (error: any) {
      console.error("회원가입 실패:", error.response?.data || error);
      alert("회원가입 실패: " + (error.response?.data?.message || "서버 오류"));
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
