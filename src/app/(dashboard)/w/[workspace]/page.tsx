import AllDocuments from "@/components/documents/AllDocuments";
import DocumentViewOptions from "@/components/DocumentViewOptions";
import { FC } from "react";

type PageProps = {
  params: Promise<{ workspace: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page: FC<PageProps> = async ({ params }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center mt-28">
      <div className="w-full max-w-7xl pb-10">
        <DocumentViewOptions title="All Documents">
          <AllDocuments workspace={(await params).workspace} />
        </DocumentViewOptions>
      </div>
    </div>
  );
};

export default Page;
