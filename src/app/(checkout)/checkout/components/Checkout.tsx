"use client";

import NoResult from "@/components/no-result";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, BusFrontIcon, MapPin, Notebook, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Address, Delivery } from "../../../../../types";
import { formatter } from "@/lib/utils";
import Image from "next/image";
import useCart from "@/hooks/use-cart";

type CheckoutProps = {
  addresses: Address[] | null;
  deliveryOptions: Delivery[] | null;
};
const schema = z.object({
  addressId: z.string().min(1, "Please select an address!"),
  deliveryId: z.string().min(1, "Please select a delivery!"),
  paymentMethod: z.string().min(1, "Please select a payment method!"),
  note: z.string().optional(),
});

type FormSchemaValue = z.infer<typeof schema>;

export default function CheckoutForm({
  addresses,
  deliveryOptions,
}: CheckoutProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );
  const [selectedAddress, setSelectedaddress] = useState<Address | null>(null);
  const router = useRouter();
  const { items } = useCart();
  const subTotal = items.reduce((acc, item) => {
    return acc + Number(item.price) * Number(item.quantity);
  }, 0);
  const shippingCost = selectedDelivery ? Number(selectedDelivery.price) : 0;
  const total = subTotal + shippingCost;
  const form = useForm<FormSchemaValue>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      addressId: "",
      deliveryId: "",
      paymentMethod: "",
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
            render={() => (
              <FormItem className="flex flex-col justify-center">
                <div className="flex justify-between">
                  <FormLabel className="flex items-center text-lg">
                    <MapPin className="w-4 h-4 mr-1" /> Address
                  </FormLabel>
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Select address</Button>
                    </DialogTrigger>
                    <DialogContent className="gap-4">
                      <DialogTitle className="text-sm font-semibold">
                        Select an address
                      </DialogTitle>
                      <div className="space-y-2">
                        {(addresses?.length as number) > 0 &&
                          addresses?.map((item) => (
                            <Card
                              key={item.id}
                              onClick={() => {
                                setSelectedaddress(item);
                                form.setValue("addressId", item.id);
                                form.trigger("addressId");
                                setIsOpen(false);
                              }}
                              className="border cursor-pointer p-3 bg-[#e3e1e1] flex justify-between items-center"
                            >
                              <div>
                                <h1 className="font-bold text-lg">
                                  {item.province}
                                </h1>
                                <p className="text-sm">{item.addressDetail}</p>
                              </div>
                              <div>
                                <h1 className="font-bold text-lg">
                                  {item.user.name}
                                </h1>
                                <p className="text-sm">
                                  {item.user.phoneNumber}
                                </p>
                              </div>
                            </Card>
                          ))}
                        {addresses?.length === 0 && <NoResult />}
                      </div>
                      <DialogFooter className="mt-20">
                        <Button onClick={() => router.push("/profile/address")}>
                          Create address <Plus className="ml-1" />
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Card */}
          {selectedAddress && (
            <Card className="border p-3 my-2 bg-[#e3e1e1] flex justify-between items-center">
              <div>
                <h1 className="font-bold text-lg">
                  {selectedAddress?.province}
                </h1>
                <p className="text-sm">{selectedAddress?.addressDetail}</p>
              </div>
              <div>
                <h1 className="font-bold text-lg">
                  {selectedAddress?.user.name}
                </h1>
                <p className="text-sm">{selectedAddress?.user.phoneNumber}</p>
              </div>
            </Card>
          )}

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
                  <FormMessage />
                  <div className="space-y-3">
                    {deliveryOptions?.map((option) => (
                      <div
                        key={option.id}
                        className={`p-4 flex space-x-4 items-center border rounded-lg cursor-pointer ${
                          selectedDelivery?.id === option.id
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-300"
                        }`}
                        onClick={() => {
                          setSelectedDelivery(option);
                          form.setValue("deliveryId", option.id);
                          form.trigger("deliveryId");
                        }}
                      >
                        <Image
                          alt={option.name}
                          src={option.logo_url}
                          width={100}
                          height={100}
                          className="rounded-md"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">
                            {option.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {option.description}
                          </p>
                          <p className="text-red-500 font-bold">
                            {formatter.format(Number(option.price))}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FormItem>
            )}
          />

          <Separator className="mt-4 mb-8" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-lg">Sub Total</h1>
              <p className="font-bold text-red-600">
                {formatter.format(Number(subTotal))}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-lg">Shipping Cost</h1>
              <p className="font-bold text-red-600">
                {formatter.format(shippingCost)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-lg">Total</h1>
              <p className="font-bold text-red-600">
                {formatter.format(total)}
              </p>
            </div>
          </div>
          <Separator className="mb-4 mt-8" />
          <div
            onClick={() => {
              form.setValue("paymentMethod", "cash");
              form.trigger("paymentMethod");
            }}
          >
            Cash
          </div>
          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={!form.formState.isValid}>
              Pay Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
