"use client";

import { Toggle } from "@/shared/components/ui/toggle";
import {
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconUnderline,
} from "@tabler/icons-react";
import { type Editor } from "@tiptap/react";
import { BubbleMenu as BubbleMenuWrapper } from "@tiptap/react/menus";
import { match } from "ts-pattern";
import { Separator } from "../../ui/separator";
import HeadingPopover from "./HeadingPopover";
import LinkPopover from "./LinkPopover";
import MoreMenusPopover from "./MoreMenusPopover";

export default function BubbleMenu({ editor }: { editor: Editor }) {
  const TOGGLE_BUTTON = [
    { name: "heading" },
    { name: "divider" },
    {
      name: "bold",
      icon: IconBold,
      trigger: () => editor.chain().focus().toggleBold().run(),
    },
    {
      name: "italic",
      icon: IconItalic,
      trigger: () => editor.chain().focus().toggleItalic().run(),
    },

    {
      name: "underline",
      icon: IconUnderline,
      trigger: () => editor.chain().focus().toggleUnderline().run(),
    },

    {
      name: "strike",
      icon: IconStrikethrough,
      trigger: () => editor.chain().focus().toggleStrike().run(),
    },
    { name: "divider" },
    { name: "link" },
    { name: "more" },
  ];

  return (
    <BubbleMenuWrapper
      className="bubble-menu bg-card border-border flex items-stretch gap-0.5 rounded border p-1"
      editor={editor}
    >
      {TOGGLE_BUTTON.map((item, index) =>
        match(item)
          .with({ name: "heading" }, () => (
            <HeadingPopover key="heading" editor={editor} />
          ))

          .with({ name: "divider" }, () => (
            <div key={`divider-${index}`}>
              <Separator orientation="vertical" className="mx-1 !my-0 h-7" />
            </div>
          ))

          // Link components
          .with({ name: "link" }, () => (
            <LinkPopover
              key="link"
              isActive={editor.isActive("link")}
              onLinkSet={(opt) => editor.chain().focus().toggleLink(opt).run()}
            />
          ))

          .with({ name: "more" }, () => (
            <MoreMenusPopover key="more" editor={editor} />
          ))
          .otherwise((item) => (
            <Toggle
              key={item.name}
              pressed={editor.isActive(item.name)}
              onPressedChange={item.trigger}
            >
              {item.icon && <item.icon />}
            </Toggle>
          )),
      )}
    </BubbleMenuWrapper>
  );
}
