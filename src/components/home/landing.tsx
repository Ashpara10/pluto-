"use client";
import { Workspace } from "@/lib/db/schema";
import { motion, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnimatedTitle from "../AnimatedTitle";
import { Button } from "../ui/button";
import { getActiveWorkspace } from "@/lib/actions";

const gradientVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.2,
    y: "80%",
    filter: "blur(80px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: ["blur(120px)", "blur(180px)"],
    transition: {
      duration: 1,
      ease: "easeInOut",
      type: "spring",
    },
  },
};
const imageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.2,
    y: "80%",
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9],
      type: "spring",
    },
  },
};

const Landing = () => {
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
  console.log({ activeWorkspace });
  return (
    <section
      id="hero"
      className="w-full h-full relative flex flex-col items-center justify-center"
    >
      {/* <motion.div
        variants={gradientVariants}
        initial="initial"
        animate="animate"
        className="bg-gradient-to-t from-red-400 via-rose-300 to-indigo-300 w-full max-w-5xl  h-[500px] md:h-[900px] -z-20 absolute   "
      /> */}
      {/* <div className="w-3/4 h-3/4 bg-gradient-to-bl from-red-400 via-indigo-300 to-transparent absolute blur-[140px" /> */}
      {/* <div className="w-3/4 h-3/4 bg-indigo-300  absolute blur-[140px]" /> */}
      <div className="w-full md:max-w-5xl xl:max-w-7xl mt-14 mb-10 min-h-screen flex flex-col items-center justify-center ">
        <div className=" w-full min-h-[65vh] md:max-w-5xl flex flex-col items-center justify-center">
          <h2 className="w-full flex flex-col items-center  justify-center text-3xl lg:text-4xl md:leading-snug xl:text-6xl tracking-tight relative leading-tight font-medium md:font-medium">
            <AnimatedTitle text={"Create & Write Content"} />
            <AnimatedTitle text={"with AI-Powered Intelligent Tools"} />
          </h2>
          <AnimatedTitle
            className="w-full md:text-lg flex  items-center justify-center leading-tight  opacity-80 mt-4 max-w-sm md:max-w-xl "
            text={
              "Effortless document management meets AI-powered chat—Pluto revolutionizes the way you create, organize, and collaborate."
            }
          />

          {/* <motion.div
            variants={imageVariants}
            initial="initial"
            animate="animate"
            className="mt-4 space-x-3"
          >
            <Button
              size={"lg"}
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
              className="px-8 tracking-normal py-2 hover:bg-opacity-80 transition-all rounded-full  "
            >
              {status === "authenticated" ? "Dashboard" : "Get Started"}
              <ChevronRight className="ml-2 size-4 opacity-80" />
            </Button>
            <Button
              variant={"outline"}
              size={"lg"}
              className="px-8 tracking-normal py-2 hover:bg-opacity-80 transition-all rounded-full  "
            >
              Star on Github
            </Button>
          </motion.div> */}
        </div>
        <motion.div
          variants={imageVariants}
          initial="initial"
          animate="animate"
          style={{ filter: "drop-shadow(4px 34px 24px #000000bb)" }}
          className=" w-full md:max-w-5xl p-3 flex flex-col items-center justify-center overflow-hidden"
        >
          <Image
            src={"/landing/01.png"}
            width={1400}
            quality={100}
            height={1000}
            className="hidden md:flex rounded-lg "
            alt=""
          />
          <Image
            src={"/landing/mobile-shot-1.png"}
            width={1200}
            quality={100}
            height={1000}
            className="scale-90 rounded-xl md:hidden"
            alt=""
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Landing;
