"use client";

import Faqs from "@/components/home/faqs";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import Landing from "@/components/home/landing";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full">
      <ScrollArea className="w-full ">
        <div className="w-full h-full pb-20 flex flex-col items-center justify-center">
          <Landing />
          <Features />
          <Faqs />
          <Footer />
        </div>
      </ScrollArea>
    </div>
  );
}
