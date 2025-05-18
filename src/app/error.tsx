"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Home, RefreshCcw, ChevronLeft, AlertOctagon } from "lucide-react";

export default function ErrorPage() {
  const [countdown, setCountdown] = useState(10);
  const [isAnimating, setIsAnimating] = useState(false);

  // Countdown timer that will redirect to home after 10 seconds
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Redirect to home page
      window.location.href = "/";
    }
  }, [countdown]);

  // Handle animation state
  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Handle refresh
  const refreshPage = () => {
    triggerAnimation();
    setTimeout(() => window.location.reload(), 500);
  };

  // Handle go back
  const goBack = () => {
    window.history.back();
  };

  // Handle go home
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Top decorative element */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
              className={`absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20 ${
                isAnimating ? "scale-150" : "scale-100"
              } transition-all duration-500`}
            ></div>
            <div className="bg-white dark:bg-slate-800 rounded-full p-6 shadow-lg relative">
              <AlertOctagon className="h-16 w-16 text-red-500" />
            </div>
          </div>
        </div>

        <Card className="border-none shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4">
          <CardHeader className="pb-2">
            <div className="w-full flex flex-col items-center">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                <h1 className="text-4xl font-bold tracking-tighter">Error</h1>
                <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
              </div>
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-red-500 to-transparent mt-3"></div>
            </div>
          </CardHeader>

          <CardContent className="text-center space-y-6 pt-6">
            <div className="space-y-4">
              <p className="text-xl font-medium text-slate-900 dark:text-slate-100">
                Oops! Something went wrong
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                We could not find the page you are looking for. It might have
                been moved, deleted, or never existed in the first place.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-200 dark:border-slate-700">
                <span className="text-2xl font-bold">{countdown}</span>
              </div>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Redirecting to homepage in {countdown} seconds...
            </p>
          </CardContent>

          <CardFooter className="flex flex-col items-center justify-center sm:flex-row gap-4 pt-4">
            <Button
              variant="outline"
              className="w-full sm:w-auto group"
              onClick={goBack}
            >
              <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto relative group"
              onClick={refreshPage}
            >
              <RefreshCcw
                className={`mr-2 h-4 w-4 ${
                  isAnimating ? "animate-spin" : "group-hover:animate-spin"
                }`}
              />
              Refresh Page
            </Button>

            <Button
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
              onClick={goHome}
            >
              <Home className="mr-2 h-4 w-4" />
              Home Page
            </Button>
          </CardFooter>
        </Card>

        {/* Bottom decorative elements */}
        <div className="flex justify-center mt-8 gap-2">
          <div className="h-1 w-2 rounded-full bg-red-400"></div>
          <div className="h-1 w-6 rounded-full bg-red-400"></div>
          <div className="h-1 w-2 rounded-full bg-red-400"></div>
        </div>
      </div>
    </div>
  );
}
