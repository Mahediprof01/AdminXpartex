"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Eye, Edit, Trash, Undo2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Row, Table, Column } from "@tanstack/react-table";

const returnOrders = [
  {
    id: "RW001",
    vendor: "BulkMart",
    product: "Bulk Rice Bag",
    quantity: 20,
    total: 24000,
    date: "2024-01-10",
    status: "pending",
  },
  {
    id: "RW002",
    vendor: "Wholesale Direct",
    product: "Industrial Cleaning Solution",
    quantity: 10,
    total: 3500,
    date: "2024-01-09",
    status: "approved",
  },
  {
    id: "RW003",
    vendor: "Acme Wholesale",
    product: "Bulk Flour Pack",
    quantity: 5,
    total: 4500,
    date: "2024-01-08",
    status: "delivered",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "approved":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "delivered":
      return "bg-green-100 text-green-700 border-green-200";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const columns: import("@tanstack/react-table").ColumnDef<any, any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        className="rounded border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
        className="rounded border-gray-300"
      />
    ),
  },
  {
    id: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
    footer: ({ table }) => {
      return (
        <div className="font-bold text-gray-700 whitespace-nowrap">Total</div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Return ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm bg-cyan-100 px-2 py-1 rounded text-cyan-700">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("vendor")}</div>
    ),
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <div className="text-sm">{row.getValue("product")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "QTY",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("quantity")} units</div>
    ),
    footer: ({ table }) => {
      const totalQty = table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => sum + Number(row.getValue("quantity")), 0);
      return (
        <div className="font-bold text-gray-700 whitespace-nowrap ">
          {totalQty} units
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total = Number(row.getValue("total"));
      return <div className="font-semibold text-gray-700">{total} BDT</div>;
    },
    footer: ({ table }) => {
      const grandTotal = table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => sum + Number(row.getValue("total")), 0);
      return (
        <div className="font-bold text-gray-700 whitespace-nowrap">
          {grandTotal} BDT
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const dateValue = row.getValue("date");
      let formatted = "";
      if (
        typeof dateValue === "string" ||
        typeof dateValue === "number" ||
        dateValue instanceof Date
      ) {
        const d = new Date(dateValue);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        formatted = `${dd}/${mm}/${yyyy}`;
      }
      return <div className="text-sm text-muted-foreground">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant="outline" className={getStatusColor(status)}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-cyan-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                href={`/return-wholesale/${order.id}`}
                className="cursor-pointer"
              >
                <Eye className="mr-2 h-4 w-4 text-blue-500" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/return-wholesale/update/${order.id}`}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4 text-green-500" />
                Edit Return
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Cancel Return
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ReturnWholesalePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"></h2>
          <p className="text-muted-foreground mt-1"></p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg"
        >
          <Link href="/return-wholesale/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Wholesale Return Order
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-0 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Undo2 className="h-5 w-5 text-cyan-500" />
          <h3 className="text-lg font-semibold">All Wholesale Return Orders</h3>
          <Badge variant="secondary" className="ml-auto">
            {returnOrders.length} total
          </Badge>
        </div>
        <DataTable
          columns={columns}
          data={returnOrders}
          searchKey="vendor"
          searchPlaceholder="Search by vendor..."
        />
      </div>
    </motion.div>
  );
}
