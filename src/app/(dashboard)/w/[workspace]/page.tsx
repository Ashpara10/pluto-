import AllDocuments from "@/components/documents/AllDocuments";
import DocumentViewOptions from "@/components/DocumentViewOptions";
import { fetchDocuments } from "@/lib/actions";
import { Document } from "@/lib/db/schema";
import { searchParamsCache } from "@/lib/nuqs";
import { SortDocumentBy } from "@/lib/types";
import { FC } from "react";

type PageProps = {
  params: Promise<{ workspace: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page: FC<PageProps> = async ({ params, searchParams }) => {
  const { q: query } = await searchParamsCache.parse(searchParams);
  const { data, error } = await fetchDocuments(
    (
      await params
    ).workspace,
    query as SortDocumentBy
  );
  return (
    <div className="flex w-full flex-col items-center justify-center mt-28">
      <div className="w-full max-w-7xl pb-10">
        <DocumentViewOptions title="All Documents">
          <AllDocuments
            documents={data as Document[]}
            workspace={(await params).workspace}
          />
        </DocumentViewOptions>
      </div>
    </div>
  );
};

export default Page;
