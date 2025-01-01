"use client";
import DocumentCardItem from "@/components/documents/DocumentCard";
import DocumentCardView from "@/components/documents/DocumentCardView";
import DocumentListItem from "@/components/documents/DocumentList";
import DocumentListView, {
  DocumentListViewSkeleton,
} from "@/components/documents/DocumentListView";
import DocumentViewOptions from "@/components/DocumentViewOptions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useActiveView } from "@/lib/context";
import { db } from "@/lib/db/drizzle";
import { Document } from "@/lib/db/schema";
import { useWorkspaces } from "@/lib/hooks/use-workspaces";
import { cn } from "@/lib/utils";
import { sql } from "drizzle-orm";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

type TDocumentGroupedByTag = {
  tag: string;
  documents: Document[];
};

const getDocumentsGroupedByTag = async (user: string, workspace: string) => {
  const docs =
    await db.execute(sql`SELECT t.tag, json_agg(d.*) AS documents FROM documents d,
  LATERAL UNNEST(d.tags) AS t(tag) WHERE d.author_id = ${user} AND d.workspace_id=${workspace} GROUP BY t.tag;`);
  return docs?.rows.map((row) => ({
    tag: row?.tag,
    documents: (row?.documents as any[]).map((d) => ({
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
  })) as TDocumentGroupedByTag[];
};
const Page = () => {
  const { data } = useSession();
  const { activeView } = useActiveView();
  const { currentWorkspace } = useWorkspaces();
  const { data: docs, isLoading } = useQuery(
    ["group-documents-by-tags", data?.user?.id, currentWorkspace?.id],
    () =>
      getDocumentsGroupedByTag(
        data?.user?.id as string,
        currentWorkspace?.id as string
      )
  );

  return (
    <section className="w-full flex flex-col items-center justify-center mt-28  ">
      <DocumentViewOptions
        documentsContainerClassName={cn("px-0 w-full", isLoading && "px-2")}
        title="Tags"
      >
        <Accordion type="multiple" className="w-full ">
          {docs?.map((doc, i) => {
            return (
              <AccordionItem
                className="w-full border-y border-neutral-300 dark:border-lightGray/10 py-2"
                value={`tags-${doc?.tag}`}
                key={doc.tag}
              >
                <AccordionTrigger className="text-base border-neutral-300 font-medium dark:border-lightGray/10 px-4 py-3">
                  {doc.tag}
                </AccordionTrigger>
                <AccordionContent className="data-[state='open']:border-t border-0 border-neutral-300 dark:border-lightGray/10 border-t py-4 px-2 flex flex-col items-center justify-start">
                  {activeView === "list" ? (
                    <DocumentListView
                      isLoading={isLoading}
                      data={doc?.documents}
                    />
                  ) : (
                    <DocumentCardView
                      data={doc?.documents}
                      isLoading={isLoading}
                    />
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </DocumentViewOptions>
    </section>
  );
};

export default Page;
