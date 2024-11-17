"use client";
import { cache, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getActiveWorkspace, setActiveWorkspace } from "../actions";
import { Workspace } from "../db/schema";
import { getUserWorkspaces, getWorkspaceByID } from "../db/workspaces";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { isValidUUID } from "../utils";

type GetWorkspacesResponse = {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
};

export const useWorkspaces = () => {
  const { data: user } = useSession();
  const router = useRouter();
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );
  const { workspace: workspaceId } = useParams();
  const { data, isLoading, refetch } = useQuery(
    ["get-workspaces", user?.user?.id!],
    cache(async () => await getUserWorkspaces(user?.user?.id!)),
    { enabled: false }
  );

  useEffect(() => {
    refetch();
  }, [user]);

  useEffect(() => {
    if (!workspaceId || !isValidUUID(workspaceId as string)) {
      router.push("/workspace");
      return;
    }
    (async () => {
      const workspace = await getWorkspaceByID(workspaceId as string);
      console.log({ workspace, workspaceId });
      if (workspace?.error) {
        toast.error(workspace?.error);
        return;
      }
      if (workspace.data?.length === 0) {
        router.push("/workspace");
        return;
      }
      setActiveWorkspace(workspace!?.data![0]);
      setCurrentWorkspace(workspace!?.data![0]);
    })();
  }, [workspaceId]);

  return {
    isLoading,
    workspaces: data,
    currentWorkspace,
  };
};
