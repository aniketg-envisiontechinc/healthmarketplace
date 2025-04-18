import Link from "next/link";
import { Home, BarChart2, User } from "lucide-react";

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background border-t z-50">
      <div className="max-w-md mx-auto flex justify-around items-center py-2">
        <Link href="/dashboard" className="flex flex-col items-center">
          <Home className="h-6 w-6" />
          <span className="text-xs">Dashboard</span>
        </Link>
        <Link href="/analysis" className="flex flex-col items-center">
          <BarChart2 className="h-6 w-6" />
          <span className="text-xs">Analysis</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center">
          <User className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;
