import { getServerAuthSession } from "@/lib/auth";
import { createCollection } from "@/lib/db/collections";
import { db } from "@/lib/db/drizzle";
import { Collection, collections, documents } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getServerAuthSession();
  const workspace = req.nextUrl.searchParams?.get("workspace");
  if (workspace === null) {
    return Response.json(
      { data: null, error: "Missing parameters" },
      { status: 400 }
    );
  }

  const allCollections = await db
    .select({
      collection: collections,
      documents_count: db.$count(
        documents,
        and(
          eq(documents.collectionId, collections.id),
          eq(documents.workspaceId, workspace as string),
          eq(documents.authorId, user?.user?.id as string)
        )
      ),
    })
    .from(collections)
    .where(
      and(
        eq(collections?.userId, user?.user?.id as string),
        eq(collections.workspaceId, workspace as string)
      )
    )
    .leftJoin(documents, eq(documents?.collectionId, collections?.id))
    .groupBy(collections?.id);

  return Response.json({ data: allCollections, error: null }, { status: 201 });
}
export async function POST(req: NextRequest) {
  const { name, tags, documents }: Collection & { documents?: string[] } =
    await req.json();
  const user = await getServerAuthSession();
  const workspace = req.nextUrl.searchParams?.get("workspace");

  const resp = await createCollection({
    name: name as string,
    tags: tags as string[],
    user: user?.user?.id as string,
    documents,
    workspace: workspace as string,
  });
  if (resp?.error)
    return Response.json({ data: null, error: resp.error }, { status: 400 });
  return Response.json({ data: resp?.data, error: null }, { status: 201 });
}
export async function PUT(req: NextRequest) {}
export async function DELETE(req: NextRequest) {}
