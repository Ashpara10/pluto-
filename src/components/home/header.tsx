import { getActiveWorkspace } from "@/lib/actions";
import { Workspace } from "@/lib/db/schema";
import { Menu, Moon, Sun } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { useTheme } from "next-themes";

const Header = () => {
  const { setTheme, theme } = useTheme();
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(
    null
  );
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const w = await getActiveWorkspace();
      if (!w) {
        return;
      }
      setActiveWorkspace(w);
    })();
  }, []);

  return (
    <header className="fixed w-full backdrop-blur-md top-0 z-50 flex items-center justify-center">
      <nav className="max-w-5xl w-full mx-auto flex items-center justify-between px-4 py-4">
        <div>
          <Image
            src={"/Frame 1.svg"}
            width={40}
            height={40}
            className=""
            alt=""
          />
        </div>
        <div className="hidden md:flex items-center justify-center">
          <Button
            size={"sm"}
            onClick={() => {
              if (status === "authenticated" && activeWorkspace) {
                router.push(`/w/${activeWorkspace?.id}`);
                return;
              } else if (status === "authenticated" && !activeWorkspace) {
                router.push("/workspace");
                return;
              }
              router.push("/login");
            }}
            className=" rounded-3xl px-6 py-1"
          >
            {status === "authenticated" ? "Dashboard" : "Sign In"}
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="ml-2 py-1 rounded-3xl px-6"
          >
            {/* <Github className="size-4 mr-2" /> */}
            Stars on Github
          </Button>
        </div>
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="focus-visible:outline-none"
                variant={"outline"}
              >
                <Menu className="size-4 opacity-80" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={"left"}
              className="dark:bg-neutral-900/70 max-w-xs backdrop-blur-lg dark:border-lightGray/10 bg-white/60 border-neutral-200/60"
            >
              <SheetHeader>
                <div>
                  <Image
                    src={"/Frame 1.svg"}
                    width={40}
                    height={40}
                    className=""
                    alt=""
                  />
                </div>
              </SheetHeader>
              <div className="h-full pb-10 flex flex-col items-center justify-end">
                {/* <div>hello</div> */}
                <div className="w-full flex flex-col items-center justify-center">
                  <Button
                    size={"sm"}
                    onClick={() => {
                      if (status === "authenticated" && activeWorkspace) {
                        router.push(`/w/${activeWorkspace?.id}`);
                        return;
                      } else if (
                        status === "authenticated" &&
                        !activeWorkspace
                      ) {
                        router.push("/workspace");
                        return;
                      }
                      router.push("/login");
                    }}
                    className=" w-full  px-6 py-1.5"
                  >
                    {status === "authenticated" ? "Dashboard" : "Sign In"}
                  </Button>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                    }}
                    className="mt-2 w-full  px-6 py-1.5"
                  >
                    {theme === "dark" ? (
                      <Sun className="mr-2 size-5 " />
                    ) : (
                      <Moon className="mr-2 size-5 " />
                    )}{" "}
                    Switch Theme
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
