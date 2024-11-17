"use client";
import React, { FC } from "react";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { Label } from "../ui/label";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { useWorkspaces } from "@/lib/hooks/use-workspaces";
import Image from "next/image";

const UpdateAccount = () => {
  const { data: user, status } = useSession();
  const { currentWorkspace } = useWorkspaces();
  const methods = useForm({
    values: {
      image: user?.user?.image,
      name: user?.user?.name,
      email: user?.user?.email,
      defaultWorkspace: currentWorkspace!?.name,
    },
  });
  return (
    <div className="max-w-xl w-full">
      <FormProvider {...methods}>
        <div className="mt-10">
          {/* <UpdateFieldForm field="name" title="Your Name" /> */}
          <UpdateProfileForm />
          {/* <hr className="w-full h-1 dark:bg-lightGray/10 bg-neutral-200/60" /> */}
          <UpdateWorkspaceSettings />
        </div>
      </FormProvider>
    </div>
  );
};

const UpdateWorkspaceSettings = () => {
  const { register, getValues } = useFormContext();
  const values = getValues();
  return (
    <div className="mt-6 w-full border dark:border-lightGray/10 border-neutral-300/80 rounded-lg p-3 ">
      <div>
        <h3 className="text-xl font-medium tracking-tight">
          Configure Workspace Settings
        </h3>
        <span className="opacity-75 leading-snug">
          Update and Configure your worspace settings
        </span>
      </div>
      <div>
        <form className="mt-4">
          <Label className="mt-2">Default Workspace</Label>
          <Input className="mt-2" {...register("defaultWorkspace")} />
        </form>
      </div>
    </div>
  );
};

const UpdateProfileForm: FC = () => {
  const { register, getValues } = useFormContext();
  const values = getValues();
  return (
    <div className="w-full">
      <div>
        <h3 className="text-xl font-medium tracking-tight">Your Account</h3>
        <span className="opacity-75 leading-snug">
          This information will be visible to other users on Pluto.app
        </span>
      </div>
      <div>
        <form className="py-4 flex flex-col items-start gap-3 justify-center">
          <div className="flex">
            {values?.image && (
              <Image
                className="rounded-full"
                src={values?.image}
                alt={`${values?.name}-avatar`}
                width={60}
                height={60}
              />
            )}
            <div className="ml-2 flex flex-col items-start justify-center">
              <div className="flex items-center justify-start gap-2">
                <Button size={"sm"} variant={"outline"}>
                  Upload
                </Button>
                <Button size={"sm"} variant={"outline"}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
          <Label>Name</Label>
          <Input {...register("name")} />
          <Label>Email</Label>
          <Input {...register("email")} />
          <div className="flex mt-6 gap-3 w-full items-center justify-start">
            <Button>Discard Changes</Button>
            <Button>Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
type UpdateFieldFormProps = {
  title: string;
  field: string;
  //   value: string;
};

const UpdateFieldForm: FC<UpdateFieldFormProps> = ({ title, field }) => {
  const { register } = useFormContext();
  return (
    <div className="border w-full flex flex-col p-4 items-start justify-center rounded-lg  border-neutral-200/60 dark:border-lightGray/10">
      <div className="w-full flex flex-col items-start justify-center">
        <Label className="text-lg font-medium tracking-tight">{title}</Label>
        <span className="opacity-75 text-sm mt-2">
          This will be your display name on Pluto.app
        </span>
        <Input
          {...register(field)}
          className=" px-3 border-neutral-200/60 dark:border-lightGray/10 py-4 mt-2  opacity-75 w-full"
        />
      </div>
      <div className="border-neutral-200/60 dark:border-lightGray/10 border-t">
        <Button variant={"outline"}>Save</Button>
      </div>
    </div>
  );
};

export default UpdateAccount;
