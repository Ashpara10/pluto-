"use client";

import { useActiveView } from "@/lib/context";
import { Document } from "@/lib/db/schema";
import { FC, useEffect } from "react";
import { useQuery } from "react-query";
import DocumentCardView, { DocumentCardViewSkeleton } from "./DocumentCardView";
import DocumentListView, { DocumentListViewSkeleton } from "./DocumentListView";
import EmptyDocuments from "../empty-documents";
import { fetchDocuments } from "@/lib/actions";

import { useQueryState, useQueryStates } from "nuqs";
import { SortDocumentBy } from "@/lib/types";

type AllDocumentsProps = {
  workspace: string;
  documents: Document[];
};

const AllDocuments: FC<AllDocumentsProps> = ({ workspace, documents }) => {
  const [sortBy] = useQueryState("sortBy");
  const { activeView } = useActiveView();
  let { data, isFetching } = useQuery({
    initialData: { data: documents, error: null },
    queryKey: ["documents-lists", workspace, sortBy],
    queryFn: () => fetchDocuments(workspace, sortBy as SortDocumentBy),
    refetchOnWindowFocus: false,
  });

  if (data?.data?.length === 0 && !isFetching) {
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
