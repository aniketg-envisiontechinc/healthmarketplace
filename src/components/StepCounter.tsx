"use client";

import { useEffect, useState } from "react";
import { ActivityService } from "@/services/activity-service";
import { Progress } from "@/components/ui/progress";
import { Activity } from "lucide-react";

export function StepCounter() {
  const [steps, setSteps] = useState(0);
  const STEPS_GOAL = 10000;

  useEffect(() => {
    let lastUpdate = 0;
    let stepCount = 0;
    let lastAcceleration = 0;

    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.acceleration?.y || 0;
      const currentTime = Date.now();

      if (currentTime - lastUpdate > 300) {
        if (Math.abs(acceleration - lastAcceleration) > 1.5) {
          stepCount++;
          setSteps(stepCount);
          ActivityService.addSteps(1);
        }

        lastUpdate = currentTime;
        lastAcceleration = acceleration;
      }
    };

    window.addEventListener("devicemotion", handleMotion as EventListener);

    return () => {
      window.removeEventListener("devicemotion", handleMotion as EventListener);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold">Steps</h3>
          <p className="text-sm text-muted-foreground">
            {steps.toLocaleString()} / {STEPS_GOAL.toLocaleString()} steps
          </p>
        </div>
      </div>
      <Progress value={(steps / STEPS_GOAL) * 100} />
    </div>
  );
}
