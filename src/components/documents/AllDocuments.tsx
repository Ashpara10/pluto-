"use client";

import { useActiveView } from "@/lib/context";
import { Document } from "@/lib/db/schema";
import { FC } from "react";
import { useQuery } from "react-query";
import DocumentCardView, { DocumentCardViewSkeleton } from "./DocumentCardView";
import DocumentListView, { DocumentListViewSkeleton } from "./DocumentListView";
import EmptyDocuments from "../empty-documents";
import { fetchDocuments } from "@/lib/actions";

type AllDocumentsProps = {
  workspace: string;
  documents: Document[];
};

const AllDocuments: FC<AllDocumentsProps> = ({ workspace, documents }) => {
  const { activeView } = useActiveView();
  const { data, isFetching } = useQuery({
    initialData: { data: documents, error: null },
    queryKey: ["documents-lists", workspace],
    queryFn: () => fetchDocuments(workspace),
    refetchOnWindowFocus: false,
  });
  if (data?.data?.length === 0) {
    return <EmptyDocuments />;
  }
  if (isFetching) {
    return activeView === "list" ? (
      <DocumentListViewSkeleton />
    ) : (
      <DocumentCardViewSkeleton />
    );
  }

  return activeView === "grid" ? (
    <DocumentCardView data={data?.data as Document[]} isLoading={isFetching} />
  ) : (
    <DocumentListView data={data?.data as Document[]} isLoading={isFetching} />
  );
};

export default AllDocuments;
