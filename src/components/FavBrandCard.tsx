"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type FavBrandCardProps = {
  title: string;
  image_url: string;
  link: string;
};

export default function FavBrandCard({
  title,
  image_url,
  link,
}: FavBrandCardProps) {
  const router = useRouter();

  return (
    <div
      className="relative w-full h-[500px] cursor-pointer group-hover:opacity-100 hover:!opacity-100 transition-opacity duration-300"
      onClick={() => router.push(`/${link}`)}
    >
      <Image
        alt={title}
        src={image_url || ""}
        fill
        quality={100}
        sizes="(max-width: 768px) 50vw, 15vw"
        priority
        className="object-cover group-hover:opacity-80 group-hover:blur-sm hover:!opacity-100 duration-300 hover:!blur-none"
      />
      <p className="absolute font-bold bottom-3 left-3 text-white group-hover:opacity-80 hover:opacity-100">
        {title}
      </p>
    </div>
  );
}
