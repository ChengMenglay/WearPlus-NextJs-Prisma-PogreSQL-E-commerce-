import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";

const imageLogo = [
  { name: "Nike", src: "/images/nike-logo.webp" },
  { name: "Jordan", src: "/images/jordan-logo.webp" },
  { name: "Adidas", src: "/images/adidas-logo.webp" },
  { name: "NewBalance", src: "/images/new-balance-logo.webp" },
  { name: "Puma", src: "/images/puma-logo.webp" },
];

export default function BrandLogo() {
  return (
    <div className="container  mx-auto">
      <h1 className="font-bold text-3xl">Brands</h1>
      <Separator className="my-4" />
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 py-6">
        {imageLogo.map((img) => (
          <div
            key={img.name}
            className="relative w-full aspect-square max-w-[100px] mx-auto"
          >
            <Image
              src={img.src}
              alt={img.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          </div>
        ))}
      </div>
      <Separator className="my-4" />
    </div>
  );
}
