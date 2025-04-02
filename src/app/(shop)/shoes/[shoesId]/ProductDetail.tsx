"use client";
import React, { useState } from "react";
import { Product } from "../../../../../types";
import Image from "next/image";
import { CgSpinnerTwoAlt } from "react-icons/cg";
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
import { ChevronDown, ChevronUp } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import useOpenSheet from "@/hooks/open-sheet";
import CartSheet from "./components/CartSheet";
import { toast } from "react-toastify";

type ProductDetailProps = {
  product: Product | null;
};

const schema = z.object({
  sizeId: z.string().min(1, "Please select a size!"),
});

type FormValues = z.infer<typeof schema>;
export default function ProductDetailComponent({
  product,
}: ProductDetailProps) {
  const [seletedShoes, setSeletedShoes] = useState(product?.images[0].url);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      sizeId: "",
    },
  });
  const cart = useCart();
  const { isOpen: sheetIsOpen, onOpen } = useOpenSheet();
  const onAddToCart = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/product-size", {
        productId: product?.id,
        sizeId: data.sizeId,
      });
      const productSize = await response.data;

      // Transform `productSize` into the `Product` type
      const transformedProduct: Product = {
        id: productSize.product.id,
        name: productSize.product.name,
        category: productSize.product.category,
        price: String(productSize.product.price), // Assuming `price` in Product is a string
        images: productSize.product.images, // Ensure images match `Product` type
        type: productSize.product.type, // Assuming this exists in your schema
        stock: productSize.product.stock,
        sizes: [productSize],
        detail: productSize.product.detail, // Assuming `detail` exists in your schema
        isFeatured: productSize.product.isFeatured,
      };
      cart.addItem(transformedProduct);
      onOpen();
    } catch (error) {
      toast.error("Can't add this product to the cart!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CartSheet />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className=" space-y-4">
          <h1 className="lg:text-3xl md:text-2xl text-3xl font-bold">
            {product?.name}
          </h1>
          <p className=" font-bold text-gray-400">
            {product?.type === "Men"
              ? "Men's shoes"
              : product?.type === "Women"
              ? "Women's shoes"
              : product?.type === "Kids"
              ? "Kid's shoes"
              : null}
          </p>
          <div className="mb-4 lg:w-3/4 w-full p-4">
            <div className="relative  aspect-square">
              <Image
                src={seletedShoes as string}
                alt={product?.name as string}
                fill
                className="object-contain object-center"
                quality={100} // Use higher quality for better image
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <h1 className="relative text-lg font-bold">Frame</h1>
            <div className="flex gap-10">
              {product?.images.map((img) => (
                <div
                  key={img.id}
                  className="relative w-[140px] h-[140px] cursor-pointer"
                  onClick={() => setSeletedShoes(img.url)}
                >
                  <Image
                    src={img.url as string}
                    alt={img.id as string}
                    fill
                    className="object-contain object-center"
                    quality={100} // Use higher quality for better image
                    sizes="(max-width: 768px) 50vw, 15vw" // Responsive image sizes for better performance
                    priority
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-2">
          <h1 className="text-lg font-semibold">Available in select sizes</h1>
          <div className="my-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAddToCart)}>
                <FormField
                  control={form.control}
                  name="sizeId"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        value={field.value}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {(product?.sizes.length as number) > 0 ? (
                              product?.sizes.map((size) => (
                                <SelectItem
                                  key={size.size.id}
                                  value={size.size.id}
                                >
                                  {size.size.value}
                                </SelectItem>
                              ))
                            ) : (
                              <p>No sizes available</p>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Card className="p-4 my-10">
                  <h1 className="font-semibold text-sm">Buy Now for</h1>
                  <p className="text-2xl font-bold my-2">
                    {formatter.format(Number(product?.price))}
                  </p>
                  <div className="flex gap-4 mt-10">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && (
                        <CgSpinnerTwoAlt className="animate-spin" />
                      )}
                      <span>{isLoading ? "Loading..." : "Add to cart"}</span>
                    </Button>
                    <Button variant={"outline"}>Buy Now</Button>
                  </div>
                </Card>
              </form>
            </Form>
          </div>
          <Collapsible onClick={() => setIsOpen(!isOpen)} defaultOpen={isOpen}>
            <Card className=" rounded-lg shadow-sm">
              <CollapsibleTrigger className="w-full h-full text-start px-6 py-4 flex justify-between items-center hover:text-gray-900 focus:outline-none">
                Product Details {isOpen ? <ChevronDown /> : <ChevronUp />}
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 py-4">
                {product?.detail}
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </div>
    </>
  );
}
