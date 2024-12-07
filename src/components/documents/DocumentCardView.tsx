"use client";
import { useSelectedDocuments } from "@/lib/context";
import { FC, useEffect, useState } from "react";
import DocumentListItem from "./DocumentList";
import DocumentCardItem from "./DocumentCard";
import { Document } from "@/lib/db/schema";
import { Skeleton } from "../ui/skeleton";

type DocumentCardViewProps = {
  data: Document[];
  isLoading: boolean;
};
const DocumentCardView: FC<DocumentCardViewProps> = ({ data, isLoading }) => {
  const { setSelectedDocuments, selectedDocuments } = useSelectedDocuments();

  const handleCheckBoxChange = (checked: boolean, id: string) => {
    setSelectedDocuments!((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return Array.from(newSet);
    });
  };

  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 ">
      {data!.map((doc, i) => {
        return (
          <DocumentCardItem
            key={i}
            checked={selectedDocuments?.includes(doc?.id)}
            handleCheckChange={(checked) =>
              handleCheckBoxChange(checked, doc?.id)
            }
            document={doc}
          />
        );
      })}
    </section>
  );
};

export default DocumentCardView;

export const DocumentCardViewSkeleton = () => {
  return [...Array(18)].map((_, i) => {
    return (
      <Skeleton
        key={i}
        className=" h-[200px] w-full animate-pulse rounded-lg bg-darkGray/60 dark:bg-lightGray/10"
      />
    );
  });
};
