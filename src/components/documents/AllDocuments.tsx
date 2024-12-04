"use client";

import { fetchDocuments } from "@/app/(dashboard)/w/[workspace]/page";
import { useActiveView } from "@/lib/context";
import { Document } from "@/lib/db/schema";
import { FC } from "react";
import { useQuery } from "react-query";
import DocumentCardView, { DocumentCardViewSkeleton } from "./DocumentCardView";
import DocumentListView, { DocumentListViewSkeleton } from "./DocumentListView";
import EmptyDocuments from "../empty-documents";

type AllDocumentsProps = {
  workspace: string;
  documents: Document[];
  loading: boolean;
};

const AllDocuments: FC<AllDocumentsProps> = ({
  workspace,
  documents,
  loading,
}) => {
  console.log(documents);
  const { activeView } = useActiveView();
  const { data, isError, isLoading } = useQuery({
    initialData: {
      data: documents,
      isLoading: loading,
    },
    queryKey: ["documents-lists", workspace],
    queryFn: () => fetchDocuments({ workspace }),
  });
  if (data?.data?.length === 0) {
    return activeView === "list" ? (
      <DocumentListViewSkeleton />
    ) : (
      <DocumentCardViewSkeleton />
    );
  }
  if (data?.data?.length === 0) {
    return <EmptyDocuments />;
  }

  return activeView === "grid" ? (
    <DocumentCardView data={data?.data!} isLoading={isLoading} />
  ) : (
    <DocumentListView data={data?.data!} isLoading={isLoading} />
  );
};

export default AllDocuments;
