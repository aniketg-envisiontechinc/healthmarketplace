'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowRight, Flame, Target, Trophy, Zap, Heart, Dumbbell, Star, Medal, Crown, Footprints, Utensils, BookOpen, TrendingUp, Clock, Award } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AddActivity } from "@/components/AddActivity";
import { AddMeal } from "@/components/AddMeal";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { LoadingScreen } from "@/components/LoadingScreen";
import Image from "next/image";

const healthTips = [
  {
    title: "Protein Intake",
    description: "Aim for 0.8-1.2g of protein per pound of body weight for optimal muscle growth.",
    icon: Dumbbell,
  },
  {
    title: "Hydration",
    description: "Drink at least 8 glasses of water daily to maintain optimal performance.",
    icon: Heart,
  },
  {
    title: "Sleep Quality",
    description: "7-9 hours of quality sleep is essential for recovery and muscle growth.",
    icon: Clock,
  },
];

const featuredArticles = [
  {
    title: "The Science of Weight Loss",
    description: "Understanding the fundamentals of calorie deficit and metabolism.",
    category: "Weight Management",
  },
  {
    title: "Building Muscle 101",
    description: "Essential exercises and nutrition for muscle growth.",
    category: "Fitness",
  },
  {
    title: "Meal Prep Guide",
    description: "How to prepare healthy meals for the week ahead.",
    category: "Nutrition",
  },
];

const achievements = [
  { id: 1, name: "First Steps", description: "Complete your first activity", icon: Star, progress: 100 },
  { id: 2, name: "Week Warrior", description: "Complete 7 days of activities", icon: Medal, progress: 85 },
  { id: 3, name: "Calorie King", description: "Burn 10,000 calories", icon: Crown, progress: 60 },
];

const workoutChallenges = [
  { name: "30-Day Challenge", progress: 75, daysLeft: 7, reward: "Exclusive Badge" },
  { name: "Weekend Warrior", progress: 50, daysLeft: 2, reward: "100 Points" },
  { name: "Morning Routine", progress: 30, daysLeft: 5, reward: "50 Points" },
];

export default function Home() {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [level, setLevel] = useState(5);
  const [points, setPoints] = useState(1250);
  const [streak, setStreak] = useState(7);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Load user data from localStorage
    const storedLevel = localStorage.getItem('userLevel');
    const storedPoints = localStorage.getItem('userPoints');
    const storedStreak = localStorage.getItem('userStreak');
    
    if (storedLevel) setLevel(parseInt(storedLevel));
    if (storedPoints) setPoints(parseInt(storedPoints));
    if (storedStreak) setStreak(parseInt(storedStreak));

    // Check if user has completed onboarding
    const userData = localStorage.getItem('userData');
    if (!userData) {
      router.push('/onboarding');
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8 gap-8 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 relative w-full max-w-4xl px-4"
      >
        <div className="relative h-64 w-full rounded-lg overflow-hidden mb-8">
          <Image
            src="/images/hero-fitness.jpg"
            alt="Fitness Motivation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold text-white">Welcome to FitTrack</h1>
            <p className="text-xl text-white/80">Your personal fitness companion</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl px-4">
        {/* Quick Actions */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start tracking your fitness journey</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              className="w-full" 
              onClick={() => setShowAddActivity(true)}
            >
              <Activity className="mr-2 h-4 w-4" />
              Track Activity
            </Button>
            <AddMeal />
            <Link href="/dashboard" className="col-span-2">
              <Button variant="outline" className="w-full">
                <ArrowRight className="mr-2 h-4 w-4" />
                View Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Health Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Health Tips</CardTitle>
            <CardDescription>Expert advice for your fitness journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-muted rounded-lg"
              >
                <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={`/images/tip-${index + 1}.jpg`}
                    alt={tip.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Daily Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Goals</CardTitle>
            <CardDescription>Track your daily progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-32 w-full rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/daily-goals.jpg"
                alt="Daily Goals"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Footprints className="h-4 w-4" />
                  <span>Steps</span>
                </div>
                <span className="text-muted-foreground">3,500 / 10,000</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4" />
                  <span>Calories</span>
                </div>
                <span className="text-muted-foreground">1,200 / 2,000</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  <span>Meals</span>
                </div>
                <span className="text-muted-foreground">2 / 3</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Featured Articles */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Featured Articles</CardTitle>
            <CardDescription>Learn from expert insights</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-48 w-full rounded-lg overflow-hidden mb-2">
                  <Image
                    src={`/images/article-${index + 1}.jpg`}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{article.description}</p>
                <span className="text-xs text-primary">{article.category}</span>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest fitness achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-32 w-full rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/recent-activity.jpg"
                alt="Recent Activity"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Morning Walk</span>
                <span className="text-muted-foreground">30 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Breakfast</span>
                <span className="text-muted-foreground">450 cal</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Lunch</span>
                <span className="text-muted-foreground">650 cal</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Challenges */}
        <Card>
          <CardHeader>
            <CardTitle>Active Challenges</CardTitle>
            <CardDescription>Complete challenges to earn rewards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-32 w-full rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/challenges.jpg"
                alt="Active Challenges"
                fill
                className="object-cover"
              />
            </div>
            {workoutChallenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{challenge.name}</span>
                  <span className="text-sm text-muted-foreground">{challenge.daysLeft} days left</span>
                </div>
                <Progress value={challenge.progress} className="h-2" />
                <span className="text-sm text-muted-foreground">Reward: {challenge.reward}</span>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      <AnimatePresence>
        {showAddActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowAddActivity(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AddActivity />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
