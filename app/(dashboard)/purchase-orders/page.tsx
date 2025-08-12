"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Eye, Edit, Trash, ShoppingBag } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { motion } from "framer-motion"

import type { Row, Table, Column } from "@tanstack/react-table"
import type { PurchaseOrder } from "@/lib/store"

const purchaseOrders = [
  {
    id: "PO001",
    vendor: "TechCorp Solutions",
    product: "Wireless Headphones",
    quantity: 100,
    price: 75.0,
    total: 7500.0,
    date: "2024-01-15",
    status: "pending",
  },
  {
    id: "PO002",
    vendor: "Global Electronics",
    product: "Smart Watch",
    quantity: 50,
    price: 250.0,
    total: 12500.0,
    date: "2024-01-14",
    status: "approved",
  },
  {
    id: "PO003",
    vendor: "Home Appliances Co",
    product: "Coffee Maker",
    quantity: 25,
    price: 120.0,
    total: 3000.0,
    date: "2024-01-13",
    status: "delivered",
  },
  {
    id: "PO004",
    vendor: "Fashion Forward",
    product: "Designer Bag",
    quantity: 30,
    price: 180.0,
    total: 5400.0,
    date: "2024-01-12",
    status: "cancelled",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "approved":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "delivered":
      return "bg-green-100 text-green-700 border-green-200"
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const columns: import("@tanstack/react-table").ColumnDef<PurchaseOrder, any>[] = [
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
  },
  {
    accessorKey: "id",
    header: "Purchase ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm bg-orange-100 px-2 py-1 rounded text-orange-700">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
    cell: ({ row }: { row: Row<PurchaseOrder> }) => <div className="font-medium">{row.getValue("vendor")}</div>,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }: { row: Row<PurchaseOrder> }) => <div className="text-sm">{row.getValue("product")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "QTY",
    cell: ({ row }: { row: Row<PurchaseOrder> }) => <div className="font-medium">{row.getValue("quantity")} units</div>,
  },
  {
    accessorKey: "price",
    header: "Unit Price",
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total = Number.parseFloat(row.getValue("total"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(total)
      return <div className="font-semibold text-green-600">{formatted}</div>
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      // Format date as yyyy-MM-dd to avoid hydration mismatch
      const dateValue = row.getValue("date");
      let formatted = "";
      if (typeof dateValue === "string" || typeof dateValue === "number" || dateValue instanceof Date) {
        const d = new Date(dateValue);
        // Pad month and day for consistent output
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        formatted = `${dd}/${mm}/${yyyy}`;
      }
      return <div className="text-sm text-muted-foreground">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant="outline" className={getStatusColor(status)}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-orange-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/purchase-orders/${order.id}`} className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4 text-blue-500" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/purchase-orders/${order.id}/edit`} className="cursor-pointer">
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
      )
    },
  },
]

export default function PurchaseOrdersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            
          </h2>
          <p className="text-muted-foreground mt-1"> </p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
        >
          <Link href="/purchase-orders/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Purchase Order
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-0 p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-semibold">All Purchase Orders</h3>
          <Badge variant="secondary" className="ml-auto">
            {purchaseOrders.length} total
          </Badge>
        </div>
  <DataTable columns={columns} data={purchaseOrders as PurchaseOrder[]} searchKey="vendor" searchPlaceholder="Search by vendor..." />
      </div>
    </motion.div>
  )
}
