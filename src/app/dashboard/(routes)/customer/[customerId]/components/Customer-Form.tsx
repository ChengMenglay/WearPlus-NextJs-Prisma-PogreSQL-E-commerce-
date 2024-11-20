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
import { User } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CustomerProps = {
  initialData: User | null;
};

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8).optional(),
  phoneNumber: z.string().min(3),
  address: z.string().min(1),
  role: z.string().min(1),
});
type CustomerFormValues = z.infer<typeof formSchema>;
export default function CustomerForm({ initialData }: CustomerProps) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      password: initialData?.passwordHash || "",
      phoneNumber: initialData?.phoneNumber || "",
      address: initialData?.address || "",
      role: initialData?.role || "",
    },
  });
  const title = initialData ? "Update customer" : "Create cusotmer";
  const description = initialData ? "Edit a customer" : "Add a new customer";
  const toastMessage = initialData ? "Customer updated." : "Customer created.";
  const action = initialData ? "Save changes" : "Create";
  const router = useRouter();
  const onSubmit = async (data: CustomerFormValues) => {
    try {
      if (initialData) {
        await axios.patch(`/api/customer/${initialData.id}`, data);
      } else {
        await axios.post(`/api/customer`, data);
      }
      toast.success(toastMessage);
      router.push(`/dashboard/customer`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  const onDelete = async () => {
    try {
      await axios.delete(`/api/customer/${initialData?.id}`);
      toast.success("Customer deleted");
      router.push(`/dashboard/customer`);
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
                    <Input placeholder="Customer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={initialData ? true : false}
                      placeholder="Customer password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">admin</SelectItem>
                      <SelectItem value="user">user</SelectItem>
                    </SelectContent>
                  </Select>
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
