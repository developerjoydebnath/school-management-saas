"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
  IconChevronDown,
  IconH1,
  IconH2,
  IconH3,
  IconList,
  IconListNumbers,
  IconPilcrow,
} from "@tabler/icons-react";
import { Editor } from "@tiptap/react";
import { useState } from "react";

export default function HeadingPopover({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <Popover>
      <PopoverTrigger render={
        <Button variant="ghost" className="space-x-1.5">
          Text
          <IconChevronDown className="size-4" />
        </Button>
      } />
      <PopoverContent className="w-fit p-1">
        <Command>
          <CommandList>
            <CommandGroup heading="HIERARCHY">
              {/* Paragraph */}
              <CommandItem
                data-active={editor.isActive("paragraph")}
                className="data-[active=true]:bg-gray-25"
                onSelect={() =>
                  editor.chain().focus().focus().setParagraph().run()
                }
              >
                <IconPilcrow />
                <span> Paragraph </span>
              </CommandItem>

              {/* Heading 1 */}
              <CommandItem
                data-active={editor.isActive("heading", { level: 1 })}
                className="data-[active=true]:bg-gray-25"
                onSelect={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                <IconH1 />
                <span> Heading 1 </span>
              </CommandItem>

              {/* Heading 2 */}
              <CommandItem
                data-active={editor.isActive("heading", { level: 2 })}
                className="data-[active=true]:bg-gray-25"
                onSelect={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <IconH2 />
                <span> Heading 2 </span>
              </CommandItem>

              {/* Heading 3 */}
              <CommandItem
                data-active={editor.isActive("heading", { level: 3 })}
                className="data-[active=true]:bg-gray-25"
                onSelect={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                <IconH3 />
                <span> Heading 3 </span>
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="LIST">
              {/* Bullet list */}
              <CommandItem
                data-active={editor.isActive("bullet-list")}
                className="data-[active=true]:bg-gray-25"
                onSelect={() => editor.chain().focus().toggleBulletList().run()}
              >
                <IconList />
                <span> Bullet List </span>
              </CommandItem>

              {/* Ordered list */}
              <CommandItem
                data-active={editor.isActive("ordered-list")}
                className="data-[active=true]:bg-gray-25"
                onSelect={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
              >
                <IconListNumbers />
                <span> Ordered List </span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
