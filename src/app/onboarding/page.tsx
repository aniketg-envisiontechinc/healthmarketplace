"use client";

import { Onboarding } from "@/components/Onboarding";
import { FeatureSlides } from "@/components/FeatureSlides";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-black flex">
      {/* Left side - Feature Slides */}
      <div className="w-2/5 border-r border-gray-800">
        <FeatureSlides />
      </div>

      {/* Right side - Onboarding Form */}
      <div className="w-3/5 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <Onboarding />
        </div>
      </div>
    </div>
  );
}
