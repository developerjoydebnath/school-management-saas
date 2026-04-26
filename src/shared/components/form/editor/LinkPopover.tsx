"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Switch } from "@/shared/components/ui/switch";
import { Toggle } from "@/shared/components/ui/toggle";
import { IconLink } from "@tabler/icons-react";
import { useState } from "react";

type LinkOption = {
  href: string;
  target?: string | null;
  rel?: string | null;
  class?: string | null;
};

export default function LinkPopover({
  isActive,
  onLinkSet,
}: {
  isActive: boolean;
  onLinkSet: (opt: LinkOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const [href, setHref] = useState("");
  const [isNewTab, setIsNewTab] = useState(false);

  const handleLinkSet = () => {
    onLinkSet({
      href,
      target: isNewTab ? "_blank" : null,
      rel: isNewTab ? "noopener noreferrer" : null,
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={
        <Toggle pressed={isActive}>
          <IconLink />
        </Toggle>
      } />

      <PopoverContent className="flex flex-col items-stretch gap-2">
        <div className="relative">
          <IconLink
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2"
          />
          <Input
            type="url"
            className="bg-gray-25 h-9 border-none pl-9 !ring-0 !outline-none"
            placeholder="Enter URL"
            value={href}
            onChange={(e) => setHref(e.target.value)}
          />
        </div>

        <Label className="font-medium text-gray-600">
          <span> Open in new tab </span>
          <Switch checked={isNewTab} onCheckedChange={setIsNewTab} />
        </Label>

        <div className="flex flex-row items-center justify-end pt-2">
          <Button
            size="sm"
            className="text-gray-600"
            onClick={handleLinkSet}
          >
            Set Link
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
