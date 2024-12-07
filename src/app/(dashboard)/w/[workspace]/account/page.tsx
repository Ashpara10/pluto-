import UpdateAccount from "@/components/account/update-account";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const Page = () => {
  return (
    <ScrollArea className="w-full pt-10  flex items-center justify-center min-h-screen h-full overflow-y-auto">
      <div className=" w-full flex h-screen items-center justify-center">
        <UpdateAccount />
      </div>
      <div className="h-[100px]"></div>
    </ScrollArea>
  );
};

export default Page;
