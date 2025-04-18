'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Target, Trophy, Calendar } from "lucide-react";

interface Goal {
  type: 'steps' | 'calories' | 'weight';
  target: number;
  current: number;
  deadline: string;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    { type: 'steps', target: 10000, current: 0, deadline: '2024-12-31' },
    { type: 'calories', target: 500, current: 0, deadline: '2024-12-31' },
    { type: 'weight', target: 70, current: 75, deadline: '2024-12-31' },
  ]);
  const { toast } = useToast();

  useEffect(() => {
    // Load goals from localStorage
    const storedGoals = localStorage.getItem('fitnessGoals');
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  const handleGoalChange = (index: number, value: number) => {
    const newGoals = [...goals];
    newGoals[index].target = value;
    setGoals(newGoals);
    localStorage.setItem('fitnessGoals', JSON.stringify(newGoals));
    
    toast({
      title: "Goal Updated",
      description: `Your ${goals[index].type} goal has been updated to ${value}.`,
    });
  };

  const getProgress = (goal: Goal) => {
    if (goal.type === 'weight') {
      return ((goal.current - goal.target) / (goal.current - goal.target)) * 100;
    }
    return (goal.current / goal.target) * 100;
  };

  const getProgressColor = (goal: Goal) => {
    const progress = getProgress(goal);
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-4 gap-4 pb-20">
      <h1 className="text-4xl font-bold mb-2">Your Fitness Goals</h1>

      <div className="grid grid-cols-1 gap-4 w-full max-w-4xl px-4">
        {goals.map((goal, index) => (
          <Card key={goal.type}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {goal.type.charAt(0).toUpperCase() + goal.type.slice(1)} Goal
              </CardTitle>
              <CardDescription>
                Target: {goal.target} {goal.type === 'weight' ? 'kg' : goal.type === 'calories' ? 'calories' : 'steps'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Current Progress</Label>
                  <span className="text-sm text-muted-foreground">
                    {goal.current} / {goal.target}
                  </span>
                </div>
                <Progress 
                  value={getProgress(goal)} 
                  className={getProgressColor(goal)}
                />
              </div>

              <div className="space-y-2">
                <Label>Adjust Target</Label>
                <Slider
                  value={[goal.target]}
                  onValueChange={([value]) => handleGoalChange(index, value)}
                  min={goal.type === 'steps' ? 1000 : goal.type === 'calories' ? 100 : 50}
                  max={goal.type === 'steps' ? 20000 : goal.type === 'calories' ? 1000 : 100}
                  step={goal.type === 'steps' ? 1000 : goal.type === 'calories' ? 50 : 1}
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Target Date: {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Achievements
            </CardTitle>
            <CardDescription>Your fitness milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div>
                <h3 className="font-semibold">7-Day Streak</h3>
                <p className="text-sm text-muted-foreground">You've hit your step goal for 7 days in a row!</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div>
                <h3 className="font-semibold">Calorie Master</h3>
                <p className="text-sm text-muted-foreground">You've burned 5000 calories this week!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 