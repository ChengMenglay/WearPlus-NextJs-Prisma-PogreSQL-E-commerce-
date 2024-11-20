"use client";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Category, Image, Product, Size } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/components/ui/image-upload";

type ProductFromProps = {
  initialData: (Product & { images: Image[] }) | null;
  size: Size[] | null;
  category: Category[] | null;
};

const formSchema = z.object({
  name: z.string().min(1),
  detail: z.string().min(1),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});
type ProductFormValues = z.infer<typeof formSchema>;
export default function ProductForm({
  initialData,
  size,
  category,
}: ProductFromProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData, price: parseFloat(String(initialData?.price)) }
      : {
          name: "",
          detail: "",
          price: 0,
          quantity: 0,
          categoryId: "",
          sizeId: "",
          images: [],
          isFeatured: false,
          isArchived: false,
        },
  });
  const title = initialData ? "Update product" : "Create product";
  const description = initialData ? "Edit a product" : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);
  const onSubmit = async (data: ProductFormValues) => {
    try {
      if (initialData) {
        setIsLoading(true);
        await axios.patch(`/api/product/${initialData.id}`, data);
      } else {
        await axios.post(`/api/product`, data);
      }
      toast.success(toastMessage);
      router.push(`/dashboard/product`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      await axios.delete(`/api/product/${initialData?.id}`);
      toast.success("Product deleted");
      router.push(`/dashboard/product`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isloading}
            variant={"destructive"}
            size={"icon"}
            onClick={onDelete}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((img) => img.url)} // Ensure value is an array of image URLs
                    disable={isloading}
                    onChange={(url) => {
                      // Add the new image to the list
                      field.onChange([...field.value, { url }]);
                    }}
                    onDelete={(url) => {
                      // Remove image from the list
                      field.onChange(
                        field.value.filter((img) => img.url !== url)
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isloading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isloading}
                      type="number"
                      placeholder="Product quantity"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isloading}
                      type="number"
                      placeholder="Product price"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1">
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detail</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isloading}
                      placeholder="Product detail"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isloading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select category"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {category?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    disabled={isloading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select size"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Size</SelectLabel>
                        {size?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-2 p-2 rounded-md border ">
                  <FormControl>
                    <Checkbox
                      disabled={isloading}
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>{" "}
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-2 p-2 rounded-md border ">
                  <FormControl>
                    <Checkbox
                      disabled={isloading}
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
