"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  EditProfileSchema,
  editProfileSchema,
} from "@/lib/schemas/editProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Edit } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleFormServerErrors } from "@/lib/utils";
import { updateUserProfile } from "@/app/(auth)/actions/userAction";

type Props = {
  users: User | null;
};
export default function EditProfile({ users }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    mode: "onTouched",
  });
  const onSubmitted = async (data: EditProfileSchema) => {
    const result = await updateUserProfile(data);
    if (result.status === "success") {
      toast.success("Profile updated");
      router.refresh();
    } else {
      handleFormServerErrors(result, setError);
    }
  };
  return (
    <div className=" space-y-6">
      <div className="flex space-x-4">
        <div className="w-full space-y-2">
          <Label htmlFor="name" className="font-semibold">
            Name
          </Label>
          <Input
            type="text"
            disabled
            defaultValue={users?.name || ""}
            id="name"
            className="h-12"
          />
        </div>
        <div className="w-full space-y-2">
          <Label htmlFor="role" className="font-semibold">
            Role
          </Label>
          <Input
            type="role"
            disabled
            defaultValue={users?.role || ""}
            id="role"
            className="h-12 uppercase"
          />
        </div>
      </div>
      <div className="w-full space-y-2">
        <Label htmlFor="email" className="font-semibold">
          Email
        </Label>
        <Input
          type="email"
          disabled
          defaultValue={users?.email || ""}
          id="email"
          className="h-12"
        />
      </div>
      <div className="flex space-x-4">
        <div className="w-full space-y-2">
          <Label htmlFor="phoneNumber" className="font-semibold">
            Phone number
          </Label>
          <Input
            type="text"
            disabled
            defaultValue={users?.phoneNumber || "Null"}
            id="phoneNumber"
            className="h-12 "
          />
        </div>
        <div className="w-full space-y-2">
          <Label htmlFor="address" className="font-semibold">
            Address
          </Label>
          <Input
            type="text"
            disabled
            defaultValue={users?.address || "Null"}
            id="address"
            className="h-12 "
          />
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Edit />
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <form onSubmit={handleSubmit(onSubmitted)}>
            <div className="flex space-x-4">
              <div className="w-full space-y-2">
                <Label htmlFor="name" className="font-semibold">
                  Name
                </Label>
                <Input
                  type="text"
                  defaultValue={users?.name || ""}
                  id="name"
                  className="h-12"
                  {...register("name")}
                />
                {errors?.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="w-full space-y-2">
                <Label htmlFor="role" className="font-semibold">
                  Role
                </Label>
                <Input
                  type="role"
                  disabled
                  defaultValue={users?.role || ""}
                  id="role"
                  className="h-12 uppercase"
                />
              </div>
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="email" className="font-semibold">
                Email
              </Label>
              <Input
                type="email"
                defaultValue={users?.email || ""}
                id="email"
                className="h-12"
                {...register("email")}
              />
              {errors?.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="phoneNumber" className="font-semibold">
                Phone number
              </Label>
              <Input
                type="text"
                defaultValue={users?.phoneNumber || ""}
                id="phoneNumber"
                className="h-12 "
                {...register("phoneNumber")}
              />
              {errors?.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="address" className="font-semibold">
                Address
              </Label>
              <Input
                type="text"
                defaultValue={users?.address || ""}
                id="address"
                className="h-12 "
                {...register("address")}
              />
              {errors?.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>
            <DialogFooter className="mt-4">
              <DialogTrigger asChild>
                <Button type="submit">Save changes</Button>
              </DialogTrigger>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
