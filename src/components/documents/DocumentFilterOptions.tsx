import React, { FC, ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Grid2X2, Rows, Rows3 } from "lucide-react";

type DocumentFilterOptionsProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
};

const DocumentFilterOptions: FC<DocumentFilterOptionsProps> = ({
  open,
  setOpen,
  children,
}) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="border p-0 border-neutral-200/60 bg-neutral-100 hover:bg-white  dark:border-lightGray/10 dark:bg-neutral-800 dark:hover:bg-lightGray/10 mt-2 max-w-30">
        <div className="flex items-center justify-start">
          <Grid2X2 className="size-4 mr-2 opacity-80" />
          <span>Grid</span>
        </div>
        <div className="flex items-center justify-start">
          <Rows3 className="size-4 mr-2 opacity-80" />
          <span>List</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DocumentFilterOptions;
