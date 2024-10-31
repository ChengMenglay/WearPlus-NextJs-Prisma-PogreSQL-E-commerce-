"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div
      className={
        pathname.includes("/dashboard") ? ` hidden` : `w-full h-20 bg-red-300`
      }
    >
      Navbar
    </div>
  );
}
