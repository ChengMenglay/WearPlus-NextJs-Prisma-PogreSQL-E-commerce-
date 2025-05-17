"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Category } from "../../../../../types";
type SortOption = {
  label: string;
  value: string;
};

interface FilterSheetProps {
  baseURL: string;
  categories?: Category[] | null;
}
export default function FilterSheet({ baseURL, categories }: FilterSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const MAX_PRICE = 3000;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get("price_gte") || "0"),
    parseInt(searchParams.get("price_lte") || "0"),
  ]);
  const isPriceFiltered =
    searchParams.has("price_gte") || searchParams.has("price_lte");
  const currentSort = searchParams.get("sort") || "featured";
  const currentPage = searchParams.get("page") || "1";
  const currentBrand = searchParams.get("brand") || "";
  const sortOptions: SortOption[] = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Alphabetically: A-Z", value: "name_asc" },
    { label: "Alphabetically: Z-A", value: "name_desc" },
    { label: "Date, old to new", value: "date_asc" },
    { label: "Date, new to old", value: "date_desc" },
  ];
  const handleBrandChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("brand", value);
    router.push(`${baseURL}?${params.toString()}`);
  };
  const handleSortChange = (value: string) => {
    //Contruct new URL with sort parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);

    //Keep the current page if it exits
    if (currentPage !== "1") {
      params.set("page", currentPage);
    }
    router.push(`${baseURL}?${params.toString()}`);
  };
  const resetPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("price_gte");
    params.delete("price_lte");
    setPriceRange([0, MAX_PRICE]);
    router.push(`${baseURL}?${params.toString()}`);
  };
  const onPriceRangeApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("price_gte", priceRange[0].toString());
    params.set("price_lte", priceRange[1].toString());
    router.push(`${baseURL}?${params.toString()}`);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          size="sm"
          className="flex items-center gap-2"
        >
          <Filter size={16} />
          <span>Filter & Sort</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter & Sort</SheetTitle>
        </SheetHeader>
        <Separator className="my-6" />

        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full my-4"
        >
          <CollapsibleTrigger className="flex w-full justify-between items-center">
            <span className="text-sm font-semibold">Sort</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 transition-transform duration-300" />
            ) : (
              <ChevronDown className="h-4 w-4 transition-transform duration-300" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 text-sm overflow-hidden">
            <RadioGroup
              defaultValue={currentSort}
              onValueChange={handleSortChange}
              className="flex flex-col space-y-2"
            >
              {sortOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>
        <Separator className="my-6" />
        <Collapsible
          open={isOpenPrice}
          onOpenChange={setIsOpenPrice}
          className="w-full my-4"
        >
          <CollapsibleTrigger className="flex w-full justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Price</span>
              {isPriceFiltered && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
            {isOpenPrice ? (
              <ChevronUp className="h-4 w-4 transition-transform duration-300" />
            ) : (
              <ChevronDown className="h-4 w-4 transition-transform duration-300" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="text-sm p-4 overflow-hidden">
            <div className="flex items-center justify-between my-2">
              <span>{priceRange[0]}$</span>
              <span>{priceRange[1]}$</span>
            </div>
            <Slider
              onValueChange={setPriceRange}
              value={priceRange}
              max={MAX_PRICE}
              step={10}
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={onPriceRangeApply} className="flex-1">
                Apply
              </Button>
              <Button
                variant="outline"
                onClick={resetPriceFilter}
                className="flex-1"
              >
                Reset
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Separator className="my-6" />
        {categories && (
          <Collapsible
            open={isOpenCategory}
            onOpenChange={setIsOpenCategory}
            className="w-full my-4"
          >
            <CollapsibleTrigger className="flex w-full justify-between items-center">
              <span className="text-sm font-semibold">Brand</span>
              {isOpenCategory ? (
                <ChevronUp className="h-4 w-4 transition-transform duration-300" />
              ) : (
                <ChevronDown className="h-4 w-4 transition-transform duration-300" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="text-sm p-4 overflow-hidden">
              <RadioGroup
                defaultValue={currentBrand}
                onValueChange={handleBrandChange}
                className="flex flex-col space-y-2"
              >
                {categories?.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={category.id} id={category.id} />
                    <Label htmlFor={category.id}>{category.name}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CollapsibleContent>
          </Collapsible>
        )}
      </SheetContent>
    </Sheet>
  );
}
