"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Camera, Image, Activity, Flame } from "lucide-react";
import { motion } from "framer-motion";

interface ActivityData {
  type: string;
  duration: number;
  calories: number;
  image?: string;
  notes?: string;
  date: string;
}

export function AddActivity() {
  const [activityType, setActivityType] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const activityData: ActivityData = {
        type: activityType,
        duration: parseInt(duration),
        calories: parseInt(calories),
        image: image || undefined,
        notes,
        date: new Date().toISOString(),
      };

      // Save to localStorage
      const existingActivities = JSON.parse(
        localStorage.getItem("activities") || "[]",
      );
      localStorage.setItem(
        "activities",
        JSON.stringify([...existingActivities, activityData]),
      );

      toast({
        title: "Activity Added",
        description: "Your activity has been successfully recorded!",
      });

      // Reset form
      setActivityType("");
      setDuration("");
      setCalories("");
      setImage(null);
      setNotes("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add activity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Add New Activity
          </CardTitle>
          <CardDescription>Record your workout or activity</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="activityType">Activity Type</Label>
              <Input
                id="activityType"
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                placeholder="e.g., Running, Yoga, Swimming"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter duration in minutes"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calories">Calories Burned</Label>
              <Input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Enter calories burned"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Activity Image</Label>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Camera className="h-5 w-5" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {image && (
                <div className="mt-2">
                  <img
                    src={image}
                    alt="Activity"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about your activity..."
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Activity"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
