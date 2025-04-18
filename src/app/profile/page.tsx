"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [proteinGoal, setProteinGoal] = useState(50); // Default protein goal
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [targetMonths, setTargetMonths] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load values from local storage on initial load
    const storedCalorieGoal = localStorage.getItem("calorieGoal");
    if (storedCalorieGoal) {
      setCalorieGoal(parseInt(storedCalorieGoal));
    }
    const storedProteinGoal = localStorage.getItem("proteinGoal");
    if (storedProteinGoal) {
      setProteinGoal(parseInt(storedProteinGoal));
    }
    const storedCurrentWeight = localStorage.getItem("currentWeight");
    if (storedCurrentWeight) {
      setCurrentWeight(storedCurrentWeight);
    }
    const storedTargetWeight = localStorage.getItem("targetWeight");
    if (storedTargetWeight) {
      setTargetWeight(storedTargetWeight);
    }
    const storedTargetMonths = localStorage.getItem("targetMonths");
    if (storedTargetMonths) {
      setTargetMonths(storedTargetMonths);
    }
  }, []); // Empty dependency array to run only on initial load

  useEffect(() => {
    // Save calorie goal to local storage whenever it changes
    localStorage.setItem("calorieGoal", calorieGoal.toString());
  }, [calorieGoal]); // Calorie goal is now a dependency, preventing loop
  useEffect(() => {
    // Save protein goal to local storage whenever it changes
    localStorage.setItem("proteinGoal", proteinGoal.toString());
  }, [proteinGoal]);

  useEffect(() => {
    // Save values to local storage whenever they change
    localStorage.setItem("currentWeight", currentWeight);
    localStorage.setItem("targetWeight", targetWeight);
    localStorage.setItem("targetMonths", targetMonths);
  }, [currentWeight, targetWeight, targetMonths]); // Dependencies added to prevent loop

  const calculateRecommendedCalories = useCallback(() => {
    if (!currentWeight || !targetWeight || !targetMonths) {
      return "";
    }

    const currentWeightKg = parseFloat(currentWeight);
    const targetWeightKg = parseFloat(targetWeight);
    const monthsToAchieve = parseInt(targetMonths);

    if (
      isNaN(currentWeightKg) ||
      isNaN(targetWeightKg) ||
      isNaN(monthsToAchieve) ||
      monthsToAchieve <= 0
    ) {
      return "Invalid input";
    }

    const weightDifference = currentWeightKg - targetWeightKg;
    const weeklyLoss = weightDifference / (monthsToAchieve * 4); // Assuming 4 weeks per month

    // Safe weight loss is generally considered 0.5 to 1 kg per week.
    if (Math.abs(weeklyLoss) > 1) {
      return "Unrealistic goal. Please adjust target weight or months.";
    }

    // Basal Metabolic Rate (BMR) calculation using Mifflin-St Jeor equation (simplified).
    // This is a general estimate and may not be accurate for everyone.
    const bmr = 10 * targetWeightKg + 6.25 * 170 - 5 * 30 + 5; // Using a fixed height (170 cm) and age (30) for simplicity.

    // Adjust calorie intake based on weight loss goal (approximately 7700 calories to lose 1 kg).
    const dailyCalorieDeficit = (weeklyLoss * 7700) / 7;
    let recommendedCalorieIntake = bmr - dailyCalorieDeficit;

    // Validate if the final calorie intake is reasonable.
    if (recommendedCalorieIntake < 1200) {
      recommendedCalorieIntake = 1200;
    }

    return Math.round(recommendedCalorieIntake).toString();
  }, [currentWeight, targetWeight, targetMonths]);

  const calculateRecommendedProtein = useCallback(() => {
    if (!targetWeight) {
      return "";
    }

    const targetWeightKg = parseFloat(targetWeight);

    if (isNaN(targetWeightKg)) {
      return "Invalid input for target weight";
    }

    // Recommendation: 1.2 to 1.7 grams of protein per kg of target body weight for active individuals
    const recommendedProteinIntakeMin = targetWeightKg * 1.2;
    const recommendedProteinIntakeMax = targetWeightKg * 1.7;

    return `${Math.round(recommendedProteinIntakeMin)} - ${Math.round(recommendedProteinIntakeMax)}`;
  }, [targetWeight]);

  useEffect(() => {
    const recommendedCalories = calculateRecommendedCalories();
    if (
      recommendedCalories !== "Invalid input" &&
      recommendedCalories !==
        "Unrealistic goal. Please adjust target weight or months." &&
      recommendedCalories !==
        "Too few calories. Please adjust target weight or months." &&
      recommendedCalories !== ""
    ) {
      setCalorieGoal(parseInt(recommendedCalories));
    }
    const recommendedProtein = calculateRecommendedProtein();
    if (
      recommendedProtein !== "Invalid input for target weight" &&
      recommendedProtein !== ""
    ) {
      // Parse the range and take the average for the goal.
      const [min, max] = recommendedProtein.split(" - ").map(Number);
      setProteinGoal(Math.round((min + max) / 2));
    }
  }, [calculateRecommendedCalories, calculateRecommendedProtein]);

  const handleSaveProfile = () => {
    localStorage.setItem("calorieGoal", calorieGoal.toString());
    localStorage.setItem("proteinGoal", proteinGoal.toString());
    localStorage.setItem("currentWeight", currentWeight);
    localStorage.setItem("targetWeight", targetWeight);
    localStorage.setItem("targetMonths", targetMonths);
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved.",
    });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-4 gap-4 pb-32">
      <h1 className="text-4xl font-bold mb-2">Your Profile</h1>

      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Weight Management</CardTitle>
          <CardDescription>
            Enter your current and target weight to calculate your calorie goal.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentWeight">Current Weight (kg)</Label>
            <Input
              id="currentWeight"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              type="number"
              placeholder="Enter current weight"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetWeight">Target Weight (kg)</Label>
            <Input
              id="targetWeight"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              type="number"
              placeholder="Enter target weight"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetMonths">Months to Achieve Target</Label>
            <Input
              id="targetMonths"
              value={targetMonths}
              onChange={(e) => setTargetMonths(e.target.value)}
              type="number"
              placeholder="Enter months to achieve target"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recommendedCalories">
              Recommended Calorie Intake
            </Label>
            <Input
              id="recommendedCalories"
              value={calculateRecommendedCalories()}
              type="text"
              placeholder="Recommended calories"
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recommendedProtein">
              Recommended Protein Intake (g)
            </Label>
            <Input
              id="recommendedProtein"
              value={calculateRecommendedProtein()}
              type="text"
              placeholder="Recommended protein intake"
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="calorieGoal">Daily Calorie Goal</Label>
            <div className="flex items-center">
              <Input
                id="calorieGoal"
                value={calorieGoal}
                onChange={(e) => setCalorieGoal(parseInt(e.target.value))}
                type="number"
                className="w-24 mr-2"
              />
              <p>calories</p>
            </div>
            <Slider
              defaultValue={[calorieGoal]}
              max={5000}
              step={100}
              onValueChange={(value) => setCalorieGoal(value[0])}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proteinGoal">Daily Protein Goal (g)</Label>
            <div className="flex items-center">
              <Input
                id="proteinGoal"
                value={proteinGoal}
                onChange={(e) => setProteinGoal(parseInt(e.target.value))}
                type="number"
                className="w-24 mr-2"
              />
              <p>grams</p>
            </div>
            <Slider
              defaultValue={[proteinGoal]}
              max={300}
              step={5}
              onValueChange={(value) => setProteinGoal(value[0])}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveProfile}>Save Profile</Button>
    </div>
  );
};

export default ProfilePage;
