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
import { Billboard } from "@prisma/client";
import ImageUpload from "@/components/ui/image-upload";

type BillboardFormProps = {
  initialData: Billboard | null;
};

const formSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
});
type BillboardFormValue = z.infer<typeof formSchema>;
export default function BillboardForm({ initialData }: BillboardFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<BillboardFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      url: initialData?.url || "",
    },
  });
  const title = initialData ? "Update billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard" : "Add a new billboard";
  const toastMessage = initialData
    ? "Billboard updated."
    : "Billboard created.";
  const action = initialData ? "Save changes" : "Create";
  const router = useRouter();
  const onSubmit = async (data: BillboardFormValue) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(`/api/billboard/${initialData.id}`, data);
      } else {
        await axios.post(`/api/billboard`, data);
      }
      toast.success(toastMessage);
      router.push(`/dashboard/billboard`);
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
      await axios.delete(`/api/billboard/${initialData?.id}`);
      toast.success("Billboard deleted");
      router.push(`/dashboard/billboard`);
      router.refresh();
    } catch (error) {
      console.log(error);
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
            name="url"
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Billboard title" {...field} />
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
