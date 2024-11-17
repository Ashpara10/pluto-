import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useWorkspaceDialog } from "@/lib/context";
import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { createWorkspace } from "@/lib/db/workspaces";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { queryClient } from "@/lib/session-provider";

const CreateWorkspaceDialogSchema = z.object({
  title: z.string().max(30).min(6),
});

const CreateWorkspace = () => {
  const { isCreateWorkspaceDialogOpen, setIsCreateWorkspaceDialogOpen } =
    useWorkspaceDialog();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof CreateWorkspaceDialogSchema>>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(CreateWorkspaceDialogSchema),
  });
  const { data: user } = useSession();
  const values = getValues();
  const watchTitle = watch("title");

  const workspaceImage = useMemo(() => {
    if (watchTitle === "")
      return "https://api.dicebear.com/9.x/glass/svg?seed=Untitled-Workspace";
    return `https://api.dicebear.com/9.x/glass/svg?seed=${watchTitle?.toLocaleLowerCase()}`;
  }, [watchTitle]);
  return (
    <Dialog
      open={isCreateWorkspaceDialogOpen}
      onOpenChange={setIsCreateWorkspaceDialogOpen}
    >
      <DialogContent className="max-w-md block bg-neutral-100 border border-neutral-200/60 dark:border-lightGray/10 dark:bg-neutral-900 ">
        <DialogHeader>
          <DialogTitle className="font-medium">Name Your Workspace</DialogTitle>
          <DialogDescription>
            A Workspace is a virtual space where you can collaborate, create and
            plan with your team.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <form
            className="block w-full"
            onSubmit={handleSubmit(async ({ title }) => {
              const { data, error } = await createWorkspace({
                image: workspaceImage,
                name: title,
                user: user?.user?.id!,
              });
              if (error) {
                toast.error("Failed to create workspace" + error);
                return;
              }
              toast.success("Workspace created successfully");
              await queryClient.refetchQueries([
                "get-workspaces",
                user?.user?.id!,
              ]);
            })}
          >
            <label htmlFor="workspace-image-input">
              <Image
                className="size-14 rounded-lg "
                width={56}
                height={56}
                src={workspaceImage}
                alt={`workspace-${values?.title}`}
              />
            </label>
            <input type="file" className="hidden" id="workspace-image-input" />
            <div className="mt-2">
              <Label className=" font-medium leading-tight tracking-tight">
                Workspace name
              </Label>
              <Input
                placeholder="Set Workspace name"
                className={cn(
                  "mt-1 placeholder:text-xs placeholder:opacity-70 bg-neutral-200 dark:bg-neutral-950/30 border border-neutral-300/60 dark:border-lightGray/10",
                  errors?.title && "focus-visible:ring-red-600/70"
                )}
                {...register("title")}
              />
              {errors?.title && (
                <span className="text-red-600 text-sm mt-2">
                  {errors?.title?.message}
                </span>
              )}
            </div>
            <div className="mt-3">
              <Button className="w-full rounded-lg " type="submit">
                Create Workspace
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
