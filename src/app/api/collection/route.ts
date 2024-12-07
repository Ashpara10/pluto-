import { getServerAuthSession } from "@/lib/auth";
import { createCollection } from "@/lib/db/collections";
import { db } from "@/lib/db/drizzle";
import { Collection, collections, documents } from "@/lib/db/schema";
import { and, count, eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getServerAuthSession();
  const workspace = req.nextUrl.searchParams?.get("workspace");
  if (user === null || workspace === null) {
    return Response.json(
      { data: null, error: "Missing parameters" },
      { status: 400 }
    );
  }
  // const documentsCount = await db
  //   .select({ count: count() })
  //   .from(documents)
  //   .where(
  //     and(
  //       eq(documents.workspaceId, workspace),
  //       eq(documents.authorId, user?.user?.id!),
  //       eq(documents?.collectionId, collections?.id)
  //     )
  //   )
  //   .as("documents_count");
  // console.log(documentsCount);

  const allCollections = await db
    .select({
      collection: collections,
      documents_count: sql<number>`count(${documents?.id})`,
    })
    .from(collections)
    .where(
      and(
        eq(collections?.userId, user?.user?.id!),
        eq(collections.workspaceId, workspace!)
      )
    )
    .leftJoin(documents, eq(documents?.collectionId, collections?.id))
    .groupBy(collections?.id);

  return Response.json({ data: allCollections, error: null });
}
export async function POST(req: NextRequest) {
  const { name, tags, documents }: Collection & { documents?: string[] } =
    await req.json();
  const user = await getServerAuthSession();
  const workspace = req.nextUrl.searchParams?.get("workspace");

  const resp = await createCollection({
    name: name!,
    tags: tags!,
    user: user?.user?.id!,
    documents,
    workspace: workspace!,
  });
  if (resp?.error)
    return Response.json({ data: null, error: resp.error }, { status: 400 });
  return Response.json({ data: resp?.data, error: null }, { status: 201 });
}
export async function PUT(req: NextRequest) {}
export async function DELETE(req: NextRequest) {}
