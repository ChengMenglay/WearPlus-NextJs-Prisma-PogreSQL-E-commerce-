"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";
import { signInUser } from "../actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next-nprogress-bar";
import { CgSpinnerTwoAlt } from "react-icons/cg";

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
  const [isLoading, setIsLoading] = useState(false);

  const onSubmited = async (data: LoginSchema) => {
    try {
      setIsLoading(true);
      const result = await signInUser(data);
      if (result.status === "success") {
        toast.success(result.data);
        router.push("/");
        router.refresh();
      } else {
        toast.error(result.error as string);
      }
    } catch (error) {
      toast.error(`Server Error ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full md:w-2/5 mx-auto p-8">
      <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmited)} className="py-4 space-y-2">
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              className="mt-1"
              type="email"
              id="email"
              disabled={isLoading}
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
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <CardDescription className="flex flex-col items-center my-4">
            <Button
              disabled={isLoading}
              type="submit"
              className="my-2 w-full h-10 font-bold"
            >
              {isLoading && <CgSpinnerTwoAlt className=" animate-spin" />}
              <span>{isLoading ? "Loading..." : "Login"}</span>
            </Button>
            <span>
              Need an account?
              <Link href="/register" className="px-2 font-bold underline">
                Register
              </Link>
            </span>
          </CardDescription>
        </form>
      </CardContent>
    </Card>
  );
}
