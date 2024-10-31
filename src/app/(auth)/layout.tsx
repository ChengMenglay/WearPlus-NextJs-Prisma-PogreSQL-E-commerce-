import Link from "next/link";
import React from "react";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="w-full h-20 shadow-lg flex justify-center items-center mb-10">
        <Link href="/" className="font-bold text-3xl">
          WEARPLUS
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
