import { Editor } from "@tiptap/react";
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconBaseline,
  IconHighlight,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconAlignJustified,
  IconList,
  IconListNumbers,
  IconLink,
  IconPhoto,
  IconPaperclip,
  IconTable,
  IconQuote,
  IconMinus,
  IconClearFormatting,
  IconChevronDown,
  IconTypography,
  IconCircleCheckFilled
} from "@tabler/icons-react";
import { Toggle } from "@/shared/components/ui/toggle";
import { Separator } from "@/shared/components/ui/separator";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";

interface EditorToolbarProps {
  editor: Editor | null;
}

const PREDEFINED_COLORS = [
  "#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff",
  "#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff",
  "#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc",
  "#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd",
  "#cc4125", "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6d9eeb", "#6fa8dc", "#8e7cc3", "#c27ba0",
  "#a61c00", "#cc0000", "#e69138", "#f1c40f", "#6aa84f", "#45818e", "#3c78d8", "#3d85c6", "#674ea7", "#a64d79",
  "#85200c", "#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#1155cc", "#0b5394", "#351c75", "#741b47",
  "#5b0f00", "#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#1c4587", "#073763", "#20124d", "#4c1130"
];

function ActionButton({ 
  icon: Icon, 
  onClick, 
  disabled, 
  active = false 
}: { 
  icon: any, 
  onClick: () => void, 
  disabled?: boolean, 
  active?: boolean 
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`h-8 w-8 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${
        active ? "bg-muted text-foreground" : "bg-transparent text-muted-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function ToolbarGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-0.5">{children}</div>
      <span className="text-[10px] uppercase text-muted-foreground font-medium tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b p-2 bg-background">
      <ToolbarGroup label="Undo">
        <ActionButton
          icon={IconArrowBackUp}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        />
        <ActionButton
          icon={IconArrowForwardUp}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        />
      </ToolbarGroup>

      <Separator orientation="vertical" className="h-10" />

      <ToolbarGroup label="Format">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 px-2 inline-flex items-center gap-1 justify-between rounded-md text-sm font-medium transition-colors hover:bg-muted text-muted-foreground w-28 text-left border">
              <span className="truncate">
                {editor.isActive("heading", { level: 1 }) ? "Heading 1" :
                 editor.isActive("heading", { level: 2 }) ? "Heading 2" :
                 editor.isActive("heading", { level: 3 }) ? "Heading 3" :
                 editor.isActive("heading", { level: 4 }) ? "Heading 4" :
                 editor.isActive("heading", { level: 5 }) ? "Heading 5" :
                 editor.isActive("heading", { level: 6 }) ? "Heading 6" :
                 "Normal Text"}
              </span>
              <IconChevronDown className="h-4 w-4 opacity-50" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()} className="flex items-center justify-between">
              <span>Normal Text</span>
              {editor.isActive("paragraph") && <IconCircleCheckFilled className="h-4 w-4" />}
            </DropdownMenuItem>
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <DropdownMenuItem 
                key={level} 
                onClick={() => editor.chain().focus().toggleHeading({ level: level as any }).run()}
                className="flex items-center justify-between"
              >
                <span className={`text-base font-semibold`}>Heading {level}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </ToolbarGroup>

      <Separator orientation="vertical" className="h-10" />

      <ToolbarGroup label="Style">
        <Toggle size="sm" pressed={editor.isActive("bold")} onPressedChange={() => editor.chain().focus().toggleBold().run()} className="h-8 w-8 p-0">
          <IconBold className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive("italic")} onPressedChange={() => editor.chain().focus().toggleItalic().run()} className="h-8 w-8 p-0">
          <IconItalic className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive("underline")} onPressedChange={() => editor.chain().focus().toggleUnderline().run()} className="h-8 w-8 p-0">
          <IconUnderline className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive("strike")} onPressedChange={() => editor.chain().focus().toggleStrike().run()} className="h-8 w-8 p-0">
          <IconStrikethrough className="h-4 w-4" />
        </Toggle>
      </ToolbarGroup>

      <Separator orientation="vertical" className="h-10" />

      <ToolbarGroup label="Color">
        <Popover>
          <PopoverTrigger asChild>
            <button className="h-8 w-8 inline-flex items-center justify-center rounded-md transition-colors hover:bg-muted text-muted-foreground relative">
              <IconTypography className="h-4 w-4" />
              <div 
                className="absolute bottom-1 left-1.5 right-1.5 h-1 rounded-full" 
                style={{ backgroundColor: editor.getAttributes('textStyle').color || 'currentColor' }} 
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold">Text Color</span>
              <div className="grid grid-cols-10 gap-1">
                {PREDEFINED_COLORS.map(color => (
                  <button
                    key={color}
                    className="w-5 h-5 rounded-sm border border-border transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                    onClick={() => editor.chain().focus().setColor(color).run()}
                    title={color}
                  />
                ))}
              </div>
              <button 
                className="text-xs text-center border p-1 rounded hover:bg-muted mt-1"
                onClick={() => editor.chain().focus().unsetColor().run()}
              >
                Reset Color
              </button>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <button className="h-8 w-8 inline-flex items-center justify-center rounded-md transition-colors hover:bg-muted text-muted-foreground relative">
              <IconHighlight className="h-4 w-4" />
              <div 
                className="absolute bottom-1 left-1.5 right-1.5 h-1 rounded-full" 
                style={{ backgroundColor: editor.getAttributes('highlight').color || 'transparent' }} 
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold">Highlight Color</span>
              <div className="grid grid-cols-10 gap-1">
                {PREDEFINED_COLORS.map(color => (
                  <button
                    key={color}
                    className="w-5 h-5 rounded-sm border border-border transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                    onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                    title={color}
                  />
                ))}
              </div>
              <button 
                className="text-xs text-center border p-1 rounded hover:bg-muted mt-1"
                onClick={() => editor.chain().focus().unsetHighlight().run()}
              >
                Reset Highlight
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </ToolbarGroup>

      <Separator orientation="vertical" className="h-10" />

      <ToolbarGroup label="Align">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <button className="h-8 w-8 inline-flex items-center justify-center rounded-md transition-colors hover:bg-muted text-muted-foreground">
                {editor.isActive({ textAlign: "center" }) ? <IconAlignCenter className="h-4 w-4" /> :
                 editor.isActive({ textAlign: "right" }) ? <IconAlignRight className="h-4 w-4" /> :
                 editor.isActive({ textAlign: "justify" }) ? <IconAlignJustified className="h-4 w-4" /> :
                 <IconAlignLeft className="h-4 w-4" />}
             </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex gap-1 p-1 min-w-0">
             <ActionButton active={editor.isActive({ textAlign: "left" })} icon={IconAlignLeft} onClick={() => editor.chain().focus().setTextAlign("left").run()} />
             <ActionButton active={editor.isActive({ textAlign: "center" })} icon={IconAlignCenter} onClick={() => editor.chain().focus().setTextAlign("center").run()} />
             <ActionButton active={editor.isActive({ textAlign: "right" })} icon={IconAlignRight} onClick={() => editor.chain().focus().setTextAlign("right").run()} />
             <ActionButton active={editor.isActive({ textAlign: "justify" })} icon={IconAlignJustified} onClick={() => editor.chain().focus().setTextAlign("justify").run()} />
          </DropdownMenuContent>
        </DropdownMenu>
      </ToolbarGroup>

      <Separator orientation="vertical" className="h-10" />

      <ToolbarGroup label="List">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <button className="h-8 w-8 inline-flex items-center justify-center rounded-md transition-colors hover:bg-muted text-muted-foreground">
                {editor.isActive("orderedList") ? <IconListNumbers className="h-4 w-4" /> : <IconList className="h-4 w-4" />}
             </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-1 p-1 min-w-0 w-32">
             <DropdownMenuItem onClick={() => editor.chain().focus().toggleBulletList().run()}>
               <IconList className="h-4 w-4 mr-2" /> Bullet List
             </DropdownMenuItem>
             <DropdownMenuItem onClick={() => editor.chain().focus().toggleOrderedList().run()}>
               <IconListNumbers className="h-4 w-4 mr-2" /> Numbered List
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ToolbarGroup>

      <Separator orientation="vertical" className="h-10" />

      <ToolbarGroup label="Insert">
        <Popover>
          <PopoverTrigger asChild>
            <button className={`h-8 w-8 inline-flex items-center justify-center rounded-md transition-colors hover:bg-muted text-muted-foreground ${editor.isActive('link') ? 'bg-muted text-foreground' : ''}`}>
              <IconLink className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-2 flex gap-2">
            <input 
              type="url" 
              placeholder="Enter URL..." 
              className="flex-1 h-8 px-2 rounded-md border text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const url = e.currentTarget.value;
                  if (url) {
                    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                  }
                }
              }}
            />
            <button 
               className="px-2 border rounded hover:bg-muted text-sm"
               onClick={() => editor.chain().focus().unsetLink().run()}
            >
              Unlink
            </button>
          </PopoverContent>
        </Popover>

        <ActionButton icon={IconPhoto} onClick={() => {
          const url = window.prompt("Enter Image URL");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }} />
        
        <ActionButton active={editor.isActive("table")} icon={IconTable} onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
      </ToolbarGroup>

      <Separator orientation="vertical" className="h-10" />

      <ToolbarGroup label="More">
        <ActionButton active={editor.isActive("blockquote")} icon={IconQuote} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
        <ActionButton icon={IconMinus} onClick={() => editor.chain().focus().setHorizontalRule().run()} />
        <ActionButton icon={IconClearFormatting} onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} />
      </ToolbarGroup>

    </div>
  );
}
