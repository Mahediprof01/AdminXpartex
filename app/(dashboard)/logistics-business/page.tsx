
"use client"

import type { Row, Table, Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Eye, Edit, Trash, Package } from "lucide-react";
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

type LogisticsOrder = {
  id: string;
  orderId: string;
  customer: string;
  partner: string;
  status: string;
  transactionId: string;
  completed: boolean;
  createdAt: string;
};

const filterOptions = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Pending", value: "Pending" },
      { label: "In Transit", value: "In Transit" },
      { label: "Delivered", value: "Delivered" },
    ],
  },
  {
    key: "partner",
    label: "Partner",
    options: [
      { label: "DHL", value: "DHL" },
      { label: "FedEx", value: "FedEx" },
      { label: "UPS", value: "UPS" },
    ],
  },
];

const columns: import("@tanstack/react-table").ColumnDef<LogisticsOrder, any>[] = [
  {
    id: "select",
    header: ({ table }: { table: Table<LogisticsOrder> }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        className="rounded border-gray-300"
      />
    ),
    cell: ({ row }: { row: Row<LogisticsOrder> }) => (
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
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded max-w-[100px] truncate">
        {row.getValue("orderId")}
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <span className="font-medium block max-w-[150px] truncate">{row.getValue("customer")}</span>
    ),
  },
  {
    accessorKey: "partner",
    header: "Partner",
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 whitespace-nowrap">
        {row.getValue("partner")}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          variant={status === "Delivered" ? "default" : "secondary"}
          className={status === "Delivered" ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}
        >
          {String(status)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs bg-gray-50 px-2 py-1 rounded max-w-[100px] truncate">{row.getValue("transactionId")}</span>
    ),
  },
  {
    accessorKey: "completed",
    header: "Completed",
    cell: ({ row }) => (row.original.completed ? "Yes" : "No"),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<LogisticsOrder> }) => {
      const order = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-purple-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/logistics/${order.id}`} className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4 text-blue-500" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/logistics/${order.id}/edit`} className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4 text-green-500" />
                Edit Order
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Delete Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function LogisticsPage() {
  // Dummy data for now
  const data: LogisticsOrder[] = [
    {
      id: "1",
      orderId: "ORD-001",
      customer: "John Doe",
      partner: "DHL",
      status: "In Transit",
      transactionId: "TXN-12345",
      completed: false,
      createdAt: "2025-08-12",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-4 md:p-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            
          </h2>
          <p className="text-muted-foreground mt-1"> </p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg whitespace-nowrap"
        >
          <Link href="/logistics-business/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Order
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-semibold">All Logistics Orders</h3>
          <Badge variant="secondary" className="ml-auto">
            {data.length} total
          </Badge>
        </div>
        <DataTable
          columns={columns}
          data={data}
          searchKey="customer"
          searchPlaceholder="Search logistics orders..."
          filterOptions={filterOptions}
        />
      </div>
    </motion.div>
  );
}
