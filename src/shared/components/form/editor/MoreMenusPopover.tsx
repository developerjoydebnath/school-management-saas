"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Toggle } from "@/shared/components/ui/toggle";
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconDots,
} from "@tabler/icons-react";
import { Editor } from "@tiptap/react";

export default function MoreMenusPopover({ editor }: { editor: Editor }) {
  return (
    <Popover>
      <PopoverTrigger render={
        <Button size="icon" variant="ghost">
          <IconDots />
        </Button>
      } />
      <PopoverContent className="flex w-fit items-center p-1">
        {/* Align text left */}
        <Toggle
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
        >
          <IconAlignLeft />
        </Toggle>

        {/* Align text center */}
        <Toggle
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
        >
          <IconAlignCenter />
        </Toggle>

        {/* Align text center */}
        <Toggle
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
        >
          <IconAlignRight />
        </Toggle>

        {/* Align text justify */}
        <Toggle
          pressed={editor.isActive({ textAlign: "justify" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("justify").run()
          }
        >
          <IconAlignJustified />
        </Toggle>
      </PopoverContent>
    </Popover>
  );
}
