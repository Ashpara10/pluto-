import { motion, useAnimation } from "framer-motion";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Features = () => {
  const [ref, inView, entry] = useInView({ threshold: 1 });
  const controls = useAnimation();
  const features = [
    {
      title: "AI-Powered Assistance",
      description:
        "Get suggestions and recommendations based on your usage patterns and preferences.",
    },
    {
      title: "Fetch Articles & Update",
      description:
        "Fetch articles,journals,blogs from the web and update them in your document with a single click.",
    },
    {
      title: "Export your Content",
      description:
        "Export your documents into markdown format and share them with your team or clients.",
    },
    {
      title: "Summarize & Analyze Content",
      description:
        "Get the gist of any webpage with just one click using our Chrome extension. We’re with you wherever you go.",
    },
    // {
    //   title: "Collaborate with Team",
    //   description:
    //     "Invite your team members and collaborate on documents in real-time.",
    // },
    // {
    //   title: "Secure & Private",
    //   description:
    //     "Your data is secure and private. We do not share your data with any third-party services.",
    // },
  ];
  useEffect(() => {
    if (inView) {
      controls.start("visible");
      return;
    }
    controls.start("hidden");
  }, [inView, controls]);
  const boxVariant = {
    hidden: {
      x: "-100vw", //move out of the site
    },
    visible: {
      x: 0, // bring it back to nrmal
      transition: {
        delay: 0.5,
        when: "beforeChildren", //use this instead of delay
        staggerChildren: 0.25, //apply stagger on the parent tag
      },
    },
  };
  const listVariant = {
    hidden: {
      y: 10, //move out of the site
      opacity: 0,
    },
    visible: {
      y: 0, // bring it back to nrmal
      opacity: 1,
    },
  };

  return (
    <section
      id="features"
      className="w-full h-full relative  flex flex-col items-center justify-center"
    >
      <div className="w-full md:max-w-5xl px-4 mt-14 md:mb-10 min-h-screen flex flex-col items-center justify-center ">
        <motion.div
          // ref={ref}
          variants={boxVariant}
          animate="visible"
          initial="hidden"
          className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 w-full"
        >
          {features.map((f, i) => {
            return (
              <motion.div ref={ref} key={i} variants={listVariant}>
                <FeatureCard feature={f} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

type FeatureCardProps = {
  feature: { title: string; description: string };
};

const FeatureCard: FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="w-full ">
      <div className="w-full h-[250px] rounded-2xl mb-3 border border-neutral-200 dark:border-lightGray/10 "></div>
      <div className="flex flex-col">
        <h4 className="text-xl font-medium tracking-tight leading-snug">
          {feature.title}
        </h4>
        <p className="leading-snug mt-1 opacity-80 font-medium">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default Features;
