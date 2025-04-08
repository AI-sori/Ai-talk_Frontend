import { useState } from "react";
import SignupStep1 from "../components/onboarding/SignupStep1";
import SignupStep2 from "../components/onboarding/SignupStep2";

const OnboardingPage = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && (
        <SignupStep1
          onNext={() => setStep(2)}
          onBack={() => navigate("/")} // ← 로그인 페이지로
        />
      )}
      {step === 2 && <SignupStep2 onBack={() => setStep(1)} />}
    </>
  );
};

export default OnboardingPage;
