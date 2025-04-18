"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dumbbell, Utensils, Heart, Calendar, Star } from "lucide-react";

interface MarketplaceProps {
  userData: {
    fitnessGoals: string[];
    activityLevel: string;
    dietaryPreferences: string[];
  };
}

export function Marketplace({ userData }: MarketplaceProps) {
  const foodRecommendations = [
    {
      name: "Protein Power Bowl",
      restaurant: "Healthy Bites",
      calories: 450,
      protein: 30,
      carbs: 40,
      rating: 4.5,
      image: "/images/food-1.jpg",
    },
    {
      name: "Vegan Buddha Bowl",
      restaurant: "Green Plate",
      calories: 380,
      protein: 20,
      carbs: 45,
      rating: 4.8,
      image: "/images/food-2.jpg",
    },
  ];

  const dieticians = [
    {
      name: "Dr. Sarah Johnson",
      specialization: "Sports Nutrition",
      rating: 4.9,
      experience: "8 years",
      image: "/images/dietician-1.jpg",
    },
    {
      name: "Dr. Michael Chen",
      specialization: "Weight Management",
      rating: 4.7,
      experience: "6 years",
      image: "/images/dietician-2.jpg",
    },
  ];

  const lifestyleTips = [
    {
      title: "Morning Routine",
      description:
        "Start your day with 10 minutes of stretching and meditation",
      icon: Calendar,
    },
    {
      title: "Hydration",
      description: "Drink at least 2 liters of water daily",
      icon: Heart,
    },
    {
      title: "Active Breaks",
      description: "Take a 5-minute walk every hour",
      icon: Dumbbell,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Food Recommendations */}
      <Card id="recommended-meals">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Recommended Meals
          </CardTitle>
          <CardDescription>
            Based on your fitness goals and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {foodRecommendations.map((food, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={food.image}
                      alt={food.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{food.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {food.restaurant}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">{food.rating}</span>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Calories</span>
                        <p>{food.calories}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Protein</span>
                        <p>{food.protein}g</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Carbs</span>
                        <p>{food.carbs}g</p>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Order on Zomato
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dietician Recommendations */}
      <Card id="connect-dietician">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Connect with Dieticians
          </CardTitle>
          <CardDescription>
            Find the perfect dietician for your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dieticians.map((dietician, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={dietician.image}
                      alt={dietician.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{dietician.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {dietician.specialization}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">{dietician.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm mt-2">
                      Experience: {dietician.experience}
                    </p>
                    <Button className="w-full mt-4">Book Consultation</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            Lifestyle Tips
          </CardTitle>
          <CardDescription>Small changes for big results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lifestyleTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <tip.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {tip.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
