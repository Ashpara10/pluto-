import { cn } from "@/lib/utils";
import WorkspaceSwitcher from "./WorkspaceSwitcher";

const AppSidebar = () => {
  return (
    <div className={cn(" w-full py-2 px-3", `h-screen`)}>
      <div className="w-full mt-3">
        <WorkspaceSwitcher />
      </div>
    </div>
  );
};

export default AppSidebar;
