'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Activity, Target, Heart, Dumbbell } from "lucide-react";

interface UserData {
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  targetWeight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  fitnessGoals: string[];
  dietaryPreferences: string[];
}

interface ValidationErrors {
  name?: string;
  age?: string;
  gender?: string;
  height?: string;
  weight?: string;
  targetWeight?: string;
  activityLevel?: string;
  fitnessGoals?: string;
  dietaryPreferences?: string;
}

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
  { value: 'light', label: 'Lightly active (1-3 days/week)' },
  { value: 'moderate', label: 'Moderately active (3-5 days/week)' },
  { value: 'active', label: 'Very active (6-7 days/week)' },
  { value: 'very_active', label: 'Extra active (very active & physical job)' },
];

const fitnessGoals = [
  { id: 'weight_loss', label: 'Weight Loss', icon: Target },
  { id: 'muscle_gain', label: 'Muscle Gain', icon: Dumbbell },
  { id: 'endurance', label: 'Endurance', icon: Activity },
  { id: 'maintenance', label: 'Maintenance', icon: Heart },
];

const dietaryPreferences = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'low_carb', label: 'Low Carb' },
  { id: 'keto', label: 'Keto' },
  { id: 'paleo', label: 'Paleo' },
  { id: 'mediterranean', label: 'Mediterranean' },
];

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: 25,
    gender: '',
    height: 170,
    weight: 70,
    targetWeight: 65,
    activityLevel: 'moderate',
    fitnessGoals: [],
    dietaryPreferences: [],
  });
  const { toast } = useToast();

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    switch (step) {
      case 1:
        if (!userData.name.trim()) {
          newErrors.name = 'Name is required';
          isValid = false;
        }
        if (!userData.age || userData.age < 13 || userData.age > 120) {
          newErrors.age = 'Please enter a valid age between 13 and 120';
          isValid = false;
        }
        if (!userData.gender) {
          newErrors.gender = 'Please select your gender';
          isValid = false;
        }
        break;
      case 2:
        if (!userData.height || userData.height < 100 || userData.height > 250) {
          newErrors.height = 'Please enter a valid height between 100cm and 250cm';
          isValid = false;
        }
        if (!userData.weight || userData.weight < 30 || userData.weight > 300) {
          newErrors.weight = 'Please enter a valid weight between 30kg and 300kg';
          isValid = false;
        }
        if (!userData.targetWeight || userData.targetWeight < 30 || userData.targetWeight > 300) {
          newErrors.targetWeight = 'Please enter a valid target weight between 30kg and 300kg';
          isValid = false;
        }
        break;
      case 3:
        if (!userData.activityLevel) {
          newErrors.activityLevel = 'Please select your activity level';
          isValid = false;
        }
        if (userData.fitnessGoals.length === 0) {
          newErrors.fitnessGoals = 'Please select at least one fitness goal';
          isValid = false;
        }
        break;
      case 4:
        if (userData.dietaryPreferences.length === 0) {
          newErrors.dietaryPreferences = 'Please select at least one dietary preference';
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      });
      return;
    }

    if (step < 4) {
      setStep(step + 1);
      setErrors({}); // Clear errors when moving to next step
    } else {
      localStorage.setItem('userData', JSON.stringify(userData));
      toast({
        title: "Setup Complete!",
        description: "Your fitness journey begins now!",
      });
      window.location.href = '/';
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({}); // Clear errors when going back
    }
  };

  const updateUserData = (field: keyof UserData, value: any) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    // Clear error for the field being updated
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label className="text-white text-sm font-medium">What's your name?</Label>
              <Input
                className={`bg-[#1A1A1A] border-[#2A2A2A] text-white h-12 placeholder:text-[#4A4A4A] ${errors.name ? 'border-red-500' : ''}`}
                value={userData.name}
                onChange={(e) => updateUserData('name', e.target.value)}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-white text-sm font-medium">How old are you?</Label>
              <Input
                className={`bg-[#1A1A1A] border-[#2A2A2A] text-white h-12 placeholder:text-[#4A4A4A] ${errors.age ? 'border-red-500' : ''}`}
                type="number"
                value={userData.age.toString()}
                onChange={(e) => updateUserData('age', parseInt(e.target.value) || 0)}
                placeholder="Enter your age"
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>
            <div className="space-y-3">
              <Label className="text-white text-sm font-medium">What's your gender?</Label>
              <RadioGroup
                value={userData.gender}
                onValueChange={(value) => updateUserData('gender', value)}
                className="grid grid-cols-3 gap-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" className="border-[#2A2A2A] data-[state=checked]:bg-white" />
                  <Label htmlFor="male" className="text-white text-sm">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" className="border-[#2A2A2A] data-[state=checked]:bg-white" />
                  <Label htmlFor="female" className="text-white text-sm">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" className="border-[#2A2A2A] data-[state=checked]:bg-white" />
                  <Label htmlFor="other" className="text-white text-sm">Other</Label>
                </div>
              </RadioGroup>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <Label className="text-white text-sm font-medium">Height (cm)</Label>
              <Slider
                value={[userData.height]}
                onValueChange={([value]) => updateUserData('height', value)}
                min={100}
                max={250}
                step={1}
                className={`text-white ${errors.height ? 'border-red-500' : ''}`}
              />
              <div className="text-center text-white text-lg font-medium">{userData.height} cm</div>
              {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
            </div>
            <div className="space-y-3">
              <Label className="text-white text-sm font-medium">Current Weight (kg)</Label>
              <Slider
                value={[userData.weight]}
                onValueChange={([value]) => updateUserData('weight', value)}
                min={30}
                max={200}
                step={1}
                className={`text-white ${errors.weight ? 'border-red-500' : ''}`}
              />
              <div className="text-center text-white text-lg font-medium">{userData.weight} kg</div>
              {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
            </div>
            <div className="space-y-3">
              <Label className="text-white text-sm font-medium">Target Weight (kg)</Label>
              <Slider
                value={[userData.targetWeight]}
                onValueChange={([value]) => updateUserData('targetWeight', value)}
                min={30}
                max={200}
                step={1}
                className={`text-white ${errors.targetWeight ? 'border-red-500' : ''}`}
              />
              <div className="text-center text-white text-lg font-medium">{userData.targetWeight} kg</div>
              {errors.targetWeight && <p className="text-red-500 text-sm">{errors.targetWeight}</p>}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label className="text-white text-sm font-medium">Activity Level</Label>
              <Select
                value={userData.activityLevel}
                onValueChange={(value) => updateUserData('activityLevel', value)}
              >
                <SelectTrigger className={`bg-[#1A1A1A] border-[#2A2A2A] text-white h-12 ${errors.activityLevel ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select your activity level" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A] text-white">
                  {activityLevels.map((level) => (
                    <SelectItem 
                      key={level.value} 
                      value={level.value} 
                      className="hover:bg-[#2A2A2A] focus:bg-[#2A2A2A]"
                    >
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.activityLevel && <p className="text-red-500 text-sm">{errors.activityLevel}</p>}
            </div>
            <div className="space-y-3">
              <Label className="text-white text-sm font-medium">Fitness Goals</Label>
              <div className="grid grid-cols-2 gap-3">
                {fitnessGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                      userData.fitnessGoals.includes(goal.id)
                        ? 'border-white bg-white/10 text-white'
                        : 'border-[#2A2A2A] text-[#8B8B8B] hover:border-[#3A3A3A]'
                    }`}
                    onClick={() => {
                      const newGoals = userData.fitnessGoals.includes(goal.id)
                        ? userData.fitnessGoals.filter(g => g !== goal.id)
                        : [...userData.fitnessGoals, goal.id];
                      updateUserData('fitnessGoals', newGoals);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <goal.icon className="h-5 w-5" />
                      <span className="font-medium">{goal.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              {errors.fitnessGoals && <p className="text-red-500 text-sm">{errors.fitnessGoals}</p>}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <Label className="text-white text-sm font-medium">Dietary Preferences</Label>
              <div className="grid grid-cols-2 gap-3">
                {dietaryPreferences.map((pref) => (
                  <div
                    key={pref.id}
                    className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                      userData.dietaryPreferences.includes(pref.id)
                        ? 'border-white bg-white/10 text-white'
                        : 'border-[#2A2A2A] text-[#8B8B8B] hover:border-[#3A3A3A]'
                    }`}
                    onClick={() => {
                      const newPrefs = userData.dietaryPreferences.includes(pref.id)
                        ? userData.dietaryPreferences.filter(p => p !== pref.id)
                        : [...userData.dietaryPreferences, pref.id];
                      updateUserData('dietaryPreferences', newPrefs);
                    }}
                  >
                    <span className="font-medium">{pref.label}</span>
                  </div>
                ))}
              </div>
              {errors.dietaryPreferences && <p className="text-red-500 text-sm">{errors.dietaryPreferences}</p>}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#0A0A0A]">
      <div className="w-full max-w-[420px]">
        <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
          <CardHeader className="space-y-3 pb-6">
            <CardTitle className="text-2xl font-semibold text-white tracking-tight">
              {step === 1 && "Welcome to FitTrack"}
              {step === 2 && "Your Body Stats"}
              {step === 3 && "Activity & Goals"}
              {step === 4 && "Dietary Preferences"}
            </CardTitle>
            <CardDescription className="text-[#8B8B8B] text-base">
              {step === 1 && "Let's get to know you better"}
              {step === 2 && "Help us understand your starting point"}
              {step === 3 && "What are you aiming to achieve?"}
              {step === 4 && "Tell us about your eating habits"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="border-[#1A1A1A] text-white hover:bg-[#1A1A1A] h-12 px-6"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
              <Button 
                onClick={handleNext} 
                className="ml-auto bg-white text-black hover:bg-gray-100 h-12 px-8 font-medium"
              >
                {step === 4 ? "Get Started" : "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 