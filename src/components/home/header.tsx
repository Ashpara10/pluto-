import { getActiveWorkspace } from "@/lib/actions";
import { Workspace } from "@/lib/db/schema";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Header = () => {
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
            width={50}
            height={50}
            className=""
            alt=""
          />
        </div>
        <div className="flex items-center justify-center">
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
      </nav>
    </header>
  );
};

export default Header;
