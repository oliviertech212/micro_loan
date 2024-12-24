"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LaonType } from "@/types/types";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

export const LaonsColumns: (
  setIsOpen: (value: boolean) => void,
  setDeleteOpen: (value: boolean) => void,
  setUpdateOpen: (value: boolean) => void,
  setSelectedloan: (value: LaonType) => void
) => ColumnDef<LaonType>[] = (
  setIsOpen,
  setDeleteOpen,
  setUpdateOpen,
  setSelectedloan
) => [
  {
    accessorKey: "id",
    header: "ID",
  },
  

  // export type LaonType = {
  //   id: number;
  //   name: string;
  //   loanamount: number;
  //   monthlyinocme: number;
  //   userId: number;
  //   owner: UserType;
  //   createdAt: string;
  //   updatedAt: string;
   
  // };
  
 
  // {
  //   accessorKey: "fname",
  //   header: "First name",
  //   cell: ({ row }) => row.original.name ?? "N/A",
  // },
  // {
  //   accessorKey: "lname",
  //   header: "lname",
  //   cell: ({ row }) => row.original.name ?? "N/A",
  // },

  {
    accessorKey: "loanamount",
    header: "Loan Amount",
    cell: ({ row }) => row.original.name ?? "N/A",
  },

  {
    accessorKey: "monthlyinocme",
    header: "Monthly Income",
    cell: ({ row }) => row.original.name ?? "N/A",
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd/MM/yyyy"),
  },
  {
    accessorKey: "owner" ,
    header: "Laon Applicant",
    cell: ({ row }) => row.original.owner.fname ?? "N/A",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.original.status ?? "N/A",
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
              setSelectedloan(event);
              setDeleteOpen(true);
              setDeleteOpen(true);
              setIsOpen(false);
            }}
          />
          {/* <button
            className="text-[red] border-[red] bg-red-100 font-semibold m-1 hover:underline px-3  rounded-md shadow-md p-1 border "
            onClick={() => {
              setSelectedloan(event);
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
              setSelectedloan(event);
              setDeleteOpen(false);
              setUpdateOpen(false);

              setIsOpen(true);
            }}
          />

          <FaEdit
            size={30}
            className="text-[#008CFF] border-[#008CFF] bg-blue-100"
            onClick={() => {
              setSelectedloan(event);
              setUpdateOpen(true);

              setIsOpen(false);
            }}
          />

          {/* <button
            className="text-[#008CFF] border-[#008CFF] bg-blue-100 font-semibold m-1 hover:underline px-3  rounded-md shadow-md p-1 border "
            onClick={() => {
              setSelectedloan(event);
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
