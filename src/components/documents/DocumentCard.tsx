"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { Document } from "@/lib/db/schema";
import { useWorkspaces } from "@/lib/hooks/use-workspaces";

type DocumentCardProps = {
  document: Document;
  checked?: boolean;
  handleCheckChange: (checked: boolean, id: string) => void;
};

const DocumentCardItem = ({
  document,
  checked,
  handleCheckChange,
}: DocumentCardProps) => {
  const { currentWorkspace } = useWorkspaces();
  const router = useRouter();
  const handleClick = () => {
    router.push(`/w/${currentWorkspace?.id}/document/${document.id}`);
  };
  return (
    <div className=" flex w-full flex-col  rounded-xl border border-neutral-200 px-2.5 py-3 dark:border-lightGray/10 relative">
      <Checkbox
        checked={checked}
        className={cn(
          `data-[state=checked]:bg-violet-600`,
          "absolute right-2 top-2"
        )}
        onCheckedChange={(checked) => {
          handleCheckChange(checked as boolean, document?.id);
        }}
      />
      <div className="flex w-full items-center justify-center">
        <span
          onClick={handleClick}
          className="line-clamp-2 w-full text-lg leading-tight tracking-tight hover:cursor-pointer  "
        >
          {document?.title || "Untitled"}
        </span>
      </div>
      <span className="text-sm opacity-80">
        {new Date(document?.createdAt)?.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    </div>
  );
};

export default DocumentCardItem;
