"use client";
import { getActiveWorkspace } from "@/lib/actions";
import { createDocument } from "@/lib/db/documents";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const EmptyDocuments = () => {
  const { data: user } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isCollectionsPage = pathname.includes("/collection/");

  return (
    <div className="w-full h-[68vh] border-2 border-dashed flex items-center justify-center border-neutral-200 dark:border-lightGray/10 rounded-lg p-4">
      <div className="flex max-w-xs flex-col items-center justify-center">
        <h4 className="text-lg font-medium tracking-tight leading-snug">
          {isCollectionsPage
            ? "Collection has no documents"
            : "No documents found"}
        </h4>
        <span className="mt-1 opacity-80 leading-tight text-center">
          {isCollectionsPage
            ? "Start adding documents to this collection to organise your data"
            : "Start creating Documents for your research papers, assignments, notes, and more."}
        </span>
        <div className=" mt-4 flex items-center justify-center gap-4">
          <Button
            size={"sm"}
            variant={"default"}
            onClick={async () => {
              const workspace = await getActiveWorkspace();
              const { data, error } = await createDocument({
                user: user?.user?.id!,
                workspaceId: workspace?.id!,
              });
              // console.log({ data, error });
              if (error) {
                toast.error(error);
                return;
              }
              toast.success("Document created successfully");
              router.push(`/w/${workspace?.id!}/document/${data?.id}`);
            }}
          >
            Create Document
          </Button>
          <Button size={"sm"} variant={"outline"}>
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyDocuments;
