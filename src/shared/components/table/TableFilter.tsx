import { cn } from '@/shared/lib/tiptap-utils';
import { IconCloudDownload, IconCopy, IconFileDescription, IconFileTypePdf, IconFilter2Cancel, IconTable } from '@tabler/icons-react';
import SearchInput from '../form/SearchInput';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

type WithSearch = {
  search: string;
}

type Props<T extends WithSearch> = {
  children?: React.ReactNode;
  filter: T;
  setFilter: (filter: T) => void;
  className?: string;
  hideExport?: boolean;
  hideSearch?: boolean;
  hideReset?: boolean;
  resetFilters?: () => void;
}

export default function TableFilter<T extends WithSearch>({
  children,
  filter,
  setFilter,
  className,
  hideExport,
  hideReset,
  hideSearch,
  resetFilters,
}: Props<T>) {
  return (
    <section className={cn('flex justify-between items-center', className)}>
      <div className="flex items-center gap-2">
        {!hideExport && <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant='outline'>
              <IconCloudDownload className='size-4' />
              Export
            </Button>
          } />
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">
              <IconCopy className='size-4' />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <IconFileTypePdf className='size-4' />
              PDF
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <IconTable className='size-4' />
              Excel
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <IconFileDescription className='size-4' />
              CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>}

        {children}
      </div>

      <div className='flex items-center gap-2'>
        {!hideSearch && <SearchInput
          value={filter.search}
          onValueChange={(search) => setFilter({ ...filter, search })}
          className="max-w-80 w-full"
        />}

        {!hideReset && <Button onClick={resetFilters ? resetFilters : () => { }} variant={'outline'}>
          <IconFilter2Cancel className='size-4' />
          Reset Filters
        </Button>}
      </div>
    </section>
  )
}
