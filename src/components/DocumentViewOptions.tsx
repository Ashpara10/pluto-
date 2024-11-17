import { Filter, MoreVertical, Settings2 } from "lucide-react";
import React, { FC, useState } from "react";
import { Button } from "./ui/button";
import DocumentFilterOptions from "./documents/DocumentFilterOptions";

type DocumentViewOptionsProps = {
  children?: React.ReactNode;
  title?: string;
  onViewChange?: (view: string) => void;
  view?: string;
};

const DocumentViewOptions: FC<DocumentViewOptionsProps> = ({
  children,
  title,
  view,
  onViewChange,
}) => {
  const [displayOptions, setDisplayOptions] = useState(false);
  return (
    <div className="mt-6 block w-full ">
      <div className="flex  w-full items-center justify-between px-3">
        <div>
          <span className="text-xl font-semibold leading-snug tracking-tight">
            {title}
          </span>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <Button variant={"outline"} size={"sm"}>
            <Filter className="size-4 opacity-80" />
            <span className="ml-2">Filter</span>
          </Button>
          {/* <PopoverWrapper
            trigger={ */}
          <DocumentFilterOptions
            view={view!}
            open={displayOptions}
            setOpen={setDisplayOptions}
            onViewChange={onViewChange!}
          >
            <Button variant={"outline"} size={"sm"}>
              <Settings2 className="size-4 opacity-80" />
              <span className="ml-2">Display</span>
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
