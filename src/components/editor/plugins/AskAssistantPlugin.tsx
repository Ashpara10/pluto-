import google from "@/lib/ai";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement } from "@lexical/utils";
import { generateText } from "ai";
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from "lexical";
import { useEffect } from "react";
import { $createAssistantNode, TAssistantNode } from "../nodes/AssistantNode";

export const INSERT_ASSISTANT_RESPONSE: LexicalCommand<string> = createCommand(
  "INSERT_ASSISTANT_RESPONSE"
);

const generateAssistantResponse = async (q: string) => {
  console.log({ q });
  const result = await generateText({
    model: google("gemini-1.5-flash"),
    system: `You are a content writer assistant. generate content based on users query
      To Generate Content:
      - Answer concisely and clearly
      - Use simple language
      - Use the same tone and style as the input
      - Answer must be in text format
      - Each answer must have a Introduction,Explanation amd Justification
      
      `,
    prompt: q,
  });
  console.log(result?.text);
  return result;
};

export default function AskAssistantPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand<TAssistantNode>(
      INSERT_ASSISTANT_RESPONSE,
      (payload) => {
        (async () => {
          const text = await generateAssistantResponse(payload?.text);
          console.log(text?.text);
          editor.update(() => {
            const node = $createAssistantNode({
              text: text?.text,
            });
            console.log({ node });
            $insertNodes([node]);
            if ($isRootOrShadowRoot(node.getParentOrThrow())) {
              $wrapNodeInElement(node, $createParagraphNode).selectEnd();
            }
          });
        })();
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);
  return null;
}
