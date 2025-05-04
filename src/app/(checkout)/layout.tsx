import { Card } from "@/components/ui/card";
import Link from "next/link";
import React, { ReactNode } from "react";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Card className=" h-20 sticky top-0 left-0 flex md:justify-start justify-center lg:px-40 md:px-20 px-0 items-center mb-10 z-50">
        <Link href="/" className="font-bold text-3xl">
          WEARPLUS
        </Link>
      </Card>
      {children}
    </main>
  );
}
