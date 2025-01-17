"use client";
import Image from "next/image";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Billboard as BillboardType } from "../../types";
interface billboardProps {
  billboards: BillboardType[] | null;
}
export const Billboard: React.FC<billboardProps> = ({ billboards }) => {
  return (
    <Carousel
      className="w-full mx-auto my-4 rounded-md overflow-hidden "
      opts={{ align: "start", loop: true }}
    >
      <CarouselContent>
        {billboards?.map((billboard) => (
          <CarouselItem
            className="relative w-full mx-auto lg:h-[450px] md:h-[400px] h-[300px]"
            key={billboard.title}
          >
            <Image
              alt={billboard.title}
              src={billboard.url}
              fill
              className="object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
