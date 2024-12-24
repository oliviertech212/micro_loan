"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SaleType, StockProductType } from "@/types/types";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

export const SalesProductColumns: (
  setIsOpen: (value: boolean) => void,
  setDeleteOpen: (value: boolean) => void,
  setUpdateOpen: (value: boolean) => void,
  setSelectedproduct: (value: SaleType) => void
) => ColumnDef<SaleType>[] = (
  setIsOpen,
  setDeleteOpen,
  setUpdateOpen,
  setSelectedproduct
) => [
  {
    accessorKey: "product",
    header: "Product Details",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.product && (
          <Image
            src={row.original.product.productImage ?? ""}
            alt="Product"
            width={50}
            height={50}
            className="mr-2"
          />
        )}
        <div>
          <div>{row.original.product.name ?? "N/A"}</div>
          <div>{row.original.product.price.toFixed(2)} Rwf</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price (Rwf)",
    cell: ({ row }) => row.original.totalPrice.toFixed(2),
  },
  {
    accessorKey: "dateSold",
    header: "Date Sold",
    cell: ({ row }) => format(new Date(row.original.soldAt), "dd/MM/yyyy"),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => row.original.quantity,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      const event = row.original;

      return (
        <div className="flex justify-between">
          <MdDelete
            size={30}
            className="text-[red] border-[red]"
            onClick={() => {
              setSelectedproduct(event);
              setDeleteOpen(true);
              setIsOpen(false);
            }}
          />
          {/* <FaEye
            size={30}
            className="text-[#008CFF] border-[#008CFF] bg-blue-100"
            onClick={() => {
              setSelectedproduct(event);
              setDeleteOpen(false);
              setUpdateOpen(false);
              setIsOpen(true);
            }}
          /> */}
          {/* <FaEdit
            size={30}
            className="text-[#008CFF] border-[#008CFF] bg-blue-100"
            onClick={() => {
              setSelectedproduct(event);
              setUpdateOpen(true);
              setIsOpen(false);
            }}
          /> */}
          {/* <button
            className="text-[#008CFF] border-[#008CFF] bg-blue-100 font-semibold m-1 hover:underline px-3 rounded-md shadow-md p-1 border"
            onClick={() => {
              setSelectedproduct(event);
              setUpdateOpen(true);
              setIsOpen(false);
            }}
          >
            Update
          </button> */}
        </div>
      );
    },
  },
];
