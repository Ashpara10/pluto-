import { instance } from "@/lib/axios";
import { Collection, Document } from "@/lib/db/schema";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";
import { Skeleton } from "../ui/skeleton";
import CollectionCard from "./CollectionCard";
import EmptyCollections from "../empty-collection";
import toast from "react-hot-toast";

export const getAllCollections = async ({
  workspace,
}: {
  workspace: string;
}) => {
  const res = await instance(`/collection`, {
    params: {
      workspace: workspace,
    },
  });
  if (res.status !== 200) {
    // console.log(res?.data);
    toast.error("Failed to fetch collections");
    return;
  }
  return res.data.data as Collection[];
};

const AllCollections = () => {
  const params = useParams() as { workspace: string };
  const { data, error, isLoading } = useQuery(
    ["all-collections", params.workspace],
    async () =>
      await getAllCollections({
        workspace: params.workspace!,
      })
  );
  // console.log(data);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const handleCheckBoxChange = (checked: boolean, id: string) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };
  return (
    <div>
      {data?.length === 0 && <EmptyCollections />}
      <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 ">
        {isLoading
          ? [...Array(9)].map((_, i) => {
              return (
                <Skeleton
                  key={i}
                  className="h-34  w-full animate-pulse rounded-lg bg-darkGray/60 dark:bg-lightGray/10"
                />
              );
            })
          : data!?.map((collections, i) => {
              return (
                <CollectionCard
                  collection={collections}
                  checked={checked[collections.id]}
                  handleCheckChange={handleCheckBoxChange}
                />
              );
            })}
      </div>
    </div>
  );
};

export default AllCollections;
