"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Address, Province, User } from "../../../../../types";
import NoResult from "@/components/no-result";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "@/app/(auth)/actions/userAction";

type AddressFormProps = {
  user: User | null;
  addresses: Address[] | null;
  provinces: Province[] | null;
};
const schema = z.object({
  name: z.string().min(1, "Please fill in the name!"),
  phoneNumber: z.string().min(1, "Please fill in the phone number!"),
  province: z.string().min(1, "Please fill in the province!"),
  addressDetail: z.string().min(1, "Please fill in address detail"),
  note: z.string().optional(),
});

type FormSchemaValue = z.infer<typeof schema>;

export default function AddressForm({
  user,
  addresses,
  provinces,
}: AddressFormProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddress, setSelectedaddress] = useState<Address | null>(null);
  const router = useRouter();
  const form = useForm<FormSchemaValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      province: selectedAddress?.province ? selectedAddress.province : "",
      note: selectedAddress?.note ? selectedAddress.note : "",
      name: selectedAddress?.user?.name ?? "",
      phoneNumber: selectedAddress?.user?.phoneNumber ?? "",
    },
  });
  useEffect(() => {
    if (selectedAddress) {
      form.reset({
        province: selectedAddress.province ?? "",
        note: selectedAddress.note ?? "",
        name: selectedAddress.user?.name ?? "",
        phoneNumber: selectedAddress.user?.phoneNumber ?? "",
        addressDetail: selectedAddress.addressDetail ?? "",
      });
    } else {
      form.reset({
        province: "",
        note: "",
        name: user?.name,
        phoneNumber: user?.phoneNumber as string,
        addressDetail: "",
      });
    }
  }, [selectedAddress, form]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    router.refresh();
  }, [isOpen]);
  if (!isMounted) {
    return null;
  }
  const onSubmit = async (data: FormSchemaValue) => {
    try {
      const formattedUser = {
        address: data.province,
        email: user?.email as string,
        name: data.name,
        phoneNumber: data.phoneNumber,
      };
      setIsLoading(true);
      if (selectedAddress) {
        await updateUserProfile(formattedUser);
        await axios.patch("/api/address", {
          id: selectedAddress.id,
          province: data.province,
          addressDetail: data.addressDetail,
          userId: user?.id,
          note: data.note,
        });
        toast.success("Successfully!");
      } else {
        await updateUserProfile(formattedUser);
        await axios.post("/api/address", {
          province: data.province,
          addressDetail: data.addressDetail,
          userId: user?.id,
          note: data.note,
        });
        toast.success("Successfully!");
      }
      setSelectedaddress(null);
      form.reset({
        province: "",
        note: "",
        name: user?.name,
        phoneNumber: user?.phoneNumber as string,
        addressDetail: "",
      });
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      toast.error("Fail to create the address!");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async (item: Address) => {
    await axios.delete("/api/address", { data: { id: item.id } });
    toast.success("Deleted!");
    router.refresh();
  };
  return (
    <div className="w-full">
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setSelectedaddress(null);
            form.reset({
              province: "",
              note: "",
              name: user?.name,
              phoneNumber: user?.phoneNumber as string,
              addressDetail: "",
            });
          }
        }}
      >
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-1" />
            Create address
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogTitle className="text-sm">Create Address</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-1 gap-3"
            >
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province*</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select address" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {provinces?.map((item) => (
                              <SelectItem key={item.id} value={item.name}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressDetail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address detail*</FormLabel>
                    <FormControl>
                      <Input placeholder="Address detail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
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
                    <FormLabel>Phone number*</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end my-2">
                <Button type="submit" disabled={isLoading}>
                  {selectedAddress ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Table className="my-4">
        <TableHeader>
          <TableRow>
            <TableHead>Province</TableHead>
            <TableHead>Address detail</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone numb</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(addresses?.length as number) > 0 &&
            addresses?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.province}</TableCell>
                <TableCell>{item.addressDetail}</TableCell>
                <TableCell>{item.user.name}</TableCell>
                <TableCell>{item.user.phoneNumber}</TableCell>
                <TableCell>{item.note}</TableCell>
                <TableCell className="flex md:flex-row flex-col gap-2">
                  <Button
                    onClick={() => {
                      setSelectedaddress(item);
                      setIsOpen(true);
                    }}
                  >
                    <PenLine /> Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(item)}
                    variant={"destructive"}
                  >
                    <Trash /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {addresses?.length === 0 && <NoResult />}
    </div>
  );
}
