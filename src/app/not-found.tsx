"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home, AlertTriangle, SearchX } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function PageNotFound() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  // Handle animation after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle back button functionality
  const goBack = () => {
    window?.history?.back();
  };

  // Go to homepage
  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50 dark:from-background dark:to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Animated 404 text */}
        <motion.div
          initial={{ scale: 0 }}
          animate={mounted ? { scale: 1, rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mx-auto"
        >
          <span className="text-9xl font-extrabold text-red-500/20 dark:text-red-500/10">
            404
          </span>
          <SearchX className="text-red-500 w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>

          <Alert
            variant="destructive"
            className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
          >
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              We could not find the page you are looking for.
            </AlertDescription>
          </Alert>

          <p className="text-muted-foreground mt-2">
            The page may have been moved, deleted, or never existed. Please
            check the URL or navigate back to safety.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              variant="outline"
              onClick={goBack}
              className="group transition-all duration-300"
            >
              <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>

            <Button
              onClick={goHome}
              className="bg-red-500 hover:bg-red-600 transition-colors duration-300"
            >
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
