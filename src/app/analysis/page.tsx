'use client';

import {useState, useEffect} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {format, subWeeks, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth} from 'date-fns';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

interface FoodItem {
  name: string;
  portionSize: string;
  nutrition: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  } | null;
  date: string;
}

const AnalysisPage = () => {
  const [timeFrame, setTimeFrame] = useState<'week' | 'month'>('week');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const storedFoodItems = localStorage.getItem('savedFoodItems');
    const savedFoodItems: FoodItem[] = storedFoodItems ? JSON.parse(storedFoodItems) : [];

    const calculateData = () => {
      const today = new Date();
      let startDate;
      let endDate;

      if (timeFrame === 'week') {
        startDate = subWeeks(today, 1);
        startDate = startOfWeek(startDate, {weekStartsOn: 1});
        endDate = endOfWeek(today, {weekStartsOn: 1});
      } else {
        startDate = subMonths(today, 1);
        startDate = startOfMonth(startDate);
        endDate = endOfMonth(today);
      }

      const dailyData: { [date: string]: { calories: number; protein: number } } = {};

      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const formattedDate = format(currentDate, 'yyyy-MM-dd');
        dailyData[formattedDate] = {calories: 0, protein: 0};
        currentDate.setDate(currentDate.getDate() + 1);
      }

      savedFoodItems.forEach(item => {
        const itemDate = new Date(item.date);
        if (itemDate >= startDate && itemDate <= endDate && item.nutrition) {
          const formattedDate = format(itemDate, 'yyyy-MM-dd');
          dailyData[formattedDate].calories += item.nutrition.calories;
          dailyData[formattedDate].protein += item.nutrition.protein;
        }
      });

      const chartData = Object.entries(dailyData).map(([date, values]) => ({
        date,
        calories: values.calories,
        protein: values.protein,
      }));

      setData(chartData);
    };

    calculateData();
  }, [timeFrame]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-4 gap-4 pb-20">
      <h1 className="text-4xl font-bold mb-2">Analysis</h1>

      <Card className="w-full max-w-2xl p-4">
        <CardHeader>
          <CardTitle>Nutrition Analysis</CardTitle>
          <CardDescription>Weekly or Monthly analysis of your calorie and protein intake.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-between items-center mb-4">
            <Label htmlFor="timeFrame">Select Time Frame:</Label>
            <Select onValueChange={(value) => setTimeFrame(value as 'week' | 'month')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="date"/>
              <YAxis yAxisId="left" label={{value: 'Calories', angle: -90, position: 'insideLeft'}}/>
              <YAxis yAxisId="right" orientation="right" label={{value: 'Protein (g)', angle: 90, position: 'insideRight'}}/>
              <Tooltip/>
              <Legend/>
              <Line yAxisId="left" type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{r: 8}}/>
              <Line yAxisId="right" type="monotone" dataKey="protein" stroke="#82ca9d"/>
            </LineChart>
          </ResponsiveContainer>

          <Table>
            <TableCaption>Detailed nutritional data.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Protein (g)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.date}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.calories}</TableCell>
                  <TableCell>{item.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisPage;
