import { cn } from '@/shared/lib/tiptap-utils';
import { IconCopy, IconFileExcel, IconFilter2Cancel, IconPdf, IconTable } from '@tabler/icons-react';
import SearchInput from '../form/SearchInput';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

type WithSearch = {
  search: string;
}

type Props<T extends WithSearch> = {
  filter: T;
  setFilter: (filter: T) => void;
  className?: string;
  actions?: React.ReactNode;
}

export default function TableFilter<T extends WithSearch>({
  filter,
  setFilter,
  actions,
  className,
}: Props<T>) {
  return (
    <section className={cn('flex justify-between items-center', className)}>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant='outline'>
              Export
            </Button>
          } />
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">
              <IconCopy className='size-4' />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <IconPdf className='size-4' />
              PDF
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <IconFileExcel className='size-4' />
              Excel
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <IconTable className='size-4' />
              CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='flex items-center gap-2'>
        <SearchInput
          value={filter.search}
          onValueChange={(search) => setFilter({ ...filter, search })}
          className="max-w-80 w-full"
        />

        <Button variant={'outline'}>
          <IconFilter2Cancel className='size-4' />
          Reset Filters
        </Button>
      </div>
    </section>
  )
}
