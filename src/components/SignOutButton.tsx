"use client";
import React from "react";
import { signOutUser } from "@/app/(auth)/actions/authActions";
import { LogOut } from "lucide-react";
type Props = {
  className?: string;
  size?: number;
  name?: string;
};
export default function SignOutButton({ name, size, className = "" }: Props) {
  return (
    <div className={className} onClick={async () => await signOutUser()}>
      <LogOut size={size} />
      <span>{name}</span>
    </div>
  );
}
