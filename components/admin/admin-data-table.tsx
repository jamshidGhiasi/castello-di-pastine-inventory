"use client"

import React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import {ChevronDown} from "lucide-react"
import {Button} from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import AdminDataTablePagination from "@/components/admin/admin-data-table-pagination"

export interface AdminDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  /**
   * Column name to use for search filter
   * @default The first column's accessor key
   */
  searchColumnAccessorKey?: string
  extraActions?: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

export default function AdminDataTable<TData, TValue>({
  columns: injectedColumns,
  data,
  searchColumnAccessorKey: injectedSearchColumnAccessorKey,
  extraActions,
}: AdminDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...injectedColumns
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: { pagination: { pageSize: 50, pageIndex: 0, }, },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const searchColumnAccessorKey = injectedSearchColumnAccessorKey || (columns?.[0] as any)?.accessorKey

  return (
    <div className="w-full max-h-[50vh]">
      {/* Header */}
      <div className="w-full flex justify-between items-center py-4">
        {/* Left */}
        <div>
          {searchColumnAccessorKey &&
            <Input
              placeholder={`Filter ${searchColumnAccessorKey}`}
              value={(table.getColumn(searchColumnAccessorKey)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(searchColumnAccessorKey)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />}
        </div>

        {/* Right */}
        <div className="flex justify-between gap-1">
          {extraActions && React.cloneElement(extraActions, { table })}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: any) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="relative rounded-md border max-h-[50vh] overflow-auto  shadow-lg  border-white ">
        <Table className="relative"  >
          <TableHeader className=" sticky top-0 bg-neutral-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className=" bg-stone-900   [&>*:nth-child(odd)]:bg-neutral-300 [&>*:nth-child(odd):hover]:hover:bg-neutral-100 cursor-pointer">

            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className=" bg-neutral-200 hover:bg-neutral-100 cursor-pointer  "
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-xs " key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="mt-4">
        <AdminDataTablePagination table={table} />
      </div>
    </div>
  )
}
