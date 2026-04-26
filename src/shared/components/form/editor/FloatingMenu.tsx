import { Toggle } from "@/shared/components/ui/toggle";
import { IconH1, IconH2, IconList, IconListNumbers } from "@tabler/icons-react";
import { Editor } from "@tiptap/react";
import { FloatingMenu as FloatingMenuContainer } from "@tiptap/react/menus";

export default function FloatingMenu({ editor }: { editor: Editor }) {
  const FLOATING_MENU_ITEMS = [
    {
      label: "Heading 1",
      icon: IconH1,
      isActive: (editor: Editor) => editor.isActive("heading", { level: 1 }),
      command: (editor: Editor) =>
        editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      icon: IconH2,
      isActive: (editor: Editor) => editor.isActive("heading", { level: 2 }),
      command: (editor: Editor) =>
        editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      icon: IconH2,
      isActive: (editor: Editor) => editor.isActive("heading", { level: 3 }),
      command: (editor: Editor) =>
        editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: "Bullet List",
      icon: IconList,
      isActive: (editor: Editor) => editor.isActive("bulletList"),
      command: (editor: Editor) =>
        editor.chain().focus().toggleBulletList().run(),
    },

    {
      label: "Numbered List",
      icon: IconListNumbers,
      isActive: (editor: Editor) => editor.isActive("orderdList"),
      command: (editor: Editor) =>
        editor.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <FloatingMenuContainer editor={editor}>
      <div>
        {FLOATING_MENU_ITEMS.map((item, index) => (
          <Toggle
            key={"floatingToggler-" + index}
            pressed={item.isActive(editor)}
            onPressedChange={() => item.command(editor)}
          >
            <item.icon />
          </Toggle>
        ))}
      </div>
    </FloatingMenuContainer>
  );
}
