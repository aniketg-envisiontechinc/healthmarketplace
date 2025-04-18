"use client";

import { useState, useEffect } from "react";
import { format, subDays, isSameDay } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mealService } from "@/services/meal-service";
import { DailyNutrition } from "@/services/meal-service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActivityPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition | null>(
    null,
  );
  const [dateRange, setDateRange] = useState<Date[]>([]);

  useEffect(() => {
    // Generate date range for the last 7 days
    const dates = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i));
    setDateRange(dates);

    // Load initial data
    loadDailyNutrition(selectedDate);
  }, [selectedDate]);

  const loadDailyNutrition = (date: Date) => {
    const nutrition = mealService.getDailyNutrition(date);
    setDailyNutrition(nutrition);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    loadDailyNutrition(date);
  };

  const formatDate = (date: Date) => {
    return format(date, "MMM d");
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "h:mm a");
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Activity</h1>
          <p className="text-muted-foreground">
            Track your daily activities and nutrition
          </p>
        </div>

        {/* Today's Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Activity</CardTitle>
            <CardDescription>Your activity summary for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Steps</p>
                <p className="text-2xl font-bold">8,240</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Calories Burned</p>
                <p className="text-2xl font-bold">450</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Calories Intake</p>
                <p className="text-2xl font-bold">
                  {dailyNutrition?.totalCalories || 0}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Net Calories</p>
                <p className="text-2xl font-bold">
                  {(dailyNutrition?.totalCalories || 0) - 450}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Food Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Food Activity</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard/add-meal")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Meal
            </Button>
          </div>

          {/* Date Selector */}
          <div className="flex items-center justify-between space-x-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1 flex space-x-2 overflow-x-auto py-2">
              {dateRange.map((date) => (
                <Button
                  key={date.toISOString()}
                  variant={
                    isSameDay(date, selectedDate) ? "default" : "outline"
                  }
                  className="flex-1 min-w-[100px]"
                  onClick={() => handleDateClick(date)}
                >
                  {formatDate(date)}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Daily Summary */}
          {dailyNutrition && (
            <Card>
              <CardHeader>
                <CardTitle>Daily Summary</CardTitle>
                <CardDescription>
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Total Calories
                    </p>
                    <p className="text-2xl font-bold">
                      {dailyNutrition.totalCalories}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Protein</p>
                    <p className="text-2xl font-bold">
                      {dailyNutrition.totalProtein}g
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Carbs</p>
                    <p className="text-2xl font-bold">
                      {dailyNutrition.totalCarbs}g
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fat</p>
                    <p className="text-2xl font-bold">
                      {dailyNutrition.totalFat}g
                    </p>
                  </div>
                </div>

                {/* Meals List */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Meals</h3>
                  {dailyNutrition.meals.length > 0 ? (
                    dailyNutrition.meals.map((meal) => (
                      <Card key={meal.id} className="mb-4">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">
                              {meal.name}
                            </CardTitle>
                            <span className="text-sm text-muted-foreground">
                              {formatTime(meal.date)}
                            </span>
                          </div>
                          {meal.description && (
                            <CardDescription>
                              {meal.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
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
                              {meal.foodItems.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">
                                    {item.name}
                                  </TableCell>
                                  <TableCell>{item.portionSize}</TableCell>
                                  <TableCell>
                                    {item.nutrition.calories}
                                  </TableCell>
                                  <TableCell>
                                    {item.nutrition.protein}g
                                  </TableCell>
                                  <TableCell>
                                    {item.nutrition.carbohydrates}g
                                  </TableCell>
                                  <TableCell>{item.nutrition.fat}g</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No meals recorded for this day
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
