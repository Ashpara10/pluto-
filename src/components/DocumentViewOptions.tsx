"use client";
import { useActiveView } from "@/lib/context";
import { createDocument } from "@/lib/db/documents";
import { setCookie } from "cookies-next";
import { Filter, MoreVertical, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { FC, useState } from "react";
import DocumentFilterOptions from "./documents/DocumentFilterOptions";
import { Button } from "./ui/button";

type DocumentViewOptionsProps = {
  children?: React.ReactNode;
  title?: string;
};

const DocumentViewOptions: FC<DocumentViewOptionsProps> = ({
  children,
  title,
}) => {
  const { data } = useSession();
  const { activeView, setActiveView } = useActiveView();
  const [displayOptions, setDisplayOptions] = useState(false);
  const onViewChange = (view: string) => {
    setActiveView!(view);
    setCookie("activeView", view);
  };
  return (
    <div className="mt-6 block w-full ">
      <div className="flex  w-full items-center justify-between px-3">
        <div>
          <span className="text-xl font-semibold leading-snug tracking-tight">
            {title}
          </span>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <Button
            variant={"outline"}
            onClick={() => createDocument({ user: data?.user?.id as string })}
            size={"sm"}
          >
            <Plus className="size-4 opacity-80" />
            <span className="ml-2">New</span>
          </Button>

          <DocumentFilterOptions
            view={activeView!}
            open={displayOptions}
            setOpen={setDisplayOptions}
            onViewChange={onViewChange!}
          >
            <Button variant={"outline"} size={"sm"}>
              <Filter className="size-4 opacity-80" />
              <span className="ml-2">Filter</span>
            </Button>
          </DocumentFilterOptions>

          <Button variant={"outline"} size={"smallIcon"}>
            <MoreVertical className="size-4 opacity-80" />
          </Button>
        </div>
      </div>
      <div className="mt-4 px-2 w-full">{children}</div>
    </div>
  );
};

export default DocumentViewOptions;
