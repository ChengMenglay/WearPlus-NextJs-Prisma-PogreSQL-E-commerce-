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
import { Size } from "@prisma/client";

type SizeFormProps = {
  initialData: Size | null;
};

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});
type SizeFormValues = z.infer<typeof formSchema>;
export default function SizeForm({ initialData }: SizeFormProps) {
  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      value: initialData?.value || "",
    },
  });
  const title = initialData ? "Update size" : "Create size";
  const description = initialData ? "Edit a size" : "Add a new size";
  const toastMessage = initialData ? "Size updated." : "Size created.";
  const action = initialData ? "Save changes" : "Create";
  const router = useRouter();
  const onSubmit = async (data: SizeFormValues) => {
    try {
      if (initialData) {
        await axios.patch(`/api/size/${initialData.id}`, data);
      } else {
        await axios.post(`/api/size`, data);
      }
      toast.success(toastMessage);
      router.push(`/dashboard/size`);
      router.refresh();
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!");
    }
  };
  const onDelete = async () => {
    try {
      await axios.delete(`/api/size/${initialData?.id}`);
      toast.success("Size deleted");
      router.push(`/dashboard/size`);
      router.refresh();
    } catch (error) {
      console.log(error)
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
                    <Input placeholder="Size name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Size value" {...field} />
                  </FormControl>
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
