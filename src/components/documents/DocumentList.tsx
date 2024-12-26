"use client";
import { Document } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { SquareArrowOutUpRight, Star, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useOptimistic, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { deleteDocuments, handleDocumentFavourites } from "@/lib/db/documents";
import toast from "react-hot-toast";
import { queryClient } from "@/lib/session-provider";

type DocumentListProps = {
  document: Document;
  checked?: boolean;
  handleCheckChange: (checked: boolean, id: string) => void;
};

const DocumentListItem = ({
  document,
  checked,
  handleCheckChange,
}: DocumentListProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { workspace } = useParams();

  const [optimisticDocument, addOptimistic] = useOptimistic(
    document,
    (state, newData: Document) => {
      return { ...state, ...newData };
    }
  );

  const handleFavourites = async () => {
    addOptimistic({
      ...optimisticDocument,
      isFavorite: optimisticDocument?.isFavorite ? false : true,
    });
    const { ok, data, error } = await handleDocumentFavourites({
      id: document.id,
      isFavorite: !document?.isFavorite as boolean,
    });
    if (!ok && error) {
      toast?.error(error);

      return;
    }

    toast.success(
      data?.isFavorite ? "Added to favourites" : "Removed from favourites"
    );
    // return data;
  };

  const handleDelete = async () => {
    const { ok, error } = await deleteDocuments([optimisticDocument.id]);
    if (!ok && error) {
      toast?.error(error);
      return;
    }

    toast.success("Document deleted successfully");
    queryClient.refetchQueries(["documents-lists", workspace]);
  };

  const handleClick = () => {
    router.push(`/w/${workspace}/document/${optimisticDocument.id}`);
  };
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="px-2 rounded-lg cursor-pointer  py-0.5 hover:dark:bg-lightGray/5 hover:bg-neutral-200/60 flex w-full items-center justify-start truncate"
    >
      <Checkbox
        checked={checked}
        className={cn(`data-[state=checked]:bg-violet-600`)}
        onCheckedChange={(checked) => {
          handleCheckChange(checked as boolean, optimisticDocument?.id);
        }}
      />
      <div className="w-full flex items-center justify-between">
        <div className="ml-2 flex items-center justify-start">
          <span
            onClick={handleClick}
            className="truncate text-lg  leading-tight tracking-tight "
          >
            {optimisticDocument?.title || "Untitled"}
          </span>
          <span className="ml-2 text-sm opacity-80">
            {new Date(optimisticDocument?.createdAt)?.toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
          </span>
        </div>
        <div
          className={cn(
            "flex invisible items-center justify-center gap-x-1 ",
            isHovered && "visible"
          )}
        >
          <button
            onClick={handleFavourites}
            className="p-1 rounded-lg hover:dark:bg-lightGray/10 hover:bg-neutral-200/30"
          >
            <Star
              strokeWidth={1.07}
              className={cn(
                "opacity-80 size-5",
                optimisticDocument?.isFavorite &&
                  "opacity-100 fill-yellow-400 stroke-yellow-500"
              )}
            />
          </button>
          <button className="p-1 rounded-lg hover:dark:bg-lightGray/10 hover:bg-neutral-200/30">
            <SquareArrowOutUpRight
              strokeWidth={1.07}
              className="opacity-80 size-5"
            />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 rounded-lg hover:dark:bg-lightGray/10 hover:bg-neutral-200/30"
          >
            <Trash2 strokeWidth={1.07} className="opacity-80 size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentListItem;
