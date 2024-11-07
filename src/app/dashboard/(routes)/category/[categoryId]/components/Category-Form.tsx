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
import { User } from "@prisma/client";
import { Trash } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

type CategoryFormProps = {
  initialData: User | null;
};

const formSchema = z.object({
  name: z.string().min(1),
});
type CategoryFormValues = z.infer<typeof formSchema>;
export default function CategoryForm({ initialData }: CategoryFormProps) {
  const params = useParams();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: initialData?.name || "" },
  });
  const router = useRouter();
  const onSubmit = async (data: CategoryFormValues) => {
    try {
      await axios.post(`/api/category/${params.userId}`, data);
      router.refresh();
      toast.success("Category created");
      router.push(`/dashboard/${params.userId}/category`);
    } catch (error) {
      toast.error("Somethig went wrong!");
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Category" description="Manage category preference." />
        <Button variant={"destructive"} size={"icon"}>
          <Trash className="w-4 h-4" />
        </Button>
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
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
}
