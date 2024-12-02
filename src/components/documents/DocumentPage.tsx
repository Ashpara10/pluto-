"use client";
import { updateDocument } from "@/lib/db/documents";
import { Document } from "@/lib/db/schema";
import { queryClient } from "@/lib/session-provider";
import { $generateHtmlFromNodes } from "@lexical/html";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useWindowEvent } from "@mantine/hooks";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import TransitionLayout from "../TransitionLayout";

type DocumentPageProps = {
  document: Document;
};

const Editor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
  loading: () => <ArticleDataSkeleton />,
});

const DocumentPage: FC<DocumentPageProps> = ({ document }) => {
  const [data, setData] = useState<Document>(document!);
  const [tags, setTags] = useState<string[]>(document?.tags! || []);
  const [editor] = useLexicalComposerContext();

  const onSave = async () => {
    let payload = {
      id: data?.id!,
      title: data?.title!,
      markdown: "",
      content: "",
      tags: tags,
    };
    // console.log(payload?.title);
    editor?.read(() => {
      const html = $generateHtmlFromNodes(editor);
      const md = $convertToMarkdownString(TRANSFORMERS);
      payload = { ...payload, markdown: md, content: html };
      // console.log({ tags: payload });
    });

    const { error } = await updateDocument(payload);
    if (error) {
      return toast.error(error);
    }
    toast.success("Document saved successfully");
    queryClient.refetchQueries(["documents-lists"]);
  };

  useWindowEvent("keydown", (e) => {
    if (e?.code === "KeyS" && (e?.ctrlKey || e?.metaKey)) {
      e.preventDefault();
      onSave();
      return;
    }
  });

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden ">
      <TransitionLayout>
        <TextareaAutosize
          autoFocus
          className="w-full leading-none md:leading-tight tracking-tight resize-none font-medium
						text-3xl lg:text-4xl p-0 focus-visible:outline-none bg-transparent placeholder:text-neutral-300 dark:placeholder:text-neutral-700
						border-none appearance-none shadow-none overflow-hidden "
          placeholder="Enter Title..."
          value={data?.title!}
          onChange={(e) => setData((p) => ({ ...p, title: e.target.value }))}
        />
        {/* <TagInput tags={tags!} setTags={(tags) => setTags(tags)} /> */}
        <div className="w-full flex mt-1 items-center justify-start">
          <span className="text-sm opacity-75">
            {new Date(data?.createdAt!).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <Editor
          content={data?.content!}
          setContent={(data) => setData((p) => ({ ...p, content: data }))}
        />
      </TransitionLayout>
    </div>
  );
};

const ArticleDataSkeleton = () => {
  return (
    <div className="mt-8 flex w-full items-center justify-center">
      <Loader className="animate-spin " />
    </div>
  );
};

export default DocumentPage;
