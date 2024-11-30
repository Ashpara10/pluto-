import { getCookie, setCookie } from "cookies-next";
import { Grid2X2, LayoutGrid, List } from "lucide-react";
import { FC, ReactNode, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";

type DocumentFilterOptionsProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
  view: string;
  onViewChange: (view: string) => void;
};

const DocumentFilterOptions: FC<DocumentFilterOptionsProps> = ({
  open,
  setOpen,
  children,
  view,
  onViewChange,
}) => {
  const options = [
    {
      name: "Favorites",
    },
    {
      icon: <List className="size-4 opacity-80" />,
      title: "List View",
      view: "list",
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="border p-0 border-neutral-200/60 bg-neutral-100 hover:bg-white  dark:border-lightGray/10 dark:bg-neutral-800 dark:hover:bg-neutral-800 mt-2 ">
        <div className="space-y-4">
          <div className="space-y-2 px-3 py-2">
            <h4 className=" tracking-tight leading-none">View</h4>
            <div className="flex items-center gap-2">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="sm"
                className="w-full"
                onClick={() => onViewChange("grid")}
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="sm"
                className="w-full"
                onClick={() => onViewChange("list")}
              >
                <List className="mr-2 h-4 w-4" />
                List
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DocumentFilterOptions;
