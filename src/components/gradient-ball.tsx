import { cn } from "@/lib/utils";
import React, { FC } from "react";

type GradientBallProps = {
  className?: string;
};
const GradientBall: FC<GradientBallProps> = ({ className }) => {
  return <div className={cn("absolute ", className)} />;
};

export default GradientBall;
