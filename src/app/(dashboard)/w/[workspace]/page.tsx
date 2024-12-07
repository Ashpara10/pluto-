import AllDocuments from "@/components/documents/AllDocuments";
import DocumentViewOptions from "@/components/DocumentViewOptions";
import EmptyDocuments from "@/components/empty-documents";
import { instance } from "@/lib/axios";
import { Document } from "@/lib/db/schema";
import { FC } from "react";
import toast from "react-hot-toast";

export const fetchDocuments = async ({ workspace }: { workspace: string }) => {
  let isLoading = true;
  const res = await instance.get("/document", {
    params: {
      workspace: workspace,
    },
  });
  if (!res?.data) {
    isLoading = false;
    // console.log({ err: res?.data });
    toast.error("Failed to fetch documents");
    return { isLoading, data: null };
  }
  isLoading = false;
  return { isLoading, data: res.data?.documents as Document[] };
};
type PageProps = {
  params: {
    workspace: string;
  };
};

const Page: FC<PageProps> = async ({ params }) => {
  const { isLoading, data } = await fetchDocuments({
    workspace: params.workspace,
  });
  console.log(data);
  return (
    <div className="flex w-full flex-col items-center justify-center mt-28">
      <div className="w-full max-w-7xl">
        <DocumentViewOptions title="All Documents">
          <AllDocuments
            loading={isLoading}
            documents={data!}
            workspace={params?.workspace}
          />
        </DocumentViewOptions>
      </div>
    </div>
  );
};

export default Page;
