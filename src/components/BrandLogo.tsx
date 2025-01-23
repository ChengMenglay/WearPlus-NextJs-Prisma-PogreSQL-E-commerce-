import Image from "next/image";
import React from "react";

export default function BrandLogo() {
  return (
    <div className="container mx-auto grid grid-cols-5 gap-12">
      <div className="relative w-[140px] h-[140px] py-4 flex justify-center items-center space-x-8 md:space-x-12">
        <Image
          src="/images/nike-logo.webp"
          alt="nike"
          fill
          className="h-8 md:h-10 object-contain"
        />{" "}
      </div>
      <div className="relative w-[140px] h-[140px] py-4 flex justify-center items-center space-x-8 md:space-x-12">
        <Image
          src="/images/jordan-logo.webp"
          alt="nike"
          fill
          className="h-8 md:h-10 object-contain"
        />
      </div>
      <div className="relative w-[140px] h-[140px] py-4 flex justify-center items-center space-x-8 md:space-x-12">
        <Image
          src="/images/adidas-logo.webp"
          alt="nike"
          fill
          className="h-8 md:h-10 object-contain"
        />
      </div>
      <div className="relative w-[140px] h-[140px] py-4 flex justify-center items-center space-x-8 md:space-x-12">
        <Image
          src="/images/new-balance-logo.webp"
          alt="nike"
          fill
          className="h-8 md:h-10 object-contain"
        />
      </div>
      <div className="relative w-[140px] h-[140px] py-4 flex justify-center items-center space-x-8 md:space-x-12">
        <Image
          src="/images/puma-logo.webp"
          alt="nike"
          fill
          className="h-8 md:h-10 object-contain"
        />
      </div>
    </div>
  );
}
