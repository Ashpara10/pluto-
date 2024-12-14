"use client";
import { cn } from "@/lib/utils";
import { motion, useAnimation, Variants } from "framer-motion";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type AnimatedTitleProps = {
  className?: string;
  // children?: React.ReactNode;
  text: string;
};
const AnimatedTitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: `0.25em`,
  },
  visible: {
    opacity: 1,
    y: `0em`,
    transition: {
      duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

const AnimatedTitle: FC<AnimatedTitleProps> = ({ text, className }) => {
  // const { inView, ref } = useInView({
  //   triggerOnce: true,
  // });
  // const controls = useAnimation();
  // useEffect(() => {
  //   if (inView) {
  //     controls.start("visible");
  //   } else {
  //     controls.start("hidden");
  //   }
  // }, [controls]);

  return (
    // <motion.span className={cn(className)}>
    //   {text.split(" ").map((word, i) => {
    //     return (
    <motion.span
      // ref={ref}
      className={cn(className)}
      variants={AnimatedTitleVariants}
      aria-hidden="true"
      initial="hidden"
      animate={"visible"}
      // key={i}
      // transition={{ delay: i * 0.2 }}
    >
      {text}
    </motion.span>
    //     );
    //   })}
    // </motion.span>
  );
};

export default AnimatedTitle;
