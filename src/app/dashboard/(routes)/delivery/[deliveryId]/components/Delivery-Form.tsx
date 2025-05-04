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
import { Delivery } from "@prisma/client";
import ImageUpload from "@/components/ui/image-upload";

type DeliveryFormProps = {
  initialData: Delivery | null;
};

const formSchema = z.object({
  name: z.string().min(1),
  logo_url: z.string().min(1),
  price: z.coerce.number(),
  description: z.string().min(1),
});
type DeliveryFormValue = z.infer<typeof formSchema>;
export default function DeliveryForm({ initialData }: DeliveryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<DeliveryFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      logo_url: initialData?.logo_url || "",
      price: Number(initialData?.price) || 0,
      description: initialData?.description || "",
    },
  });
  const title = initialData ? "Update delivery" : "Create delivery";
  const description = initialData ? "Edit a delivery" : "Add a new delivery";
  const toastMessage = initialData ? "Delivery updated." : "Delivery created.";
  const action = initialData ? "Save changes" : "Create";
  const router = useRouter();
  const onSubmit = async (data: DeliveryFormValue) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(`/api/delivery/${initialData.id}`, data);
      } else {
        await axios.post(`/api/delivery`, data);
      }
      toast.success(toastMessage);
      router.push(`/dashboard/delivery`);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/delivery/${initialData?.id}`);
      toast.success("Delivery deleted");
      router.push(`/dashboard/delivery`);
      router.refresh();
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(true);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button variant={"destructive"} size={"icon"} onClick={onDelete}>
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
            name="logo_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disable={isLoading}
                    onChange={(url) => {
                      field.onChange(url);
                    }}
                    onDelete={() => field.onChange("")}
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
                    <Input placeholder="Delivery name" {...field} />
                  </FormControl>
                  <FormMessage />
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
                      type="number"
                      placeholder="Delivery price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Delivery description" {...field} />
                  </FormControl>
                  <FormMessage />
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
