import AllDocuments from "@/components/documents/AllDocuments";
import DocumentViewOptions from "@/components/DocumentViewOptions";
import { fetchDocuments } from "@/lib/actions";
import { Document } from "@/lib/db/schema";
import { FC } from "react";

type PageProps = {
  params: Promise<{ workspace: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page: FC<PageProps> = async ({ params }) => {
  const { data, error } = await fetchDocuments((await params).workspace);
  console.log(data);
  return (
    <div className="flex w-full flex-col items-center justify-center mt-28">
      <div className="w-full max-w-7xl">
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
