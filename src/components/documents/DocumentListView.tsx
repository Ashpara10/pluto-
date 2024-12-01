"use client";
import { useSelectedDocuments } from "@/lib/context";
import { FC, useEffect, useState } from "react";
import DocumentListItem from "./DocumentList";
import { Skeleton } from "../ui/skeleton";
import { Document } from "@/lib/db/schema";

type DocumentListViewProps = {
  data: Document[];
  isLoading: boolean;
};
const DocumentListView: FC<DocumentListViewProps> = ({ data, isLoading }) => {
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
  console.log(selectedDocuments, { ...selectedDocuments });
  return (
    <section className="">
      {isLoading
        ? [...Array(18)].map((_, i) => {
            return (
              <Skeleton
                key={i}
                className="mt-2 h-12 w-full animate-pulse rounded-lg bg-darkGray/60 dark:bg-lightGray/10"
              />
            );
          })
        : data!?.map((doc, i) => {
            const isChecked = selectedDocuments?.includes(doc?.id);
            return (
              <DocumentListItem
                key={i}
                checked={isChecked}
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

export default DocumentListView;
