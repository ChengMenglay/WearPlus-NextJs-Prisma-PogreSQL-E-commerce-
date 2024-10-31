"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function Dashbord() {
  const { data: session } = useSession();

  return <div>{session?.user.role}</div>;
}
