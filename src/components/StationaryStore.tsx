import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { Separator } from "./ui/separator";

export default function StationaryStore() {
  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="font-bold text-3xl">Stationary Stores</h1>
      <Separator className="my-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <div className="relative w-full aspect-[3/2]">
            <Image
              fill
              alt="Store_Front"
              src={"/images/outside_store.webp"}
              quality={100}
              className="object-cover rounded-md"
            />
          </div>
          <div className="p-4 space-y-2">
            <h2 className="text-lg font-bold">Chroy Chongva</h2>
            <a
              className="text-sm text-blue-600 hover:underline"
              href="https://maps.app.goo.gl/pVnhmjya5vgAgZyh9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mekong View Tower
            </a>
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="relative w-full aspect-[3/2]">
            <Image
              fill
              alt="Store_Front"
              src={"/images/inside_store.webp"}
              quality={100}
              className="object-cover rounded-md"
            />
          </div>
          <div className="p-4 space-y-2">
            <h2 className="text-lg font-bold">Chroy Chongva</h2>
            <a
              className="text-sm text-blue-600 hover:underline"
              href="https://maps.app.goo.gl/pVnhmjya5vgAgZyh9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mekong View Tower
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
