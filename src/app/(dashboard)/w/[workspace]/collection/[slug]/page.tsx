import DocumentViewOptions from "@/components/DocumentViewOptions";
import { getCollectionDocuments } from "@/lib/actions";
import { FC } from "react";
import { Document } from "@/lib/db/schema";
import CollectionDocuments from "@/components/documents/CollectionDocuments";
import { searchParamsCache } from "@/lib/nuqs";
import { SortDocumentBy } from "@/lib/types";
type PageProps = {
  params: Promise<{ workspace: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page: FC<PageProps> = async ({ params, searchParams }) => {
  console.log(params);
  const { q: query } = await searchParamsCache.parse(searchParams);
  const { slug, workspace } = await params;
  const { data, error } = await getCollectionDocuments({
    slug,
    workspace,
    sortBy: query as SortDocumentBy,
  });

  return (
    <div className="flex w-full flex-col items-center justify-center  pt-28 px-4">
      <div className="w-full max-w-5xl">
        <DocumentViewOptions title={`Documents`}>
          <CollectionDocuments
            documents={data as Document[]}
            slug={slug}
            workspace={workspace}
          />
        </DocumentViewOptions>
      </div>
    </div>
  );
};

export default Page;
