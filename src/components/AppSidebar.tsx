"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Folder, Home, Search, Settings, Tag } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import Link from "next/link";

type SidebarItemProps = {
  id: string;
  title: string;
  icon: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  href?: string;
};

const SidebarItem = ({ title, icon, isActive, onClick }: SidebarItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer relative justify-start w-full px-3 py-1"
      )}
    >
      {isActive && (
        <motion.div
          className=" rounded-lg absolute bg-neutral-200/60 dark:bg-lightGray/10 inset-0 bg-blend-difference"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          layoutId="bubble"
        />
      )}
      <div className={cn("mr-2 opacity-80", isActive && "opacity-100")}>
        {icon}
      </div>
      <span className={cn("opacity-80", isActive && "opacity-100")}>
        {title}
      </span>
    </div>
  );
};

const AppSidebar = () => {
  const [active, setActive] = useState("home");
  const router = useRouter();
  const params = useParams();
  const items: SidebarItemProps[] = [
    {
      id: "search",
      isActive: active === "search",
      icon: <Search strokeWidth={3} className="size-4  opacity-70" />,
      title: "Search",
      href: "",
      onClick: () => {
        setActive("search");
      },
    },
    {
      id: "home",
      isActive: active === "home",
      icon: <Home strokeWidth={3} className="size-4  opacity-70" />,
      title: "Home",
      href: `/w/${params?.workspace}/`,
      onClick: () => {
        setActive("home");
      },
    },
    {
      id: "collections",
      isActive: active === "collections",
      icon: <Folder strokeWidth={3} className="size-4  opacity-70" />,
      title: "Collections",
      href: `/w/${params?.workspace}/collection`,
      onClick: () => {
        setActive("collections");
        // router.push(`/w/${params?.workspace}/collection`);
      },
    },
    {
      id: "tags",
      isActive: active === "tags",
      icon: <Tag strokeWidth={3} className="size-4  opacity-70" />,
      href: `/w/${params?.workspace}/tags`,
      title: "Tags",
      onClick: () => {
        setActive("tags");
        // router.push(`/w/${params?.workspace}/tags`);
      },
    },
    {
      id: "settings",
      isActive: active === "settings",
      icon: <Settings strokeWidth={3} className="size-4  opacity-70" />,
      title: "Settings",
      href: "",
      onClick: () => {
        setActive("settings");
      },
    },
  ];

  return (
    <div className={cn(" w-full py-3 ", `h-screen`)}>
      {/* <div className="h-[60px] "></div> */}
      <div className="w-full px-3 pb-4">
        <WorkspaceSwitcher />
      </div>

      <motion.div layout className=" relative px-3">
        {items.map((item, index) => {
          return (
            <Link key={index} prefetch={true} href={item?.href as string}>
              <SidebarItem {...item} />
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

export default AppSidebar;
