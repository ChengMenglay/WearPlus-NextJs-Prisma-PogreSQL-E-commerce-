"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
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
const schema = z.object({
  name: z.string().min(1, "Please fill in the name!"),
  phoneNumber: z.string().min(1, "Please fill in the phone number!"),
  province: z.string().min(1, "Please fill in the province!"),
  addressDetail: z.string().min(1, "Please fill in address detail"),
  note: z.string().optional(),
});

type FormSchemaValue = z.infer<typeof schema>;

export default function AddressForm() {
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm<FormSchemaValue>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  const onSubmit = (data: FormSchemaValue) => {};
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-1" />
            Create address
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <h1 className="text-sm">Create Address</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}></form>
          </Form>
        </DialogContent>
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
            <TableRow>
              <TableCell>Phnom Penh</TableCell>
              <TableCell>Chroy Chongva</TableCell>
              <TableCell>Cheng Menglay</TableCell>
              <TableCell>089240766</TableCell>
              <TableCell></TableCell>
              <TableCell className="flex gap-2">
                <DialogTrigger asChild>
                  <Button>
                    <PenLine /> Edit
                  </Button>
                </DialogTrigger>
                <Button variant={"destructive"}>
                  <Trash /> Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Dialog>
    </div>
  );
}
