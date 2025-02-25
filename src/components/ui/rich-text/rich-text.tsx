import React, {useEffect, useState} from "react";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {UseFormSetValue} from "react-hook-form";

import Toolbar from "./toolbar";

export function RichText({
  keyValue,
  setValue,
  defaultValue,
}: {
  keyValue: "description" | "cart_message";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  defaultValue: string;
}) {
  const [content, setContent] = useState(defaultValue);

  useEffect(() => {
    setValue(keyValue, content);
  }, [content, setValue]);

  const handleContentChange = (reason: string) => {
    setContent(reason);
  };

  const editor = useEditor({
    content: defaultValue,
    extensions: [StarterKit, Underline],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "flex bg-white dark:bg-black flex-col px-4 py-3 justify-start border-b border-r border-l dark:border-grey-border items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({editor}) => {
      handleContentChange(editor.getHTML());
    },
  });

  return (
    <div>
      <Toolbar content={content} editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
