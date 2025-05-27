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
const [profileImage, setProfileImage] = useState<File | null>(null);


const handleSignup = async () => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("nickname", nickname);
    if (profileImage) {
      formData.append("profileImage", profileImage); // 실제 파일 객체 전달
    }

    const response = await axiosInstance.post("/members/join", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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
  setProfileImage={setProfileImage} // type: (file: File) => void
  handleComplete={handleSignup}
/>
      )}
    </>
  );
};

export default OnboardingPage;
