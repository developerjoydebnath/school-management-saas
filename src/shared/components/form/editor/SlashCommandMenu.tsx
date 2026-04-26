import {
  IconH1,
  IconH2,
  IconH3,
  IconList,
  IconListNumbers,
} from "@tabler/icons-react";
import { Editor, Range, ReactRenderer } from "@tiptap/react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import SlashMenuComponent from "./SlashMenuComponent";

let popup: TippyInstance | null = null;
let reactRenderer: ReactRenderer | null = null;

type CommandProps = {
  editor: Editor;
  range: Range;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  items: ({ query }: any) => {
    return [
      {
        title: "Heading 1",
        icon: IconH1,
        command: ({ editor, range }: CommandProps) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 1 })
            .run();
        },
      },
      {
        title: "Heading 2",
        icon: IconH2,
        command: ({ editor, range }: CommandProps) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 2 })
            .run();
        },
      },
      {
        title: "Heading 3",
        icon: IconH3,
        command: ({ editor, range }: CommandProps) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 3 })
            .run();
        },
      },
      {
        title: "Bullet List",
        icon: IconList,
        command: ({ editor, range }: CommandProps) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
      },

      {
        title: "Numbered List",
        icon: IconListNumbers,
        command: ({ editor, range }: CommandProps) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
      },
    ]
      .filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase()),
      )
      .slice(0, 10);
  },

  render: () => ({
    onStart: (props: any) => {
      if (popup) popup.destroy();
      if (reactRenderer) reactRenderer.destroy();

      reactRenderer = new ReactRenderer(SlashMenuComponent, {
        props,
        editor: props.editor,
      });

      popup = tippy(document.body, {
        getReferenceClientRect: props.clientRect,
        appendTo: () =>
          document.querySelector("[data-tiptop-editor-container]") ||
          document.body,
        content: reactRenderer.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
        popperOptions: {
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                boundary: "viewport",
              },
            },
          ],
        },
      });

      requestAnimationFrame(() => {
        const el = reactRenderer?.element.querySelector(
          "[data-slash-menu-command]",
        );
        if (el instanceof HTMLElement) {
          el?.focus();
        }
      });
    },

    onUpdate(props: any) {
      reactRenderer?.updateProps(props);
    },

    onExit() {
      popup?.destroy();
      popup = null;
      reactRenderer?.destroy();
      reactRenderer = null;
    },
  }),
};
