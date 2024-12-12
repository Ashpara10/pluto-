import Landing from "@/components/home/landing";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full">
      <ScrollArea className="w-full ">
        <div className="w-full h-full  flex flex-col items-center justify-center">
          <Landing />
        </div>
      </ScrollArea>
    </div>
  );
}
