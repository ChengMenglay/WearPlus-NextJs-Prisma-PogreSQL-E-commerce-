"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";
import { signInUser } from "../actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
  const router = useRouter();

  const onSubmited = async (data: LoginSchema) => {
    const result = await signInUser(data);
    if (result.status === "success") {
      toast.success(result.data);
      router.push("/");
      router.refresh();
    } else {
      toast.error(result.error as string);
    }
  };

  return (
    <Card className="w-full md:w-2/5 mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmited)} className="py-4">
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              className="mt-1"
              type="email"
              id="email"
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              className="mt-1"
              type="password"
              id="password"
              {...register("password")}
            />
            {errors?.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Button type="submit" className="w-full h-10 font-bold">
              Login
            </Button>
          </div>
          <CardDescription className="flex justify-center mt-4">
            Need an account?
            <Link href="/register" className="px-2 font-bold underline">
              Register
            </Link>
          </CardDescription>
        </form>
      </CardContent>
    </Card>
  );
}
