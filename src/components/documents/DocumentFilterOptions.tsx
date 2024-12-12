import { Separator } from "@radix-ui/react-dropdown-menu";
import { LayoutGrid, List } from "lucide-react";
import { FC, ReactNode } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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
  const sort_options = [
    { name: "Favourite", key: "favourite" },
    { name: "Created", key: "created_at" },
    { name: "Updated", key: "updated_at" },
  ];
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
      <PopoverContent className="border  p-0 border-neutral-200/60 bg-neutral-100 hover:bg-white  dark:border-lightGray/10 dark:bg-neutral-800 dark:hover:bg-neutral-800 mt-2 ">
        <div className="space-y-4">
          <div className="space-y-2 ">
            <div className="flex items-center gap-2 p-3">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="smallIcon"
                onClick={() => onViewChange("grid")}
              >
                <LayoutGrid className=" h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="smallIcon"
                onClick={() => onViewChange("list")}
              >
                <List className=" h-4 w-4" />
              </Button>
            </div>
            <Separator />
            <div className="w-full flex flex-col">
              <span className="px-4 text-sm pb-2 tracking-tight font-medium">
                Sort By
              </span>
              {sort_options.map((option, i) => {
                return (
                  <span
                    key={i}
                    className="w-full text-sm px-4 py-1 first-line:border-none border-t border-neutral-300/60 dark:border-lightGray/10 "
                  >
                    {option?.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DocumentFilterOptions;
