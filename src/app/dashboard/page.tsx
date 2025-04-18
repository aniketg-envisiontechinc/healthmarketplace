'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, isSameDay } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Activity, Flame, Target, Trophy, Zap, Heart, Dumbbell, ArrowRight, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Marketplace } from "@/components/Marketplace";
import { mealService } from '@/services/meal-service';
import { DailyNutrition } from '@/services/meal-service';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StepCounter } from '@/components/StepCounter';
import { WaterTracker } from '@/components/WaterTracker';
import { ActivityService } from '@/services/activity-service';

interface FitnessData {
  steps: number;
  calories: number;
  date: string;
}

const workoutSuggestions = [
  { name: "Morning Walk", duration: "30 min", calories: 150, icon: Activity },
  { name: "HIIT Workout", duration: "20 min", calories: 200, icon: Zap },
  { name: "Yoga Session", duration: "45 min", calories: 180, icon: Heart },
  { name: "Strength Training", duration: "40 min", calories: 250, icon: Dumbbell },
];

const Dashboard = () => {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dailySteps, setDailySteps] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [stepGoal, setStepGoal] = useState(10000);
  const [calorieGoal, setCalorieGoal] = useState(500);
  const [streak, setStreak] = useState(7);
  const [showAchievement, setShowAchievement] = useState(false);
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition | null>(null);
  const [dateRange, setDateRange] = useState<Date[]>([]);

  // Mock data for the chart
  const weeklyData = [
    { name: 'Mon', steps: 8000, calories: 320 },
    { name: 'Tue', steps: 9500, calories: 380 },
    { name: 'Wed', steps: 12000, calories: 480 },
    { name: 'Thu', steps: 7500, calories: 300 },
    { name: 'Fri', steps: 11000, calories: 440 },
    { name: 'Sat', steps: 13000, calories: 520 },
    { name: 'Sun', steps: 9000, calories: 360 },
  ];

  useEffect(() => {
    // Load goals from localStorage
    const storedStepGoal = localStorage.getItem('stepGoal');
    const storedCalorieGoal = localStorage.getItem('calorieGoal');
    
    if (storedStepGoal) setStepGoal(parseInt(storedStepGoal));
    if (storedCalorieGoal) setCalorieGoal(parseInt(storedCalorieGoal));

    // Simulate step counting with animation
    const interval = setInterval(() => {
      setDailySteps(prev => {
        const newSteps = prev + Math.floor(Math.random() * 10);
        setCaloriesBurned(Math.floor(newSteps * 0.04));
        
        // Show achievement when reaching step goal
        if (newSteps >= stepGoal && !showAchievement) {
          setShowAchievement(true);
          setTimeout(() => setShowAchievement(false), 3000);
        }
        
        return newSteps;
      });
    }, 5000);

    // Generate date range for the last 7 days
    const dates = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i));
    setDateRange(dates);

    // Load initial data
    loadDailyNutrition(selectedDate);

    return () => {
      clearInterval(interval);
    };
  }, [stepGoal, showAchievement, selectedDate]);

  const stepProgress = (dailySteps / stepGoal) * 100;
  const calorieProgress = (caloriesBurned / calorieGoal) * 100;

  const handleGoalChange = (type: 'steps' | 'calories', value: number) => {
    if (type === 'steps') {
      setStepGoal(value);
      localStorage.setItem('stepGoal', value.toString());
    } else {
      setCalorieGoal(value);
      localStorage.setItem('calorieGoal', value.toString());
    }
    
    toast({
      title: "Goal Updated",
      description: `Your ${type} goal has been updated to ${value}.`,
    });
  };

  // Mock data - in a real app, this would come from an API
  const userData = {
    steps: 8450,
    stepsGoal: 10000,
    calories: 450,
    caloriesGoal: 2000,
    water: 1.5,
    waterGoal: 2.5,
    fitnessGoals: ["weight_loss", "muscle_gain"],
    activityLevel: "moderate",
    dietaryPreferences: ["vegetarian", "low_carb"]
  };

  const loadDailyNutrition = (date: Date) => {
    const nutrition = mealService.getDailyNutrition(date);
    setDailyNutrition(nutrition);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    loadDailyNutrition(date);
  };

  const formatDate = (date: Date) => {
    return format(date, 'MMM d');
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Get started with your fitness journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => router.push('/dashboard/add-meal')}
              >
                <Plus className="h-6 w-6" />
                <span>Add Meal</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => router.push('/dashboard/workouts')}
              >
                <Plus className="h-6 w-6" />
                <span>Find Workout</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => router.push('/dashboard/dietician')}
              >
                <Plus className="h-6 w-6" />
                <span>Book Dietician</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Steps
                </CardTitle>
                <CardDescription>Today's progress</CardDescription>
              </CardHeader>
              <CardContent>
                <StepCounter />
                <div className="mt-4">
                  <Progress value={ActivityService.getStepsProgress()} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Calories
                </CardTitle>
                <CardDescription>Today's intake and burn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Calories Intake</span>
                      <span className="font-semibold">{dailyNutrition?.totalCalories || 0}</span>
                    </div>
                    <Progress value={(dailyNutrition?.totalCalories || 0) / userData.caloriesGoal * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Calories Burned</span>
                      <span className="font-semibold">450</span>
                    </div>
                    <Progress value={(450 / 500) * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net Calories</span>
                      <span className="font-semibold">
                        {(dailyNutrition?.totalCalories || 0) - 450}
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(100, Math.max(0, ((dailyNutrition?.totalCalories || 0) - 450) / userData.caloriesGoal * 100))} 
                      className={((dailyNutrition?.totalCalories || 0) - 450) > 0 ? "bg-red-100" : "bg-green-100"}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Water
                </CardTitle>
                <CardDescription>Today's intake</CardDescription>
              </CardHeader>
              <CardContent>
                <WaterTracker />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Marketplace Section */}
        <Marketplace userData={userData} />
      </div>
    </div>
  );
};

export default Dashboard;