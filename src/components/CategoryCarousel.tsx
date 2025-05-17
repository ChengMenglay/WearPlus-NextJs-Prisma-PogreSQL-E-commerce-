"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

const CategoryItem = ({ icon, name }: { icon: string; name: string }) => {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 px-3 py-2 md:px-6 md:py-3 bg-gray-200 rounded-full whitespace-nowrap text-sm md:text-base">
      <span className="text-base md:text-lg">{icon}</span>
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default function CategoryCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(300);

  const categories = [
    { icon: "👕", name: "SONNY ANGELS" },
    { icon: "🧥", name: "SWEATSHIRTS" },
    { icon: "👔", name: "T-SHIRTS" },
    { icon: "🧥", name: "JACKETS" },
    { icon: "👖", name: "PANTS" },
    { icon: "🧢", name: "HATS" },
    { icon: "👜", name: "ACCESSORIES" },
    { icon: "👟", name: "SHOES" },
    { icon: "🧦", name: "SOCKS" },
    { icon: "🧣", name: "SCARVES" },
  ];

  const calculateScrollAmount = () => {
    if (window.innerWidth < 640) {
      setScrollAmount(150);
    } else if (window.innerWidth < 1024) {
      setScrollAmount(200);
    } else {
      setScrollAmount(300);
    }
  };

  //Calculate scroll amount based on viewport size
  useEffect(() => {
    //Calculate initially
    calculateScrollAmount();

    //Add event listener for window resize
    window.addEventListener("resize", calculateScrollAmount);

    //Initialize scroll check
    checkScrollability();

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", calculateScrollAmount);
    };
  }, []);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      //scroll by the calculated amount
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      //check scrollability after animation completes
      setTimeout(checkScrollability, 300);
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      //scroll by the calculated amount
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      //check scrollability after animation completes
      setTimeout(checkScrollability, 300);
    }
  };

  return (
    <div className="container mx-auto my-8">
      {/* Header with title and navigation buttons */}
      <div className="flex items-center justify-between mb-4">
        <div></div>
        <div className="flex gap-2">
          <Button
            onClick={scrollLeft}
            className="rounded-full"
            size={"icon"}
            disabled={!canScrollLeft}
          >
            <ChevronLeft size={18} />
          </Button>
          <Button
            onClick={scrollRight}
            size={"icon"}
            disabled={!canScrollRight}
            className="rounded-full"
          >
            <ChevronLeft size={16} className="rotate-180" />
          </Button>
        </div>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-2 md:gap-3 py-2 md:py-4 hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onScroll={checkScrollability}
      >
        {categories.map((category, index) => (
          <div key={index} className="flex-shrink-0">
            <CategoryItem icon={category.icon} name={category.name} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
