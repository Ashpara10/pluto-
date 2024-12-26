"use client";
import { getAllCollections } from "@/lib/actions";
import { useSelectedCollections } from "@/lib/context";
import { Collection } from "@/lib/db/schema";
import { FC } from "react";
import { useQuery } from "react-query";
import { DocumentCardViewSkeleton } from "../documents/DocumentCardView";
import EmptyCollections from "../empty-collection";
import CollectionCard from "./CollectionCard";

type AllCollectionsProps = {
  workspace: string;
  error: string | null;
  collections: { collection: Collection; documents_count: string }[] | null;
};

const AllCollections: FC<AllCollectionsProps> = ({
  collections,
  workspace,
  error,
}) => {
  const { selectedCollection, setSelectedCollections } =
    useSelectedCollections();
  const { data, isFetching } = useQuery({
    initialData: { data: collections, error: error },
    queryKey: ["all-collections", workspace],
    queryFn: async () => await getAllCollections(workspace),
    refetchOnWindowFocus: false,
  });

  if (data?.data?.length === 0 && !isFetching) {
    return <EmptyCollections />;
  }
  if (isFetching) {
    return <DocumentCardViewSkeleton />;
  }
  const handleCheckBoxChange = (checked: boolean, id: string) => {
    setSelectedCollections!((prev) => {
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
    <div>
      {data?.data?.length === 0 && <EmptyCollections />}
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data?.data?.map((data, i) => {
          return (
            <CollectionCard
              key={i}
              collection={data}
              checked={selectedCollection?.includes(data?.collection.id)}
              handleCheckChange={handleCheckBoxChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllCollections;
