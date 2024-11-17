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

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const checkedArr = Object.entries(checked);
    if (data && checkedArr?.length !== 0) {
      setSelectedDocuments!(
        () =>
          new Set(
            checkedArr
              .filter(([, value]) => value)
              .map(([key]) => parseInt(key))
          )
      );
    }
  }, [checked]);
  const handleCheckBoxChange = (checked: boolean, id: string) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <section className="w-full grid grid-cols-3 gap-4 ">
      {/* <div className=""> */}
      {isLoading
        ? [...Array(18)].map((_, i) => {
            return (
              <Skeleton
                key={i}
                style={{ height: Math.random() * 100 + i }}
                className="mt-2 w-full animate-pulse rounded-lg bg-darkGray/60 dark:bg-lightGray/10"
              />
            );
          })
        : data!.map((doc, i) => {
            return (
              <DocumentCardItem
                key={i}
                checked={checked[doc?.id]}
                handleCheckChange={(checked) =>
                  handleCheckBoxChange(checked, doc?.id)
                }
                document={doc}
              />
            );
          })}
      {/* </div> */}
    </section>
  );
};

export default DocumentCardView;
