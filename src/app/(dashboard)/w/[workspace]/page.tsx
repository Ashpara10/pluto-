"use client";
import DocumentCardView from "@/components/documents/DocumentCardView";
import DocumentListView from "@/components/documents/DocumentListView";
import DocumentViewOptions from "@/components/DocumentViewOptions";
import EmptyDocuments from "@/components/empty-documents";
import { instance } from "@/lib/axios";
import { Document } from "@/lib/db/schema";
import { getCookie, setCookie } from "cookies-next";
import { FC, useState } from "react";
import { useQuery } from "react-query";

const fetchDocuments = async ({ workspace }: { workspace: string }) => {
  const res = await instance.get("/document", {
    params: {
      workspace: workspace,
    },
  });
  if (!res?.data) {
    console.log({ err: res?.data });
    return;
  }
  return res.data?.documents as Document[];
};
type PageProps = {
  params: {
    workspace: string;
  };
};

const Page: FC<PageProps> = ({ params }) => {
  const [activeView, setActiveView] = useState(
    getCookie("activeView") || "list"
  );

  const { data, isError, isLoading } = useQuery(
    ["documents-lists", params?.workspace],
    async () => await fetchDocuments({ workspace: params?.workspace })
  );
  const onViewChange = (view: string) => {
    setActiveView(view);
    setCookie("activeView", view);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center pt-28">
      <div className="w-full max-w-5xl">
        <DocumentViewOptions
          onViewChange={onViewChange}
          view={activeView}
          title="All Documents"
        >
          {data!?.length === 0 && <EmptyDocuments />}
          {activeView === "grid" ? (
            <DocumentCardView data={data!} isLoading={isLoading} />
          ) : (
            <DocumentListView data={data!} isLoading={isLoading} />
          )}
        </DocumentViewOptions>
      </div>
    </div>
  );
};

export default Page;
