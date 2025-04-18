'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { NavBar } from "@/components/NavBar";

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if onboarding is completed
    const userData = localStorage.getItem('userData');
    const isOnboardingPage = pathname === '/onboarding';
    
    // If no user data and not on onboarding page, redirect to onboarding
    if (!userData && !isOnboardingPage) {
      router.push('/onboarding');
    }
    
    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) {
    return null; // or a loading spinner if you prefer
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="relative min-h-screen pb-16">
        {children}
        {pathname !== '/onboarding' && <NavBar />}
      </main>
      <Toaster />
    </ThemeProvider>
  );
} 