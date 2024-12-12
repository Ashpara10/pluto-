import React from "react";
import { Button } from "../ui/button";
import { ChevronRight, Star } from "lucide-react";
import Image from "next/image";

const Landing = () => {
  return (
    <section
      id="hero"
      className="w-full h-full relative flex flex-col items-center justify-center"
    >
      {/* <div className="bg-gradient-to-tr from-red-400 via-rose-400 to-indigo-300 w-full max-w-5xl rounded-full h-[1000px] -z-10 absolute  top-10 ranslate-y-28 blur-[180px]"></div> */}
      <div className="bg-gradient-to-t from-red-400 via-rose-300 to-indigo-300 w-full max-w-5xl  h-[900px] -z-10 absolute   ranslate-y-28 blur-[180px]"></div>
      <div className="w-full md:max-w-5xl xl:max-w-7xl mb-10 min-h-screen flex flex-col items-center justify-center ">
        <div className=" w-full min-h-[80vh] md:max-w-5xl flex flex-col items-center justify-center">
          <h2 className="w-full flex flex-col items-center  justify-center text-3xl lg:text-5xl md:leading-snug xl:text-6xl tracking-tight leading-tight font-medium md:font-medium">
            <span>Create & Write Content</span>
            <span className=""> with AI-Powered Intelligent Tools</span>
          </h2>
          <span className="w-full hidden md:flex  text-center text-lg items-center justify-center leading-snug font-medium opacity-80 mt-4">
            Create, organize, and share documents effortlessly. With Pluto’s
            AI-powered chat, transform the way you interact <br /> with your
            content. Whether it’s crafting ideas or extracting insights, Pluto
            empowers you to do more with less.
          </span>
          <div className="mt-4 space-x-3">
            <Button
              size={"lg"}
              className="px-8 py-2 hover:scale-105 transition-all rounded-full  "
            >
              Get Started <ChevronRight className="ml-2 size-4 opacity-80" />
            </Button>
            <Button
              size={"lg"}
              variant={"outline"}
              className="px-8 py-2 rounded-full"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className=" w-full md:max-w-5xl  flex flex-col items-center justify-center overflow-hidden">
          <Image
            src={"/landing/pluto1.png"}
            width={1200}
            quality={100}
            height={1000}
            className="drop-shadow-2xl rounded-lg shadow-black/30"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Landing;
