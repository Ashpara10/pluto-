"use client";
import DocumentListView from "@/components/documents/DocumentListView";
import DocumentViewOptions from "@/components/DocumentViewOptions";
import EmptyDocuments from "@/components/empty-documents";
import { instance } from "@/lib/axios";
import { Collection, Document } from "@/lib/db/schema";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

interface PageProps {
  params: { slug: string; workspace: string };
}

type GetCollectionDocumentsResponse = {
  collections: Collection;
  documents: Document;
}[];

const getCollectionDocuments = async (slug: string, workspace: string) => {
  const { data } = await instance(`/document`, {
    params: {
      collection: slug,
      workspace: workspace,
    },
  });
  if (!data) {
    // console.log({ err: data });
    toast.error("Failed to fetch documents");
    return;
  }
  if (!data?.data?.documents) {
    return [];
  }
  return (data?.data?.documents as GetCollectionDocumentsResponse)?.map(
    (r) => r?.documents
  );
};

const Page: FC<PageProps> = ({ params }) => {
  const { data, isError, isLoading } = useQuery(
    ["collection-documents", params?.slug, params?.workspace!],
    async () => await getCollectionDocuments(params?.slug!, params?.workspace!)
  );
  // console.log({ data });
  return (
    <div className="flex w-full flex-col items-center justify-center  pt-28 px-4">
      <div className="w-full max-w-5xl">
        <DocumentViewOptions title={`Documents`}>
          {data?.length === 0 && <EmptyDocuments />}
          {data!?.length > 0 && (
            <DocumentListView data={data!} isLoading={isLoading} />
          )}
        </DocumentViewOptions>
      </div>
    </div>
  );
};

export default Page;
