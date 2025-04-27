import { useState } from "react";
import SignupStep1 from "../components/onboarding/SignupStep1";
import SignupStep2 from "../components/onboarding/SignupStep2";
import axiosInstance from "../api/axiosInstance";

const OnboardingPage = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const response = await axiosInstance.post("/members/join", {
    email,
    password,
    nickname,
    profileImage,
  });

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
          handleComplete={handleSignup}
        />
      )}
    </>
  );
};

export default OnboardingPage;
