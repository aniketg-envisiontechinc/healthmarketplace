"use client";

import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Link from "next/link";

export function AddMeal() {
  return (
    <Link href="/dashboard/add-meal" className="w-full">
      <Button className="w-full">
        <Camera className="mr-2 h-4 w-4" />
        Add Meal
      </Button>
    </Link>
  );
}
