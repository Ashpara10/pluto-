import { getServerAuthSession } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { collections, Document, documents } from "@/lib/db/schema";
import { and, eq, SQL, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  try {
    const slug = params?.slug;
    const session = await getServerAuthSession();
    const workspace = req.nextUrl.searchParams?.get("workspace");
    const sortBy = req.nextUrl.searchParams?.get("sortBy");
    let query: SQL;
    switch (sortBy) {
      case "createdAt":
        query = sql<
          Document[]
        >`json_agg(documents ORDER BY documents."created_at" DESC)`;
        break;
      case "updatedAt":
        query = sql<
          Document[]
        >`json_agg(documents ORDER BY documents."updated_at" DESC)`;
        break;

      case "favorites":
        query = sql<
          Document[]
        >`json_agg(documents ORDER BY documents."is_favorite" DESC)`;
        break;

      default:
        query = sql<Document[]>`json_agg(documents)`;
        break;
    }
    const [collectionDocuments] = await db
      .select({
        documents: !sortBy ? sql<Document[]>`json_agg(documents)` : query,
      })
      .from(documents)
      .where(
        and(
          eq(documents.authorId, session?.user.id as string),
          eq(documents.workspaceId, workspace as string),
          eq(collections.slug, slug)
        )
      )
      .leftJoin(collections, eq(documents?.collectionId, collections?.id));
    // .groupBy(collections.id);

    console.log({ collectionDocuments });
    return Response.json(
      {
        data: (collectionDocuments?.documents as any[])?.map((d) => ({
          id: d.id,
          title: d.title,
          content: d.content,
          tags: d.tags,
          markdown: d.markdown,
          authorId: d.author_id,
          workspaceId: d.workspace_id,
          collectionId: d.collection_id,
          createdAt: d.created_at,
          updatedAt: d.updated_at,
          deletedAt: d.deleted_at,
        })),
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { data: null, error: (error as Error).message },
      { status: 500 }
    );
  }
}
