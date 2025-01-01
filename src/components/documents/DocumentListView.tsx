"use client";
import { useSelectedDocuments } from "@/lib/context";
import { Document } from "@/lib/db/schema";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import DocumentListItem from "./DocumentList";

type DocumentListViewProps = {
  data: Document[];
  isLoading: boolean;
};
const DocumentListView: FC<DocumentListViewProps> = ({ data }) => {
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
    <section className="w-full">
      {data?.map((doc, i) => {
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

export const DocumentListViewSkeleton = () => {
  return [...Array(18)].map((_, i) => {
    return (
      <Skeleton
        key={i}
        className="mt-2 h-12 w-full animate-pulse rounded-lg bg-darkGray/60 dark:bg-lightGray/10"
      />
    );
  });
};
