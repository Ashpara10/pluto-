import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import AvatarDropDownMenu from "./AvatarDropDownMenu";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import WorkspaceSwitcher from "./WorkspaceSwitcher";

const Navbar = () => {
  const router = useRouter();
  const { workspace } = useParams();

  const links = [
    {
      name: "Docs",
      link: `/w/${workspace}`,
      value: "documents",
    },
    {
      name: "Collection",
      link: `/w/${workspace}/collection`,
      value: "collections",
    },
    {
      name: "Tags",
      link: `/w/${workspace}/tags`,
      value: "tags",
    },
  ];

  const path = usePathname();
  const getActivePath = () => {
    if (path === `/w/${workspace}`) return "documents";
    else if (path.includes(`/w/${workspace}/collection`)) return "collections";
    else if (path.includes(`/w/${workspace}/tags`)) return "tags";
    else return "documents";
  };

  return (
    <header className=" flex w-full flex-col  items-center justify-center ">
      <div className="flex w-full max-w-7xl items-center justify-end md:justify-between  ">
        <div className="hidden md:flex">
          <WorkspaceSwitcher />
        </div>
        <div>
          <AvatarDropDownMenu />
        </div>
      </div>
      <nav className="sticky hidden md:flex top-0  w-full items-center justify-center">
        <div className="flex w-full items-center justify-center px-3">
          <Tabs defaultValue={getActivePath()}>
            <TabsList className="rounded-lg bg-neutral-200/60 dark:bg-lightGray/10">
              {links.map((link, i) => {
                return (
                  <TabsTrigger
                    key={i}
                    className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900"
                    value={link?.value}
                    onClick={() => router.push(link?.link)}
                  >
                    {link?.name}
                  </TabsTrigger>
                );
              })}
              {/* <TabsTrigger
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900"
                value="documents"
                onClick={() => router.push(`/w/${workspace}`)}
              >
                Docs
              </TabsTrigger>
              <TabsTrigger
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900"
                value="collections"
                onClick={() => router.push(`/w/${workspace}/collection`)}
              >
                Collection
              </TabsTrigger>
              <TabsTrigger
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900"
                value="tags"
                onClick={() => router.push(`/w/${workspace}/tags`)}
              >
                Tags
              </TabsTrigger> */}
            </TabsList>
          </Tabs>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
