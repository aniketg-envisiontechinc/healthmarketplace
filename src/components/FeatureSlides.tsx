"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  Activity,
  Heart,
  ChefHat,
  Hotel,
  Target,
  Dumbbell,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Smart Meal Tracking",
    description:
      "Transform your eating habits with our AI-powered food recognition. Simply snap a photo of your meal and get instant nutritional insights, calorie tracking, and personalized recommendations. Perfect for maintaining a balanced diet on the go.",
    icon: Utensils,
    color: "#4ade80",
  },
  {
    title: "Activity Monitoring",
    description:
      "Stay active with our comprehensive activity tracking. From daily steps to intense workouts, sync with your favorite fitness devices and get detailed analytics. Set daily goals, track progress, and earn rewards for staying active.",
    icon: Activity,
    color: "#4ade80",
  },
  {
    title: "Health Analytics",
    description:
      "Gain deep insights into your health journey with our advanced analytics. Track your progress over time, identify patterns, and receive personalized recommendations. Visualize your improvements with detailed charts and reports.",
    icon: Heart,
    color: "#4ade80",
  },
  {
    title: "AI Dietician",
    description:
      "Your personal nutrition expert, available 24/7. Get customized meal plans based on your dietary preferences, health goals, and lifestyle. Receive real-time advice, recipe suggestions, and nutritional guidance tailored just for you.",
    icon: ChefHat,
    color: "#4ade80",
  },
  {
    title: "Hotel Partnerships",
    description:
      "Dine healthy even when traveling. Access our network of partner hotels offering specially curated healthy menus. Enjoy nutritious meals that align with your dietary goals, making healthy eating effortless on the road.",
    icon: Hotel,
    color: "#4ade80",
  },
  {
    title: "Goal Setting",
    description:
      "Achieve your fitness aspirations with our smart goal-setting system. Set realistic targets, track your progress, and receive personalized milestones. Celebrate your achievements and stay motivated throughout your journey.",
    icon: Target,
    color: "#4ade80",
  },
  {
    title: "Workout Plans",
    description:
      "Transform your fitness routine with personalized workout plans. Whether you're a beginner or an expert, get customized exercise routines that adapt to your progress. Includes video demonstrations and form tips for perfect execution.",
    icon: Dumbbell,
    color: "#4ade80",
  },
];

export function FeatureSlides() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const CurrentIcon = features[currentSlide].icon;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-black">
      <div className="relative w-full max-w-2xl">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 z-10">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#4ade80]" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
          >
            <ArrowRight className="w-6 h-6 text-[#4ade80]" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 mb-16 px-12"
          >
            <div className="flex justify-center">
              <CurrentIcon
                className="w-16 h-16"
                style={{ color: features[currentSlide].color }}
              />
            </div>
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white">
                {features[currentSlide].title}
              </h2>
              <p className="text-lg text-gray-400">
                {features[currentSlide].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-[#4ade80] w-4" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
