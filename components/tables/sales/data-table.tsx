"use client";
import React, { useState, useRef, ReactNode, forwardRef } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { addDays, format } from "date-fns";
import { StockProductType } from "@/types/types";
import { SaleType } from "@/types/types";
import { SalesProductColumns } from "./column";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import SalesForm from "@/components/forms/sales/sales-form";

interface DataTableProps<TData, TValue> {
  selectedproduct: SaleType;
  setSelectedproduct: (value: SaleType | null) => void;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setIsAddProductOpen: (value: boolean) => void;
  isAddProductOpen?: boolean;
  isLoading?: boolean;
  updateOpen: boolean;
  setUpdateOpen?: (value: boolean) => void;
}

const statusOptions = ["Closed", "Happenig", "Upcoming"];

export function SalesProductTable<TData, TValue>({
  selectedproduct,
  setSelectedproduct,
  columns,
  data,
  setIsAddProductOpen,
  isAddProductOpen,
  isLoading,
  updateOpen,
  setUpdateOpen,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
  });
  const [addproduct, setAddproduct] = useState(false);

  const pathname = usePathname();
  const handleclose = () => {
    setAddproduct(false);
    setIsAddProductOpen(false);
    setUpdateOpen && setUpdateOpen(false);
    isAddProductOpen && setIsAddProductOpen(false);
  };

  return (
    <>
      {(addproduct || updateOpen) && (
        <div
          className=" pb-3 bg-black transition-opacity bg-opacity-70  w-full h-[100vh] flex justify-center items-start top-0 bottom-0 left-0 right-0 fixed"
          style={{ zIndex: 3000 }}
        >
          <div className="w-[90%] m-auto relative  ">
            <Button
              size="sm"
              className={`bg-[red] px-3 md:px-9 shadow-lg text-xs rounded-sm hover:bg-primary text-white   fixed  right-1/3
              `}
              style={{ zIndex: 50 }}
              onClick={() => {
                handleclose();
              }}
            >
              Close
            </Button>
            <SalesForm
              selectedproduct={selectedproduct}
              setSelectedproduct={setSelectedproduct}
              updateOpen={updateOpen && updateOpen}
              setIsAddProductOpen={setIsAddProductOpen}
              setUpdateOpen={setUpdateOpen}
              isAddProductOpen={addproduct || updateOpen}
            />
          </div>
        </div>
      )}

      <div className="flex  flex-wrap md:space-x-3 items-center py-4 relative space-y-2 md:space-y-0 justify-start md:justify-end">
        {!isAddProductOpen && !updateOpen && (
          <Button
            size="sm"
            className={`bg-primary px-3 md:px-9 shadow-lg text-xs rounded-sm hover:bg-primary text-white   fixed 
              `}
            style={{ zIndex: 50 }}
            onClick={() => {
              setAddproduct && setAddproduct(true);
              // return setIsAddProductOpen && setIsAddProductOpen(true);
            }}
          >
            Add New Sales
          </Button>
        )}

        {/* <div className=" !hidden relative w-[280px]   items-center">
          <Input
            placeholder="Product Name"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event: any) => {
              table.getColumn("name")?.setFilterValue(event.target.value);
            }}
            className="max-w-sm "
          />

          <IoMdClose
            onClick={() => {}}
            size={24}
            className="absolute text-[red] right-2 top-1/2 transform -translate-y-1/2"
          />
          <IoSearch size={24} className=" absolute  right-2  " />
        </div> */}
      </div>

      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="text-primary bg-primary3"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell: any) => (
                        <TableCell key={cell.id} className=" text-xs bg-white">
                          {cell.column.id === "sockStatus" ? (
                            <span
                              className={`rounded-md px-2 py-1 text-xs font-medium
                                
                                
                                 ${
                                   cell.column.id == "Available"
                                     ? ""
                                     : "text-[red]"
                                 }
                                `}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </span>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 bold_text text-center"
                    >
                      No Data Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </>
  );
}
