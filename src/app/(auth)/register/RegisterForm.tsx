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
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleFormServerErrors } from "@/lib/utils";
import { CgSpinnerTwoAlt } from "react-icons/cg";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmitted = async (data: RegisterSchema) => {
    try {
      setIsLoading(true);
      const result = await registerUser(data);
      if (result.status === "error") {
        handleFormServerErrors(result, setError);
      }
      toast.success("Registered Successfully!");
      router.replace("/");
    } catch (error) {
      toast.error(`Server Error ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className=" w-full md:w-2/5 p-8 mx-auto">
      <CardTitle className="text-center text-2xl font-bold ">
        Register
      </CardTitle>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitted)} className="py-4 space-y-2">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              className="mt-1"
              type="username"
              id="username"
              disabled={isLoading}
              {...register("name")}
            />
            {errors?.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
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
          <div>
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
              data-prevent-nprogress={true}
            >
              {isLoading && <CgSpinnerTwoAlt className=" animate-spin" />}
              <span>{isLoading ? "Loading..." : "Register"}</span>
            </Button>
            <span>
              Already have an account?
              <Link href={"/login"} className="px-2 font-bold underline">
                Log In
              </Link>
            </span>
          </CardDescription>
        </form>
      </CardContent>
    </Card>
  );
}
