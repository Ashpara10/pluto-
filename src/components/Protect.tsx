"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const Protect: FC<Props> = ({ children }) => {
  const { status } = useSession();
  if (status === "unauthenticated") {
    redirect("/login");
  }
  return children;
};

export default Protect;
