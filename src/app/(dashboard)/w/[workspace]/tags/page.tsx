"use client";
import { db } from "@/lib/db/drizzle";
import { Document } from "@/lib/db/schema";
import { useWorkspaces } from "@/lib/hooks/use-workspaces";
import { sql } from "drizzle-orm";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import DocumentListItem from "@/components/documents/DocumentList";

type TDocumentGroupedByTag = {
  tag: string;
  documents: Document[];
};

const getDocumentsGroupedByTag = async (user: string, workspace: string) => {
  const docs =
    await db.execute(sql`SELECT t.tag, json_agg(d.*) AS documents FROM documents d,
  LATERAL UNNEST(d.tags) AS t(tag) WHERE d.author_id = ${user} AND d.workspace_id=${workspace} GROUP BY t.tag;`);
  console.log(docs?.rows);
  return docs?.rows as TDocumentGroupedByTag[];
};
const Page = () => {
  const { data } = useSession();
  const { currentWorkspace } = useWorkspaces();
  const { data: docs } = useQuery(
    ["group-documents-by-tags", data?.user?.id, currentWorkspace?.id],
    () => getDocumentsGroupedByTag(data?.user?.id!, currentWorkspace!?.id!)
  );
  return (
    <section className="w-full flex flex-col items-center justify-center pt-28">
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
              <AccordionContent className="data-[state='open']:border-t border-0 border-neutral-300 dark:border-lightGray/10 border-t  flex flex-col items-center justify-start">
                <div className=" gap-4 p-2 py-5 w-full">
                  {doc.documents.map((d) => (
                    <DocumentListItem
                      key={d?.id}
                      document={d}
                      handleCheckChange={() => {}}
                      checked={false}
                    />
                    // <Card className="rounded-xl" key={d?.id}>
                    //   <CardHeader>
                    //     <CardTitle className="text-lg font-medium tracking-tight leading-tight">
                    //       {d.title}
                    //     </CardTitle>
                    //     <span>
                    //       {d?.createdAt?.toLocaleString("en-US", {
                    //         month: "short",
                    //         day: "numeric",
                    //         year: "numeric",
                    //       })}
                    //     </span>
                    //   </CardHeader>
                    // </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
};

export default Page;
