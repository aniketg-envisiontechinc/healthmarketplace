"use client";

import { useState } from "react";
import { ActivityService } from "@/services/activity-service";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function WaterTracker() {
  const [waterIntake, setWaterIntake] = useState(0);
  const WATER_GOAL = 2500; // 2.5L in ml

  const addWater = (amount: number) => {
    const newAmount = waterIntake + amount;
    setWaterIntake(newAmount);
    ActivityService.addWater(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Water Intake</h3>
          <p className="text-sm text-muted-foreground">
            {waterIntake}ml / {WATER_GOAL}ml
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => addWater(250)}>
            +250ml
          </Button>
          <Button variant="outline" size="sm" onClick={() => addWater(500)}>
            +500ml
          </Button>
        </div>
      </div>
      <Progress value={(waterIntake / WATER_GOAL) * 100} />
    </div>
  );
}
