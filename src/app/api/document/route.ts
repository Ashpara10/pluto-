import { getServerAuthSession } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { collections, documents } from "@/lib/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const sessionData = await getServerAuthSession();
  // console.log({ sessionData: sessionData?.user?.id });
  const collection = req.nextUrl.searchParams?.get("collection");
  const workspace = req.nextUrl.searchParams?.get("workspace");

  if (collection !== null) {
    const collectionDocuments = await db
      .select()
      .from(collections)
      .where(
        and(
          eq(collections.userId, sessionData!?.user.id!),
          eq(collections?.slug, collection),
          eq(collections?.workspaceId, workspace!)
        )
      )
      .leftJoin(documents, eq(documents?.collectionId, collections?.id));

    console.log({ collectionDocuments });
    return Response.json({ data: collectionDocuments }, { status: 201 });
  }

  const workspaceDocuments = await db
    .select()
    .from(documents)
    .where(
      and(
        eq(documents?.workspaceId, workspace!),
        eq(documents?.authorId, sessionData!?.user.id!)
      )
    )
    .orderBy(desc(documents?.createdAt));
  // console.log({ workspaceDocuments });
  return Response.json({ documents: workspaceDocuments }, { status: 201 });
}
