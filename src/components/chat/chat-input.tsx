import React, { Dispatch, FC, SetStateAction } from "react";
import TextArea from "react-textarea-autosize";
import { Button } from "../ui/button";
import {
  ArrowUp,
  CircleStop,
  CornerRightUp,
  Paperclip,
  SendHorizonal,
  Smile,
} from "lucide-react";
import { ChatRequestOptions, Message } from "ai";

type ChatInputProps = {
  messages: Message[];
  reload?: () => void;
  isDone?: boolean;
  input: string;
  stop?: () => void;
  append?: (m: Message) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  isLoading?: boolean;
  isResponseLoading?: boolean;
  setIsResponseLoading?: Dispatch<SetStateAction<boolean>>;
  setMessages?: (messages: Message[]) => void;
};

const ChatInput: FC<ChatInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
  stop,
  isLoading,
}) => {
  return (
    <form
      className=" flex w-full flex-col items-end justify-center overflow-hidden rounded-2xl border border-neutral-200/80 max-h-[180px] dark:border-lightGray/10 bg-white drop-shadow-2xl shadow-black p-1 dark:bg-neutral-800"
      onSubmit={(e) => {
        // console.log({ input });
        handleSubmit!(e);
      }}
    >
      <TextArea
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit!();
          }
        }}
        minRows={3}
        placeholder="Ask Assistant"
        className="mt-2 flex h-full w-full placeholder:opacity-50 cursor-pointer resize-none appearance-none border-none bg-transparent px-2 py-2 leading-tight text-opacity-80 focus-visible:outline-none "
      />
      <div className="flex w-full flex-row items-center justify-end px-1.5 pb-1.5">
        {/* <div className="flex items-center justify-center"> */}
        {/* <Button
          type="button"
          size={"smallIcon"}
          className="cursor-pointer rounded-xl"
          variant={"outline"}
        >
          <Paperclip className="size-4 opacity-80" />
        </Button> */}
        {/* </div> */}
        <Button
          type="submit"
          onClick={() => {
            if (isLoading) {
              stop!();
              return;
            }
          }}
          size={"smallIcon"}
          className="cursor-pointer rounded-xl"
          variant={"outline"}
        >
          {isLoading ? (
            <CircleStop className="size-4 opacity-80" />
          ) : (
            <ArrowUp className="size-4 opacity-80" />
          )}
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
