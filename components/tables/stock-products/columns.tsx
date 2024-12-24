"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StockProductType } from "@/types/types";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

export const StockProductColumns: (
  setIsOpen: (value: boolean) => void,
  setDeleteOpen: (value: boolean) => void,
  setUpdateOpen: (value: boolean) => void,
  setSelectedproduct: (value: StockProductType) => void
) => ColumnDef<StockProductType>[] = (
  setIsOpen,
  setDeleteOpen,
  setUpdateOpen,
  setSelectedproduct
) => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "productImage",
    header: "Image",
    cell: ({ row }) =>
      row.original.productImage ? (
        <Image
          src={row.original.productImage}
          alt="Product"
          width={50}
          height={50}
        />
      ) : (
        "No Image"
      ),
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => row.original.name ?? "N/A",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) =>
      (row.original.description?.length > 30
        ? row.original.description.slice(0, 30) + "..."
        : row.original.description) ?? "N/A",
  },
  {
    accessorKey: "price",
    header: "Price (Rwf)",
    cell: ({ row }) => row.original.price.toFixed(2),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => row.original.quantity,
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost (Rwf)",
    cell: ({ row }) => row.original.totalCost.toFixed(2),
  },
  {
    accessorKey: "stockStatus",
    header: "Status",
    cell: ({ row }) => row.original.sockStatus,
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      const event = row.original;

      return (
        <div className=" flex justify-between">
          <MdDelete
            size={30}
            className="text-[red] border-[red] "
            onClick={() => {
              setSelectedproduct(event);
              setDeleteOpen(true);
              setDeleteOpen(true);
              setIsOpen(false);
            }}
          />
          {/* <button
            className="text-[red] border-[red] bg-red-100 font-semibold m-1 hover:underline px-3  rounded-md shadow-md p-1 border "
            onClick={() => {
              setSelectedproduct(event);
              setDeleteOpen(true);
              setDeleteOpen(true);
              setIsOpen(false);
            }}
          >
            Remove
          </button> */}
          {/* <button
           
          >
            Details
          </button> */}

          <FaEye
            size={30}
            className="text-[#008CFF] border-[#008CFF] bg-blue-100  "
            onClick={() => {
              setSelectedproduct(event);
              setDeleteOpen(false);
              setUpdateOpen(false);

              setIsOpen(true);
            }}
          />

          <FaEdit
            size={30}
            className="text-[#008CFF] border-[#008CFF] bg-blue-100"
            onClick={() => {
              setSelectedproduct(event);
              setUpdateOpen(true);

              setIsOpen(false);
            }}
          />

          {/* <button
            className="text-[#008CFF] border-[#008CFF] bg-blue-100 font-semibold m-1 hover:underline px-3  rounded-md shadow-md p-1 border "
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
