"use client";
import CreateWorkspace from "@/components/onboarding/create-workspace";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { setActiveWorkspace } from "@/lib/actions";
import { Workspace } from "@/lib/db/schema";
import { deleteWorkspace } from "@/lib/db/workspaces";
import { useWorkspaces } from "@/lib/hooks/use-workspaces";
import { queryClient } from "@/lib/session-provider";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

const Page = () => {
  const { workspaces, isLoading } = useWorkspaces();
  const { data } = useSession();

  const handleWorkspaceClick = (workspace: Workspace) => {
    setActiveWorkspace(workspace);
  };

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center">
      <FormWrapper />
      <div className="mt-6 flex w-full max-w-sm flex-col space-y-2">
        {isLoading
          ? [...Array(3)].map((_, i) => {
              return (
                <Skeleton
                  key={i}
                  className="w-full h-16 rounded-lg  bg-neutral-200/80 dark:bg-lightGray/10"
                />
              );
            })
          : workspaces?.map((workspace, i) => {
              return (
                <Link
                  key={i}
                  prefetch={true}
                  href={`/w/${workspace?.id}`}
                  className="w-full flex items-start justify-between rounded-lg border border-neutral-300/60 p-3 dark:border-lightGray/10 cursor-pointer "
                >
                  <div onClick={() => handleWorkspaceClick(workspace)}>
                    <span>{workspace?.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="smallIcon"
                    onClick={async () => {
                      const { ok, error } = await deleteWorkspace(
                        workspace?.id
                      );
                      if (!ok) {
                        toast.error(error);
                        return;
                      }
                      toast.success("Workspace Deleted");
                      queryClient.refetchQueries([
                        "get-workspaces",
                        data?.user?.id,
                      ]);
                    }}
                  >
                    <Trash2 className="size-4 opacity-80" />
                  </Button>
                </Link>
              );
            })}
      </div>
    </section>
  );
};

export default Page;

const FormWrapper = () => {
  return (
    <div className="h-[240px] w-full max-w-sm rounded-lg border border-neutral-300/60 dark:border-lightGray/10">
      <CreateWorkspace />
    </div>
  );
};
