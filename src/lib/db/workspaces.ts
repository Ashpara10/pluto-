import { eq } from "drizzle-orm";
import { getSession } from "next-auth/react";
import { CreateWorkspacePayload } from "../types";
import { getSlug } from "../utils";
import { db } from "./drizzle";
import { workspaces } from "./schema";

export const getUserWorkspaces = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error("USER-WORKSPACES: User not found");
  }
  const userWorkspaces = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces?.user, session?.user?.id as string));

  return userWorkspaces;
};

export const getWorkspaceByID = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Provide a valid workspace ID");
    }
    const w = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces?.id, id))
      .limit(1);

    return { data: w[0], error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const createWorkspace = async (payload: CreateWorkspacePayload) => {
  try {
    const slug = getSlug(payload?.name);
    const workspace = await db
      .insert(workspaces)
      .values({
        name: payload?.name,
        user: payload?.user,
        image: payload?.image,
        slug: slug,
      })
      .returning();
    return { data: workspace[0], error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const deleteWorkspace = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Provide a valid workspace ID");
    }
    await db.delete(workspaces).where(eq(workspaces?.id, id));
    return { ok: true, error: null };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
};
