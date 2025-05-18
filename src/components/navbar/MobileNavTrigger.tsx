"use client";
import React from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import useMobileNav from "@/hooks/use-mobile-nav";

export default function MobileNavTrigger() {
  const { onOpen } = useMobileNav();

  return (
    <Button variant="ghost" size="icon" className="md:hidden" onClick={onOpen}>
      <Menu size={24} />
    </Button>
  );
}
