import DocumentViewOptions from "@/components/DocumentViewOptions";
import { getCollectionDocuments } from "@/lib/actions";
import { FC } from "react";
import { Document } from "@/lib/db/schema";
import CollectionDocuments from "@/components/documents/CollectionDocuments";
type PageProps = {
  params: Promise<{ workspace: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page: FC<PageProps> = async ({ params }) => {
  console.log(params);
  const { data, error } = await getCollectionDocuments(
    (
      await params
    ).slug,
    (
      await params
    ).workspace
  );

  return (
    <div className="flex w-full flex-col items-center justify-center  pt-28 px-4">
      <div className="w-full max-w-5xl">
        <DocumentViewOptions title={`Documents`}>
          <CollectionDocuments
            documents={data as Document[]}
            slug={(await params)?.slug}
            workspace={(await params)?.workspace}
          />
        </DocumentViewOptions>
      </div>
    </div>
  );
};

export default Page;
