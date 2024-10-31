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
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { registerUser, signOutUser } from "../actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleFormServerErrors } from "@/lib/utils";

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
  const onSubmitted = async (data: RegisterSchema) => {
    const result = await registerUser(data);
    if (result.status === "error") {
      handleFormServerErrors(result, setError);
    }
    toast.success("Registered Successfully!");
    router.replace("/");
  };
  const handleLogout = async () => {
    await signOutUser();
  };
  return (
    <Card className=" w-full md:w-2/5  mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold ">
          Register
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitted)} className="py-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              className="mt-1"
              type="username"
              id="username"
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
              {...register("password")}
            />
            {errors?.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className=" space-y-2 my-2">
            <Button type="submit" className="w-full h-10 font-bold">
              Register
            </Button>
            <Button
              onClick={() => signIn("github")}
              className="w-full h-10 font-bold"
            >
              <FaGithub color="white" />
              Sign up with github
            </Button>
          </div>
        </form>
        <CardDescription className="flex justify-center">
          Already have an account?
          <Link href={"/login"} className="px-2 font-bold underline">
            Log In
          </Link>
          <Button onClick={handleLogout}>Logout</Button>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
