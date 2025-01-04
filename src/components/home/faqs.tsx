import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Faqs = () => {
  const faqs = [
    {
      question: "What is your pricing model?",
      answer: "Pluto is completely free to use for individuals",
    },

    {
      question: "Do you provide customer support?",
      answer:
        "Yes, we provide 24/7 customer support through live chat and email.",
    },
    {
      question: "Is my data secure?",
      answer:
        "We use industry-standard encryption and security protocols to ensure your data is safe.",
    },
    {
      question: "Can I integrate your service with other tools?",
      answer:
        "Yes, we offer integrations with popular tools like Slack, Zapier, and more.",
    },
    {
      question: "Can I access the AI Assistant features for free?",
      answer:
        "Currently, Pluto.app uses Google Gemini-1.5-Flash with a rate limit of 4 million tokens per minute. In the future, we will implement a BYOK system, allowing you to choose and integrate different AI models.",
    },
    {
      question: "How often do you release new features?",
      answer: "We release new features and updates on a monthly basis.",
    },
  ];
  return (
    <section
      id="faqs"
      className="w-full h-full relative  mt-20 flex flex-col items-center justify-center"
    >
      <div className="max-w-5xl mt-10 md:mt-16  w-full flex px-3 flex-col items-center justify-center">
        <h3 className="text-2xl lg:text-3xl  lg:font-semibold tracking-tight">
          Still Need Answers?
        </h3>
        <Accordion type="multiple" className="w-full mt-10 mx-auto">
          {faqs.map((faq, index) => {
            return (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="w-full "
              >
                <AccordionTrigger className="text-lg md:text-xl font-medium tracking-tight leading-snug">
                  {faq?.question}
                </AccordionTrigger>
                <AccordionContent className="opacity-80 text-base md:text-lg leading-snug">
                  {faq?.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default Faqs;
