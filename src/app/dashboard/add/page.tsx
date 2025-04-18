'use client';

import {useState, useCallback} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {identifyFoodFromImage} from "@/ai/flows/identify-food-from-image";
import {Nutrition} from "@/services/nutritionix";
import {useToast} from "@/hooks/use-toast";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {format} from "date-fns";
import {Loader2, Calendar, Upload, Save, Edit2} from "lucide-react";
import {DatePicker} from "@/components/ui/date-picker";
import {cn} from "@/lib/utils";

interface FoodItem {
  name: string;
  portionSize: string;
  nutrition: Nutrition | null;
  date: string;
}

const AddFoodPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const router = useRouter();
  const [editingItem, setEditingItem] = useState<number | null>(null);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (!file) {
      setLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageUrl = reader.result as string;
      setImage(imageUrl);

      try {
        const result = await identifyFoodFromImage({photoUrl: imageUrl});
        const itemsWithDate = result.foodItems.map(item => ({
          ...item,
          nutrition: item.nutrition || {
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0
          },
          date: date ? format(date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
        }));
        setFoodItems(itemsWithDate);

        toast({
          title: "Food Identified!",
          description: `We identified ${result.foodItems.length} food items. Save them to your daily plan.`,
        });

      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error Identifying Food",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  }, [toast, date]);

  const handleEditNutrition = (index: number, field: keyof Nutrition, value: string) => {
    const newFoodItems = [...foodItems];
    if (!newFoodItems[index].nutrition) {
      newFoodItems[index].nutrition = {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
      };
    }
    newFoodItems[index].nutrition![field] = parseFloat(value) || 0;
    setFoodItems(newFoodItems);
  };

  const handleSaveFoodItems = useCallback(async () => {
    setLoading(true);
    try {
      if (!foodItems.length) {
        toast({
          variant: "destructive",
          title: "No Food Items",
          description: "No food items to save."
        });
        setLoading(false);
        return;
      }
      if (!date) {
        toast({
          variant: "destructive",
          title: "No Date Selected",
          description: "Please select a date."
        });
        setLoading(false);
        return;
      }

      const storedFoodItems = localStorage.getItem('savedFoodItems');
      const savedFoodItems: FoodItem[] = storedFoodItems ? JSON.parse(storedFoodItems) : [];
      const updatedFoodItems = [...savedFoodItems, ...foodItems];
      localStorage.setItem('savedFoodItems', JSON.stringify(updatedFoodItems));

      toast({
        title: "Food Saved!",
        description: `Saved ${foodItems.length} food items to your daily plan.`,
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Saving Food",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }, [foodItems, date, toast, router]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8 px-4 gap-6 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Add Food Item</h1>
            <p className="text-muted-foreground mt-2">Track your meals and nutrition</p>
          </div>
          <DatePicker
            date={date}
            setDate={setDate}
            className="w-[200px]"
          />
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Upload Your Meal</CardTitle>
            <CardDescription>Take a photo or upload an image of your meal to analyze its nutritional content.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="imageUpload"
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer",
                    "hover:bg-accent/50 transition-colors",
                    loading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or JPEG (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {image && (
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Identified Food Items</CardTitle>
              <CardDescription>Review and edit the nutritional values if needed.</CardDescription>
            </CardHeader>
            <CardContent>
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
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {foodItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.portionSize}</TableCell>
                        <TableCell>
                          {editingItem === index ? (
                            <Input
                              type="number"
                              value={item.nutrition?.calories || 0}
                              onChange={(e) => handleEditNutrition(index, 'calories', e.target.value)}
                              className="w-20"
                            />
                          ) : (
                            item.nutrition?.calories || 'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          {editingItem === index ? (
                            <Input
                              type="number"
                              value={item.nutrition?.protein || 0}
                              onChange={(e) => handleEditNutrition(index, 'protein', e.target.value)}
                              className="w-20"
                            />
                          ) : (
                            item.nutrition?.protein || 'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          {editingItem === index ? (
                            <Input
                              type="number"
                              value={item.nutrition?.carbohydrates || 0}
                              onChange={(e) => handleEditNutrition(index, 'carbohydrates', e.target.value)}
                              className="w-20"
                            />
                          ) : (
                            item.nutrition?.carbohydrates || 'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          {editingItem === index ? (
                            <Input
                              type="number"
                              value={item.nutrition?.fat || 0}
                              onChange={(e) => handleEditNutrition(index, 'fat', e.target.value)}
                              className="w-20"
                            />
                          ) : (
                            item.nutrition?.fat || 'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingItem(editingItem === index ? null : index)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {foodItems.length > 0 && (
                <div className="mt-6">
                  <Button
                    onClick={handleSaveFoodItems}
                    disabled={loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Food Items
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AddFoodPage;
