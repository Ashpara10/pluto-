import AllDocuments from "@/components/documents/AllDocuments";
import DocumentViewOptions from "@/components/DocumentViewOptions";
import { instance } from "@/lib/axios";
import { Collection, Document } from "@/lib/db/schema";
import { FC } from "react";
import toast from "react-hot-toast";

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
  console.log(data);
  if (!data) {
    // console.log({ err: data });
    toast.error("Failed to fetch documents");
    return;
  }

  return (data?.data?.documents as GetCollectionDocumentsResponse)?.map(
    (r) => r?.documents
  );
};

const Page: FC<PageProps> = async ({ params }) => {
  const data = await getCollectionDocuments(params.slug, params.workspace);
  return (
    <div className="flex w-full flex-col items-center justify-center  pt-28 px-4">
      <div className="w-full max-w-5xl">
        <DocumentViewOptions title={`Documents`}>
          <AllDocuments
            documents={data as Document[]}
            workspace={params?.workspace as string}
          />
        </DocumentViewOptions>
      </div>
    </div>
  );
};

export default Page;
