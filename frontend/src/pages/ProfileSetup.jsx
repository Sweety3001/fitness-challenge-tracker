import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import { useAuth } from "../context/AuthContext";

import StepBasicInfo from "../components/profile/StepBasicInfo";
import StepFitnessLevel from "../components/profile/StepFitnessLevel";
import StepGoals from "../components/profile/StepGoals";
import { api } from "../api/api";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { refreshUser } = useAuth();

  const [profileData, setProfileData] = useState({
    age: "",
    gender: "",
    fitnessLevel: "",
    goals: [],
  });

  // ✅ SKIP
  const handleSkip = async () => {
  await api.updateProfile({ profileCompleted: true });
  await refreshUser();
  navigate("/dashboard");
};

  // ✅ FINISH
  // const finishSetup = async () => {
  //   try {
  //     await api.updateProfile(profileData);
  //     await refreshUser();
  //   } catch (err) {
  //     console.error("Profile update failed", err);
  //   } finally {
  //     navigate("/dashboard");
  //   }
  // };
const finishSetup = async () => {
  try {
    await api.updateProfile({
      ...profileData,
      profileCompleted: true, // 🔥 THIS WAS MISSING
    });

    await refreshUser();
    navigate("/dashboard");
  } catch (err) {
    console.error("Profile update failed", err);
  }
};

  return (
    <AnimatedPage>
      <div className="flex items-center justify-center min-h-screen px-4 bg-black">
        <div className="w-full max-w-4xl rounded-2xl bg-[#0b0b12] shadow-2xl p-10">

          {step === 1 && (
            <StepBasicInfo
              data={profileData}
              setData={setProfileData}
              onNext={() => setStep(2)}
              onSkip={handleSkip}
            />
          )}

          {step === 2 && (
            <StepFitnessLevel
              data={profileData}
              setData={setProfileData}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
              onSkip={handleSkip}
            />
          )}

          {step === 3 && (
            <StepGoals
              data={profileData}
              setData={setProfileData}
              onBack={() => setStep(2)}
              onFinish={finishSetup}
              onSkip={handleSkip}
            />
          )}

        </div>
      </div>
    </AnimatedPage>
  );
};

export default ProfileSetup;
