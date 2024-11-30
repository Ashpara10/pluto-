"use client";
import { setActiveWorkspace } from "@/lib/actions";
import { useWorkspaceDialog } from "@/lib/context";
import { Workspace } from "@/lib/db/schema";
import { useWorkspaces } from "@/lib/hooks/use-workspaces";
import { ChevronsUpDown, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

const WorkspaceSwitcher = () => {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const { setIsCreateWorkspaceDialogOpen } = useWorkspaceDialog();
  const { workspaces, isLoading, currentWorkspace } = useWorkspaces();
  if (isLoading)
    return (
      <Skeleton className="h-10 w-64 animate-pulse rounded-lg bg-neutral-200/60 dark:bg-lightGray/10" />
    );
  const handleWorkspaceClick = (workspace: Workspace) => {
    if (workspace?.id === currentWorkspace?.id) return;
    setActiveWorkspace(workspace);
    router.replace(`/w/${workspace?.id}`);
  };
  return (
    <Popover>
      <PopoverTrigger asChild className="w-full max-w-64">
        <button
          onClick={() => setShow(!show)}
          className="flex w-full items-center justify-center gap-x-1 rounded-lg border border-neutral-200/60 px-3 py-2  hover:bg-neutral-100 dark:border-lightGray/10 dark:hover:bg-lightGray/10"
        >
          <div className="ml-1 w-full flex items-center justify-between">
            <span className="w-full line-clamp-1 text-sm leading-tight">
              {currentWorkspace!?.name}
            </span>
            <ChevronsUpDown
              className="ml-1 h-4 w-4 opacity-75"
              aria-hidden="true"
            />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        style={{ scrollbarWidth: "none" }}
        className="ml-3  mt-2  w-64 rounded-xl bg-white/70 p-0  shadow-black/30 drop-shadow-xl backdrop-blur-lg dark:bg-neutral-900 overflow-hidden "
      >
        <div className="">
          <ScrollArea className=" scrollbar-none flex max-h-52 h-fit flex-col space-y-1 overflow-y-auto p-0">
            {!workspaces
              ? [...Array(10)].map((_, i) => {
                  return (
                    <Skeleton
                      key={i}
                      className="h-10 w-full animate-pulse rounded-lg bg-neutral-200/60 dark:bg-lightGray/10"
                    />
                  );
                })
              : workspaces!?.map((workspace) => {
                  return (
                    <div
                      key={workspace?.id}
                      className="flex w-full cursor-pointer items-center justify-start border-t border-neutral-200/60  px-3 py-2 first:border-none  dark:border-lightGray/10 "
                      onClick={() => handleWorkspaceClick(workspace)}
                    >
                      <div>
                        {workspace?.image ? (
                          <Image
                            src={workspace?.image!}
                            width={20}
                            height={20}
                            className="rounded-full size-8"
                            alt={`workspace-${workspace?.image}`}
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-red-500 via-indigo-300 to-transparent" />
                        )}
                      </div>
                      <div className="ml-3 flex flex-col">
                        <span className="line-clamp-2 text-sm leading-tight tracking-tight">
                          {workspace?.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
          </ScrollArea>
        </div>

        <button
          onClick={() => {
            setIsCreateWorkspaceDialogOpen!(true);
          }}
          className="group w-full flex cursor-pointer items-center justify-start gap-x-2 border-t border-neutral-200/60  px-3 py-2 dark:border-lightGray/10"
        >
          <Plus className="size-4 opacity-70 group-hover:opacity-100" />{" "}
          <span className="text-sm opacity-70 group-hover:opacity-100">
            Create Workspace
          </span>
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default WorkspaceSwitcher;
