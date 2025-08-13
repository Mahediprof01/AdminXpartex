"use client";

import type { Row, Table, Column } from "@tanstack/react-table";
import React from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Plus,
  Eye,
  Edit,
  Trash,
  ShoppingCart,
} from "lucide-react";
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

const orders = [
  {
    id: "W-ORD001",
    customer: "Acme Wholesale",
    items: 10,
    orderDate: "2024-01-10",
    paymentStatus: "paid",
    shippingStatus: "delivered",
  },
  {
    id: "W-ORD002",
    customer: "BulkMart",
    items: 5,
    orderDate: "2024-01-09",
    paymentStatus: "pending",
    shippingStatus: "processing",
  },
  {
    id: "W-ORD003",
    customer: "Wholesale Direct",
    items: 20,
    orderDate: "2024-01-08",
    paymentStatus: "paid",
    shippingStatus: "shipped",
  },
];

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-700 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "failed":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getShippingStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-700 border-green-200";
    case "shipped":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "processing":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const columns: import("@tanstack/react-table").ColumnDef<any, any>[] = [
  {
    id: "select",
    header: ({ table }: { table: Table<any> }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        className="rounded border-gray-300"
      />
    ),
    cell: ({ row }: { row: Row<any> }) => (
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
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }: { row: Row<any> }) => (
      <div className="font-mono text-sm bg-blue-100 px-2 py-1 rounded text-blue-700">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }: { row: Row<any> }) => (
      <div className="font-medium">{row.getValue("customer")}</div>
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }: { row: Row<any> }) => (
      <Badge
        variant="outline"
        className="bg-blue-50 text-blue-700 border-blue-200"
      >
        {row.getValue("items")} items
      </Badge>
    ),
    footer: ({ table }) => {
      const tableItems = table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => sum + Number(row.getValue("items")), 0);
      return (
        <div className="font-bold text-blue-700 whitespace-nowrap">
          Total: {tableItems} items
        </div>
      );
    },
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }: { row: Row<any> }) => (
      <div className="text-sm text-muted-foreground">
        {new Date(row.getValue("orderDate")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }: { row: Row<any> }) => {
      const status = row.getValue("paymentStatus") as string;
      return (
        <Badge variant="outline" className={getPaymentStatusColor(status)}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "shippingStatus",
    header: "Shipping",
    cell: ({ row }: { row: Row<any> }) => {
      const status = row.getValue("shippingStatus") as string;
      return (
        <Badge variant="outline" className={getShippingStatusColor(status)}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<any> }) => {
      const order = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/orders-wholesale/${order.id}`} className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4 text-blue-500" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/orders-wholesale/${order.id}/edit`}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4 text-green-500" />
                Edit Order
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Cancel Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function OrdersWholesalePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Wholesale Orders
          </h2>
          <p className="text-muted-foreground mt-1">All wholesale orders in the system.</p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
        >
          <Link href="/orders-wholesale/new">
            <Plus className="mr-2 h-4 w-4" />
            Create New Wholesale Order
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-0 p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">All Wholesale Orders</h3>
          <Badge variant="secondary" className="ml-auto">
            {orders.length} total
          </Badge>
        </div>
        <DataTable
          columns={columns}
          data={orders}
          searchKey="customer"
          searchPlaceholder="Search by customer..."
        />
      </div>
    </motion.div>
  );
}
