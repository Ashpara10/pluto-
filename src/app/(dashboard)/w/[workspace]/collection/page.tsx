"use client";
import AllCollections from "@/components/collection/AllCollections";
import CollectionViewOptions from "@/components/CollectionViewOptions";
import React from "react";

const Page = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center mt-28">
      <div className="w-full ">
        <CollectionViewOptions title="All Collections">
          <AllCollections />
        </CollectionViewOptions>
      </div>
    </section>
  );
};

export default Page;
