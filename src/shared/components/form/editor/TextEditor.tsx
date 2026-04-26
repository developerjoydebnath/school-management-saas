"use client";

import { SimpleEditor } from "@/shared/components/tiptap-templates/simple/simple-editor";

type TextEditorProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  bubbleMenu?: boolean;
};

export default function TextEditor({
  value,
  onValueChange,
  className,
}: TextEditorProps) {
  return (
    <SimpleEditor 
      value={value} 
      onValueChange={onValueChange} 
      className={className} 
    />
  );
}
