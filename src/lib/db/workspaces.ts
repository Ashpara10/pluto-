import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { workspaces } from "./schema";
import { CreateWorkspacePayload } from "../types";
import { getSlug } from "../utils";

export const getUserWorkspaces = async (user: string) => {
  if (!user) {
    throw new Error("USER-WORKSPACES: User not found");
  }
  const userWorkspaces = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces?.user, user));

  // console.log({ userWorkspaces });

  return userWorkspaces;
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
    return { data: workspace, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};
