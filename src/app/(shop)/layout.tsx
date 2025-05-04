import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import React, { ReactNode } from "react";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
