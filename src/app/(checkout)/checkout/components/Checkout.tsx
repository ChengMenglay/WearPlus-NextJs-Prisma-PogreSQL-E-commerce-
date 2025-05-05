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
import {
  ArrowRight,
  BusFrontIcon,
  CreditCard,
  MapPin,
  Notebook,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Address, Delivery } from "../../../../../types";
import { formatter } from "@/lib/utils";
import Image from "next/image";
import useCart from "@/hooks/use-cart";
import { FaMoneyBill } from "react-icons/fa";
import axios from "axios";
import { CgSpinnerAlt } from "react-icons/cg";
import { toast } from "react-toastify";

const schema = z.object({
  addressId: z.string().min(1, "Please select an address!"),
  deliveryId: z.string().min(1, "Please select a delivery!"),
  paymentMethod: z.string().min(1, "Please select a payment method!"),
  note: z.string().optional(),
});

type FormSchemaValue = z.infer<typeof schema>;

const paymentMethodOptions = [
  {
    id: "cash",
    label: "Cash on delivery",
    description: "Pay with cash when product arrived at your address.",
    icon: FaMoneyBill,
  },
  {
    id: "credit-card",
    label: "Credit Card",
    description: "Click Pay Now to proceed to the payment form.",
    icon: CreditCard,
  },
];

type CheckoutProps = {
  userId: string | null;
  addresses: Address[] | null;
  deliveryOptions: Delivery[] | null;
};

const AddressCard = ({ address }: { address: Address }) => (
  <Card className="border p-3 my-2 bg-[#e3e1e1] flex justify-between items-center">
    <div>
      <h1 className="font-bold text-lg">{address.province}</h1>
      <p className="text-sm">{address.addressDetail}</p>
    </div>
    <div>
      <h1 className="font-bold text-lg">{address.user.name}</h1>
      <p className="text-sm">{address.user.phoneNumber}</p>
    </div>
  </Card>
);

export default function CheckoutForm({
  addresses,
  deliveryOptions,
  userId,
}: CheckoutProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { items, removeAll } = useCart();

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

  const selectedAddress = addresses?.find(
    (addr) => addr.id === form.watch("addressId")
  );

  const selectedDelivery = deliveryOptions?.find(
    (del) => del.id === form.watch("deliveryId")
  );

  const subTotal = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      ),
    [items]
  );

  const shippingCost = selectedDelivery ? Number(selectedDelivery.price) : 0;
  const total = useMemo(
    () => subTotal + shippingCost,
    [subTotal, shippingCost]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onPayNow = useCallback(
    async (data: FormSchemaValue) => {
      if (items.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      try {
        setIsLoading(true);

        if (data.paymentMethod === "cash") {
          const order = await axios.post("/api/order", {
            addressId: data.addressId,
            deliveryId: data.deliveryId,
            userId,
            isPaid: false,
            status: "Pending",
            payment: data.paymentMethod,
            note: data.note,
          });

          if (order.status === 200) {
            await Promise.all(
              items.map(async (item) => {
                await axios.post("/api/orderItem", {
                  orderId: order.data.id,
                  productId: item.id,
                  quantity: item.quantity,
                  price: item.price,
                  size: item.sizes[0].size.name,
                });

                //Update stock for each product
                const reStock = item.stock - Number(item?.quantity);
                await axios.patch("/api/product", {
                  id: item.id,
                  stock: reStock,
                });
              })
            );
            toast.success("Order placed successfully!");
            removeAll();
            router.refresh();
            router.push("/");
          }
        } else if (data.paymentMethod === "credit-card") {
          // Implement credit card payment flow here
          toast.info("Redirecting to payment gateway...");
          // Example: redirect to a payment gateway or show a payment form
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            `Request failed: ${error.response?.data || error.message}`
          );
        } else {
          toast.error("Something went wrong. Please try again.");
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [items, userId, removeAll, router]
  );

  if (!isMounted) return null;

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
                        {addresses?.length ? (
                          addresses.map((item) => (
                            <Card
                              key={item.id}
                              onClick={() => {
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
                          ))
                        ) : (
                          <NoResult />
                        )}
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

          {selectedAddress && <AddressCard address={selectedAddress} />}

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
                  <Textarea
                    placeholder="Type your note here."
                    {...field}
                    disabled={isLoading}
                  />
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
                          form.watch("deliveryId") === option.id
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-300"
                        }`}
                        onClick={() => {
                          form.setValue("deliveryId", option.id);
                          form.trigger("deliveryId");
                        }}
                      >
                        <Image
                          alt={option.name}
                          src={option.logo_url}
                          width={75}
                          height={75}
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

          <Separator className="my-4" />

          {/* Payment Method Selection */}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={() => (
              <FormItem>
                <FormLabel className="flex items-center text-lg mb-4">
                  <FaMoneyBill className="w-4 h-4 mr-1" /> Payment Method
                </FormLabel>
                <div className="px-4">
                  <div className="space-y-2">
                    {paymentMethodOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`p-4 flex space-x-4 items-center border rounded-lg cursor-pointer ${
                          form.watch("paymentMethod") === option.id
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-300"
                        }`}
                        onClick={() => {
                          form.setValue("paymentMethod", option.id);
                          form.trigger("paymentMethod");
                        }}
                      >
                        <option.icon className="w-6 h-6 mr-2" />
                        <span className="text-lg font-semibold">
                          <p>{option.label}</p>
                          <p className="text-gray-400 text-sm">
                            {option.description}
                          </p>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="mt-4 mb-8" />

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-lg">Sub Total</h1>
              <p className="font-bold text-red-600">
                {formatter.format(subTotal)}
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

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              disabled={
                !form.formState.isValid || isLoading || items.length <= 0
              }
              aria-disabled={
                !form.formState.isValid || isLoading || items.length <= 0
              }
            >
              {isLoading ? "Processing..." : "Pay Now"}
              {isLoading ? (
                <CgSpinnerAlt className=" animate-spin" />
              ) : (
                <ArrowRight className="ml-2 w-4 h-4" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
