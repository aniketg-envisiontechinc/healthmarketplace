"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Camera, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { identifyFoodFromImage } from "@/ai/flows/identify-food-from-image";
import { refineNutritionData } from "@/ai/flows/refine-nutrition-data";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { analyzeNutrition } from "@/ai/flows/analyze-nutrition";
import { mealService } from "@/services/meal-service";

interface FoodItem {
  name: string;
  portionSize: string;
  nutrition: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  };
  confidence: number;
}

interface MealData {
  name: string;
  description: string;
  imageUrl?: string;
  foodItems: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

const steps = [
  {
    id: 1,
    title: "Upload Meal Photo",
    description: "Take a photo or upload an image of your meal",
  },
  {
    id: 2,
    title: "Review Analysis",
    description: "Check the identified food items and nutrition details",
  },
  {
    id: 3,
    title: "Save Meal",
    description: "Add any notes and save to your food log",
  },
];

const uploadImage = async (file: File): Promise<string> => {
  // For now, we'll convert to base64
  // In production, you'd want to upload to a storage service
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function AddMealPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [mealData, setMealData] = useState<MealData>({
    name: "",
    description: "",
    foodItems: [],
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Upload image to storage
      const imageUrl = await uploadImage(file);
      setMealData((prev) => ({ ...prev, imageUrl }));

      // Analyze image with Gemini
      const response = await identifyFoodFromImage({ photoUrl: imageUrl });
      const foodItems = response.foodItems;

      // Process each food item with nutrition analysis
      const processedItems = await Promise.all(
        foodItems.map(async (item) => {
          const nutrition = await analyzeNutrition({
            foodName: item.name,
            portionSize: item.portionSize,
          });

          return {
            name: item.name,
            portionSize: item.portionSize,
            nutrition: {
              calories: nutrition.calories,
              protein: nutrition.protein,
              carbohydrates: nutrition.carbohydrates,
              fat: nutrition.fat,
            },
            confidence: nutrition.confidence,
          };
        }),
      );

      // Calculate totals
      const totals = processedItems.reduce(
        (acc, item) => ({
          calories: acc.calories + item.nutrition.calories,
          protein: acc.protein + item.nutrition.protein,
          carbs: acc.carbs + item.nutrition.carbohydrates,
          fat: acc.fat + item.nutrition.fat,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 },
      );

      // Create meal name from food items
      const mealName = processedItems.map((item) => item.name).join(" + ");

      setMealData((prev) => ({
        ...prev,
        name: mealName,
        foodItems: processedItems,
        totalCalories: totals.calories,
        totalProtein: totals.protein,
        totalCarbs: totals.carbs,
        totalFat: totals.fat,
      }));

      setCurrentStep(2);
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Error",
        description: "Failed to process the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveMeal = () => {
    try {
      const savedMeal = mealService.saveMeal({
        ...mealData,
        date: new Date().toISOString(),
      });

      toast({
        title: "Meal Saved",
        description: "Your meal has been successfully tracked.",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving meal:", error);
      toast({
        title: "Error",
        description: "Failed to save the meal. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Track Your Meal</h1>
          <p className="text-muted-foreground">
            Follow these steps to log your meal and track its nutritional
            content.
          </p>
        </div>

        <div className="space-y-4">
          <Progress
            value={(currentStep / steps.length) * 100}
            className="h-2"
          />
          <div className="grid grid-cols-3 gap-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 ${
                  currentStep >= step.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.id
                        ? "bg-primary/20"
                        : "bg-muted"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Meal Photo</CardTitle>
              <CardDescription>
                Take a photo or upload an image of your meal to analyze its
                nutritional content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
                >
                  {isUploading ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : (
                    <>
                      <Camera className="h-8 w-8 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                    </>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meal Analysis</CardTitle>
                <CardDescription>
                  Review the identified food items and their nutritional
                  content.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Total Calories
                      </p>
                      <p className="text-2xl font-bold">
                        {mealData.totalCalories}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Protein</p>
                      <p className="text-2xl font-bold">
                        {mealData.totalProtein}g
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Carbs</p>
                      <p className="text-2xl font-bold">
                        {mealData.totalCarbs}g
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Fat</p>
                      <p className="text-2xl font-bold">{mealData.totalFat}g</p>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Food Item</TableHead>
                          <TableHead>Portion</TableHead>
                          <TableHead>Calories</TableHead>
                          <TableHead>Protein</TableHead>
                          <TableHead>Carbs</TableHead>
                          <TableHead>Fat</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mealData.foodItems.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell>{item.portionSize}</TableCell>
                            <TableCell>
                              {item.nutrition?.calories || 0}
                            </TableCell>
                            <TableCell>
                              {item.nutrition?.protein || 0}g
                            </TableCell>
                            <TableCell>
                              {item.nutrition?.carbohydrates || 0}g
                            </TableCell>
                            <TableCell>{item.nutrition?.fat || 0}g</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              <Button onClick={() => setCurrentStep(3)}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Details</CardTitle>
                <CardDescription>
                  Add any additional information about your meal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Meal Name</Label>
                  <Input
                    id="name"
                    value={mealData.name}
                    onChange={(e) =>
                      setMealData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g., Lunch - Chicken Salad"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Notes</Label>
                  <Textarea
                    id="description"
                    value={mealData.description}
                    onChange={(e) =>
                      setMealData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Add any notes about the meal"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleSaveMeal}>Save Meal</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
