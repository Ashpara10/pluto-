"use client";
import React, { FC } from "react";
import EmptyDocuments from "../empty-documents";
import { getCollectionDocuments } from "@/lib/actions";
import { SortDocumentBy } from "@/lib/types";
import { useQuery } from "react-query";
import { useActiveView } from "@/lib/context";
import { useQueryState } from "nuqs";
import DocumentListView, { DocumentListViewSkeleton } from "./DocumentListView";
import DocumentCardView, { DocumentCardViewSkeleton } from "./DocumentCardView";
import { Document } from "@/lib/db/schema";

type CollectionDocumentsProps = {
  workspace: string;
  slug: string;
  documents: Document[];
};

const CollectionDocuments: FC<CollectionDocumentsProps> = ({
  documents,
  workspace,
  slug,
}) => {
  const [sortBy] = useQueryState("sortBy");
  const { activeView } = useActiveView();
  const { data, isFetching } = useQuery({
    initialData: { data: documents, error: null },
    queryKey: ["collection-documents", slug, workspace],
    queryFn: () => getCollectionDocuments(slug, workspace),
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

export default CollectionDocuments;
