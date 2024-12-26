import AllCollections from "@/components/collection/AllCollections";
import CollectionViewOptions from "@/components/CollectionViewOptions";
import { getAllCollections } from "@/lib/actions";
import { searchParamsCache } from "@/lib/nuqs";
import { FC } from "react";

type PageProps = {
  params: Promise<{ workspace: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page: FC<PageProps> = async ({ params, searchParams }) => {
  const { q: query } = await searchParamsCache.parse(searchParams);
  const { data, error } = await getAllCollections((await params).workspace);
  console.log({ data });
  return (
    <section className="flex w-full flex-col items-center justify-center mt-28">
      <div className="w-full max-w-7xl pb-10">
        <CollectionViewOptions title="All Collections">
          <AllCollections
            collections={data}
            error={error}
            workspace={(await params)?.workspace}
          />
        </CollectionViewOptions>
      </div>
    </section>
  );
};

export default Page;
