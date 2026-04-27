"use client";

import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import BubbleMenu from "./BubbleMenu";
import SlashCommand from "./lib/extensions/SlashCommand";
import SlashCommandMenu from "./SlashCommandMenu";

type TextEditorProps = {
  value: string;
  onValueChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
};

export default function TextEditor({
  className,
  value,
  onValueChange,
}: TextEditorProps) {
  console.log({ value });
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ paragraph: false }),
      Underline,
      Link,
      Paragraph,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      SlashCommand.configure({
        suggestion: SlashCommandMenu,
      }),
      Placeholder.configure({
        placeholder: "Type / to browse options",
      }),
    ],
    content: value,
    immediatelyRender: false,
    enablePasteRules: [Link],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== value) {
        onValueChange?.(html);
      }
    },
  });

  // Sync external value changes with the editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="min-h-full rounded-md border">
      {editor && <BubbleMenu editor={editor} />}
      <EditorContent editor={editor} className={className} />
    </div>
  );
}
