import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { Separator } from "./ui/separator";

export default function StationaryStore() {
  return (
    <div className="container mx-auto my-8">
      <h1 className="font-bold text-3xl">{"Stationary Stores"}</h1>
      <Separator className="my-3" />
      <div className="grid grid-cols-2">
        <Card className="overflow-hidden">
          <div className="relative w-full h-[400px]">
            <Image
              fill
              alt="Store_Front"
              src={"/images/outside_store.webp"}
              quality={100}
              className="object-cover rounded-md"
            />
          </div>
          <div className="p-3 space-y-4">
            <h1 className="text-lg font-bold">Chroy Chongva</h1>
            <a
              className="text-sm"
              href="https://maps.app.goo.gl/pVnhmjya5vgAgZyh9"
            >
              Mekong View Tower
            </a>
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="relative w-full h-[400px]">
            <Image
              fill
              alt="Store_Front"
              src={"/images/inside_store.webp"}
              quality={100}
              className="object-cover rounded-md"
            />
          </div>
          <div className="p-3 space-y-4">
            <h1 className="text-lg font-bold">Chroy Chongva</h1>
            <a
              className="text-sm "
              href="https://maps.app.goo.gl/pVnhmjya5vgAgZyh9"
              target="_blank"
            >
              Mekong View Tower
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
