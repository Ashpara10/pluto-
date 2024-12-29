// import { Collection } from "@prisma/client";
import React, { FC } from "react";
import { Checkbox } from "../ui/checkbox";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Dot } from "lucide-react";
import { Collection } from "@/lib/db/schema";
import { Card, CardHeader, CardTitle } from "../ui/card";

type CollectionCardProps = {
  collection: { collection: Collection; documents_count: string };
  checked?: boolean;
  handleCheckChange: (checked: boolean, id: string) => void;
};

const CollectionCard: FC<CollectionCardProps> = ({
  collection: { collection, documents_count },
  handleCheckChange,
  checked,
}) => {
  const router = useRouter();
  const params = useParams() as { workspace: string };
  const handleClick = () => {
    router.push(`/w/${params?.workspace}/collection/${collection.slug}`);
  };
  return (
    <Card className="rounded-xl h-fit relative group p-0 cursor-pointer">
      <Checkbox
        checked={checked}
        className={cn(
          `data-[state=checked]:bg-violet-600`,
          "absolute right-2 top-2 group-hover:opacity-100 data-[state=checked]:opacity-100 opacity-0  transition-opacity "
        )}
        onCheckedChange={(checked) => {
          handleCheckChange(checked as boolean, collection?.id);
        }}
      />
      <CardHeader className="flex flex-col items-center justify-between">
        <CardTitle
          onClick={handleClick}
          className="text-lg font-medium line-clamp-2 w-full tracking-tight leading-tight"
        >
          {collection?.name || "Untitled"}
        </CardTitle>
        <div className="w-full flex items-center justify-start">
          <span className="text-sm leading-tight  opacity-70">
            {new Date(collection?.createdAt)?.toDateString()}
          </span>
          <Dot size={20} className="gap-0 opacity-80" />
          <span className="text-sm leading-tight opacity-70">
            {/* @ts-ignore */}
            {documents_count}
          </span>
        </div>
      </CardHeader>
    </Card>
    // <div
    //   onClick={handleClick}
    //   onDragOver={(e) => {
    //     e?.preventDefault();
    //     setIcon("/folder-open.svg");
    //   }}
    //   onDragLeave={(e) => {
    //     e?.preventDefault();
    //     setIcon("/folder.svg");
    //   }}
    //   className=" flex w-full  cursor-pointer flex-col items-center justify-center "
    // >
    //   <div className=" flex w-full flex-col items-start justify-center px-3 ">
    // <span className="leading-snug tracking-tight">
    //   {collection?.name || "Untitled"}
    // </span>
    // <div className="flex items-center justify-center">
    //   <span className="text-sm leading-tight  opacity-70">
    //     {new Date(collection?.createdAt)?.toDateString()}
    //   </span>
    //   <Dot size={20} className="gap-0 opacity-80" />
    //   <span className="text-sm leading-tight opacity-70">
    //     {/* @ts-ignore */}
    //     {documents_count}
    //   </span>
    // </div>
    // </div>
    // </div>
  );
};

export default CollectionCard;
