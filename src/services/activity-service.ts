import { format } from 'date-fns';

interface ActivityData {
  date: string;
  steps: number;
  waterIntake: number; // in ml
  caloriesBurned: number;
}

export class ActivityService {
  private static STORAGE_KEY = 'activity_data';
  private static WATER_GOAL = 2500; // 2.5L in ml
  private static STEPS_GOAL = 10000;

  static getTodayActivity(): ActivityData {
    const today = format(new Date(), 'yyyy-MM-dd');
    const activities = this.getAllActivities();
    return activities[today] || this.createEmptyActivity(today);
  }

  static getAllActivities(): Record<string, ActivityData> {
    if (typeof window === 'undefined') return {};
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }

  static addSteps(steps: number) {
    const today = format(new Date(), 'yyyy-MM-dd');
    const activities = this.getAllActivities();
    const todayActivity = activities[today] || this.createEmptyActivity(today);
    
    todayActivity.steps += steps;
    todayActivity.caloriesBurned = Math.floor(todayActivity.steps * 0.04); // Rough estimate: 0.04 calories per step
    
    activities[today] = todayActivity;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(activities));
    return todayActivity;
  }

  static addWater(amount: number) {
    const today = format(new Date(), 'yyyy-MM-dd');
    const activities = this.getAllActivities();
    const todayActivity = activities[today] || this.createEmptyActivity(today);
    
    todayActivity.waterIntake += amount;
    
    activities[today] = todayActivity;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(activities));
    return todayActivity;
  }

  static getWaterProgress(): number {
    const todayActivity = this.getTodayActivity();
    return (todayActivity.waterIntake / this.WATER_GOAL) * 100;
  }

  static getStepsProgress(): number {
    const todayActivity = this.getTodayActivity();
    return (todayActivity.steps / this.STEPS_GOAL) * 100;
  }

  private static createEmptyActivity(date: string): ActivityData {
    return {
      date,
      steps: 0,
      waterIntake: 0,
      caloriesBurned: 0
    };
  }
} 