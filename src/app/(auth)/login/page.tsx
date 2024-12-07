"use client";

import Login from "@/components/form/Login";

const Page = () => {
  return (
    <div className="flex h-screen w-full relative flex-col items-center justify-center">
      {/* <GradientBall className="w-2/4 z-10 -top-10 -right-[20%] h-2/4 blur-[150px]  bg-gradient-to-bl from-indigo-600 dark:bg-transparent via-indigo-500 to-indigo-400 " />
      <GradientBall className="w-2/4 z-10 -bottom-10 -left-[20%] h-2/4 blur-[150px]  bg-gradient-to-tr from-indigo-600 dark:bg-transparent via-indigo-500 to-indigo-400 " /> */}
      <Login />
    </div>
  );
};

export default Page;
