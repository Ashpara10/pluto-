import { cn } from "@/lib/utils";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import ChatInput from "./chat-input";
import { Card, CardContent } from "../ui/card";
// import { remark } from "remark";
// import html from "remark-html";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { Button } from "../ui/button";
import { Copy, CopyCheckIcon, FilePlus2, Plus, RefreshCcw } from "lucide-react";
import { $getSelection } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";

const ChatAssistant = () => {
  const chatInputContainerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [mdContext, setMdContext] = useState("");
  const [editor] = useLexicalComposerContext();
  const [isCopied, setIsCopied] = useState(false);

  const {
    messages,
    setMessages,
    reload,
    handleSubmit,
    input,
    handleInputChange,
  } = useChat({
    body: {
      ctx: mdContext,
    },
  });

  useEffect(() => {
    return editor?.update(() => {
      const md = $convertToMarkdownString(TRANSFORMERS);
      setMdContext(md);
    });
  }, [editor, messages, input]);

  useEffect(() => {
    chatRef.current?.scrollIntoView(false);
  }, [messages]);

  const chatInputContainerHeight = chatInputContainerRef.current?.clientHeight;

  const addBlockToEditor = (block: string) => {
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(block as string, "text/html");
      const blocks = $generateNodesFromDOM(editor, dom);
      $getSelection()?.insertNodes(blocks);
    });
  };

  const handleCopyBlock = (block: string) => {
    setIsCopied(true);
    navigator.clipboard.writeText(block);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className={cn(" w-full", `h-screen`)}>
      <div className="h-full w-full pt-3 ">
        <ScrollArea
          className={cn(
            "scroll-py-5 flex relative h-full  w-full flex-col overflow-y-auto px-4 pb-6  "
          )}
        >
          <div
            ref={chatRef}
            style={{
              marginBottom: `${(chatInputContainerHeight as number) + 8}px`,
            }}
            className={cn("flex  w-full flex-col space-y-3")}
          >
            {messages.map((message, index) => {
              const content = unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(remarkRehype)
                .use(rehypeStringify)
                .processSync(message?.content);

              return message?.role === "user" ? (
                <Card
                  key={index}
                  className="w-fit max-w-[70%] self-end rounded-2xl bg-white"
                >
                  <CardContent className=" px-5 py-3 leading-tight ">
                    {message?.content}
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card key={index}>
                    <CardContent className="py-6">
                      <div
                        className="prose dark:prose-invert prose-strong:font-medium prose-strong:tracking-tight prose-headings:font-medium prose-headings:tracking-tight leading-snug "
                        dangerouslySetInnerHTML={{ __html: content.toString() }}
                      />
                    </CardContent>
                  </Card>
                  <div
                    className={cn(
                      "mt-2 transition-all mb-4 flex items-center justify-end gap-x-2 w-full"
                    )}
                  >
                    <Button
                      onClick={() => addBlockToEditor(content?.toString())}
                      variant={"outline"}
                      size={"smallIcon"}
                      className="cursor-pointer rounded-lg"
                    >
                      <Plus className="opacity-80 size-4" />
                    </Button>
                    <Button
                      onClick={() => handleCopyBlock(content?.toString())}
                      variant={"outline"}
                      size={"smallIcon"}
                      className="cursor-pointer rounded-lg"
                    >
                      {isCopied ? (
                        <CopyCheckIcon className="opacity-80 size-4" />
                      ) : (
                        <Copy className="opacity-80 size-4" />
                      )}
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"smallIcon"}
                      className="cursor-pointer rounded-lg"
                    >
                      <FilePlus2 className="opacity-80 size-4" />
                    </Button>
                    <Button
                      onClick={() => reload()}
                      variant={"outline"}
                      size={"smallIcon"}
                      className="cursor-pointer rounded-lg"
                    >
                      <RefreshCcw className="opacity-80 size-4" />
                    </Button>
                  </div>
                </>
              );
            })}
          </div>
          <div
            ref={chatInputContainerRef}
            className="mb-2 absolute bottom-2 inset-x-0 h-fit w-full px-3"
          >
            <ChatInput
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              messages={messages}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ChatAssistant;
