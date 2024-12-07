"use client";
import { Document } from "@/lib/db/schema";
import { useWorkspaces } from "@/lib/hooks/use-workspaces";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { Card, CardHeader, CardTitle } from "../ui/card";

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
    <Card className="rounded-xl relative group cursor-pointer">
      <Checkbox
        checked={checked}
        className={cn(
          `data-[state=checked]:bg-violet-600`,
          "absolute right-2 top-2 group-hover:opacity-100 data-[state=checked]:opacity-100 opacity-0  transition-opacity "
        )}
        onCheckedChange={(checked) => {
          handleCheckChange(checked as boolean, document?.id);
        }}
      />
      <CardHeader className="flex flex-col items-center justify-between">
        <CardTitle
          onClick={handleClick}
          className="text-lg font-medium line-clamp-2 w-full tracking-tight leading-tight"
        >
          {document?.title || "Untitled"}
        </CardTitle>
        <div className="w-full">
          <span className="text-sm opacity-80">
            {new Date(document?.createdAt)?.toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </CardHeader>
    </Card>
  );
};

export default DocumentCardItem;
