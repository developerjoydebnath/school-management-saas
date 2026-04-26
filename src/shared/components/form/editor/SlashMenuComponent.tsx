import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";

interface Props {
  items: any[];
  command: (item: any) => void;
}

const SlashMenuComponent = ({ items, command }: Props) => {
  return (
    <Command
      data-slash-menu-command
      tabIndex={0}
      className="border-border !z-[9999] w-[250px] border"
    >
      <CommandList>
        <CommandGroup heading="FORMATING">
          {items.map((item, i) => (
            <CommandItem
              key={i}
              className="flex w-full items-center space-x-4 px-2 py-1 text-left text-base hover:bg-gray-100"
              onSelect={() => command(item)}
            >
              {item.icon && <item.icon className="size-5" />}
              {item.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default SlashMenuComponent;
