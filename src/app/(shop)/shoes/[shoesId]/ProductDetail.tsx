"use client";
import React, { useState } from "react";
import { Product } from "../../../../../types";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

type ProductDetailProps = {
  product: Product | null;
};
export default function ProductDetailComponent({
  product,
}: ProductDetailProps) {
  const [seletedShoes, setSeletedShoes] = useState(product?.images[0].url);
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 ">
      <div className="p-4">
        <h1 className="text-3xl font-bold">{product?.name}</h1>
        <p className=" font-bold text-gray-400">
          {product?.type === "Men"
            ? "Men's shoes"
            : product?.type === "Women"
            ? "Wowen's shoes"
            : product?.type === "Kids"
            ? "Kid's shoes"
            : null}
        </p>
        <div className="mb-4 lg:w-3/4 w-full space-y-2">
          <div className="relative aspect-square">
            <Image
              fill
              alt={product?.name as string}
              src={seletedShoes as string}
            />
          </div>
          <h1 className="text- font-bold p-2">Frame</h1>
          <div className="flex gap-10">
            {product?.images.map((img) => (
              <div
                key={img.id}
                className="relative w-[120px] h-[120px] cursor-pointer"
                onClick={() => setSeletedShoes(img.url)}
              >
                <Image fill alt={img.id as string} src={img.url as string} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-2">
        <h1 className="text-lg font-semibold">Available in select sizes</h1>
        <div className="my-4">
          <Select disabled={false}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {(product?.sizes.length as number) > 0 ? (
                  product?.sizes.map((size) => (
                    <SelectItem key={size.id} value={size.id}>
                      {size.value}
                    </SelectItem>
                  ))
                ) : (
                  <p>No sizes available</p>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Card className="p-4 my-10">
          <h1 className="font-semibold text-sm">Buy Now for</h1>
          <p className="text-2xl font-bold my-2">
            {formatter.format(Number(product?.price))}
          </p>
          <div className="flex gap-4 mt-10">
            <Button>Add to card</Button>
            <Button variant={"outline"}>Buy Now</Button>
          </div>
        </Card>
        <Collapsible>
          <Card className="h-14">
            <CollapsibleTrigger className="w-full h-full text-start px-4 flex justify-between items-center">
              Product Detail <ChevronDown />
            </CollapsibleTrigger>
            <CollapsibleContent>{product?.detail}</CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </div>
  );
}
