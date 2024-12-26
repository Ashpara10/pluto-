import { getServerAuthSession } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { documents } from "@/lib/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const sessionData = await getServerAuthSession();

  const workspace = req.nextUrl.searchParams?.get("workspace");
  const sortBy = req.nextUrl.searchParams?.get("sortBy");
  let sortDocumentsBy;
  switch (sortBy) {
    case "createdAt":
      sortDocumentsBy = documents?.createdAt;
      break;
    case "updatedAt":
      sortDocumentsBy = documents?.updatedAt;
      break;

    case "favorites":
      sortDocumentsBy = documents?.isFavorite;
      break;

    default:
      sortDocumentsBy = documents?.createdAt;
      break;
  }

  const workspaceDocuments = await db
    .select()
    .from(documents)
    .where(
      and(
        eq(documents?.workspaceId, workspace as string),
        eq(documents?.authorId, sessionData?.user.id as string)
      )
    )
    .orderBy(desc(sortDocumentsBy));

  return Response.json(
    {
      documents:
        sortBy === "favourites"
          ? workspaceDocuments?.filter((d) => d?.isFavorite)
          : workspaceDocuments,
    },
    { status: 201 }
  );
}
