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
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";

type CategoryFormProps = {
  initialData: Category | null;
};

const formSchema = z.object({
  name: z.string().min(1),
});
type CategoryFormValues = z.infer<typeof formSchema>;
export default function CategoryForm({ initialData }: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: initialData?.name || "" },
  });
  const title = initialData ? "Update category" : "Create category";
  const description = initialData ? "Edit a category" : "Add a new category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const action = initialData ? "Save changes" : "Create";
  const router = useRouter();
  const onSubmit: any = async (data: CategoryFormValues) => {
    try {
      if (initialData) {
        await axios.patch(`/api/category/${initialData.id}`, data);
      } else {
        await axios.post(`/api/category`, data);
      }
      toast.success(toastMessage);
      router.push(`/dashboard/category`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  const onDelete = async () => {
    try {
      await axios.delete(`/api/category/${initialData?.id}`);
      toast.success("Category deleted");
      router.push(`/dashboard/category`);
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
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
