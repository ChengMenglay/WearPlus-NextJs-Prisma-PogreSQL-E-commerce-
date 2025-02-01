"use client";

import NoResult from "@/components/no-result";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, BusFrontIcon, MapPin, Notebook, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  addressId: z.string().min(1, "Please select an address!"),
  deliveryId: z.string().min(1, "Please select a delivery!"),
  paymentMethodId: z.string().min(1, "Please select a payment method!"),
  note: z.string().optional(),
});

type FormSchemaValue = z.infer<typeof schema>;

const deliveryOptions = [
  {
    id: "jnt",
    name: "J&T",
    description:
      "For this option, please pay first before we can send out your products.",
    price: 0,
  },
  {
    id: "phnom_penh",
    name: "PHNOM PENH DELIVERY",
    description:
      "Order before 12 PM, it will be delivered from 2-5 PM in PP (Takmao Included).",
    price: 0,
  },
  {
    id: "vet",
    name: "VET",
    description:
      "For this option, please pay first before we can send out your products.",
    price: 0,
  },
];

export default function CheckoutForm() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptions[0]);
  const router = useRouter();

  const form = useForm<FormSchemaValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      addressId: "",
      deliveryId: selectedDelivery.id,
      paymentMethodId: "",
      note: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onPayNow = (data: FormSchemaValue) => {
    console.log("Checkout Data:", data);
  };

  return (
    <div className="my-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onPayNow)}>
          {/* Address Selection */}
          <FormField
            control={form.control}
            name="addressId"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="flex items-center text-lg">
                  <MapPin className="w-4 h-4 mr-1" /> Address
                </FormLabel>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Select address</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px] min-h-[300px] p-4">
                    <h1 className="text-sm font-semibold">Select an address</h1>
                    <div className="space-y-10 flex flex-col justify-between">
                      <NoResult />
                      <Button onClick={() => router.push("/profile/address")}>
                        Create address <Plus className="ml-1" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Card */}
          <Card className="border p-4 my-3 bg-slate-800 text-white flex justify-between items-center">
            <div>
              <h1 className="font-bold text-lg">Phnom Penh</h1>
              <p className="text-sm">Chroy Chongva</p>
            </div>
            <div>
              <h1 className="font-bold text-lg">Cheng Menglay</h1>
              <p className="text-sm">089240766</p>
            </div>
          </Card>

          <Separator className="my-4" />

          {/* Note Field */}
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-lg">
                  <Notebook className="w-4 h-4 mr-1" /> Note
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your note here." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="my-4" />

          {/* Delivery Selection */}
          <FormField
            control={form.control}
            name="deliveryId"
            render={() => (
              <FormItem>
                <FormLabel className="flex items-center text-lg">
                  <BusFrontIcon className="w-4 h-4 mr-1" /> Delivery
                </FormLabel>
                <div className="p-4 mx-auto">
                  <h2 className="text-xl font-bold mb-4">Select Delivery</h2>
                  <div className="space-y-3">
                    {deliveryOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`p-4 border rounded-lg cursor-pointer ${
                          selectedDelivery.id === option.id
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-300"
                        }`}
                        onClick={() => {
                          setSelectedDelivery(option);
                          form.setValue("deliveryId", option.id);
                        }}
                      >
                        <h3 className="text-lg font-semibold">{option.name}</h3>
                        <p className="text-sm text-gray-600">
                          {option.description}
                        </p>
                        <p className="text-red-500 font-bold">
                          ${option.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <Button type="submit">
              Pay Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
