"use client";

import { fetchDocuments } from "@/lib/actions";
import { useActiveView } from "@/lib/context";
import { Document } from "@/lib/db/schema";
import { FC } from "react";
import { useQuery } from "react-query";
import EmptyDocuments from "../empty-documents";
import DocumentCardView, { DocumentCardViewSkeleton } from "./DocumentCardView";
import DocumentListView, { DocumentListViewSkeleton } from "./DocumentListView";
import { SortDocumentBy } from "@/lib/types";
import { useQueryState } from "nuqs";

type AllDocumentsProps = {
  workspace: string;
};

const AllDocuments: FC<AllDocumentsProps> = ({ workspace }) => {
  const [sortBy] = useQueryState("sortBy");
  const { activeView } = useActiveView();
  let { data, isFetching } = useQuery({
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
