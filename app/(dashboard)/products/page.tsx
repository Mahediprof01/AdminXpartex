"use client"

import type { Row, Table, Column } from "@tanstack/react-table"
import type { Product } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Eye, Edit, Trash, Package } from "lucide-react"
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
import { useProductStore } from "@/lib/store"

export default function ProductsPage() {
  const { products, deleteProduct } = useProductStore()

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
    }
  }

  const filterOptions = [
    {
      key: "category",
      label: "Category",
      options: [
        { label: "Electronics", value: "Electronics" },
        { label: "Appliances", value: "Appliances" },
        { label: "Home & Garden", value: "Home & Garden" },
        { label: "Fashion", value: "Fashion" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ]

  const columns: import("@tanstack/react-table").ColumnDef<Product, any>[] = [
    {
      id: "select",
  header: ({ table }: { table: Table<Product> }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
          className="rounded border-gray-300"
        />
      ),
  cell: ({ row }: { row: Row<Product> }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
          className="rounded border-gray-300"
        />
      ),
    },
    {
      accessorKey: "id",
      header: "Product ID",
      cell: ({ row }) => (
        <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded max-w-[100px] truncate">
          {row.getValue("id")}
        </div>
      ),
    },
    {
      accessorKey: "name",
  header: ({ column }: { column: Column<Product, unknown> }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Product Name
          </Button>
        )
      },
  cell: ({ row }: { row: Row<Product> }) => (
        <Link
          href={`/products/${row.original.id}`}
          className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer block max-w-[150px] sm:max-w-[200px] md:max-w-[300px] truncate"
        >
          {row.getValue("name")}
        </Link>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 whitespace-nowrap">
          {row.getValue("category")}
        </Badge>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
  cell: ({ row }: { row: Row<Product> }) => {
        const price = Number.parseFloat(row.getValue("price"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price)
        return <div className="font-semibold text-green-600 whitespace-nowrap">{formatted}</div>
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
  cell: ({ row }: { row: Row<Product> }) => {
        const stock = row.getValue("stock") as number
        return (
          <div
            className={`font-medium whitespace-nowrap ${
              stock === 0 ? "text-red-500" : stock < 50 ? "text-orange-500" : "text-green-600"
            }`}
          >
            {stock} units
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
  cell: ({ row }: { row: Row<Product> }) => {
        const status = row.getValue("status")
        return (
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className={status === "active" ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}
          >
            {String(status)}
          </Badge>
        )
      },
    },
    {
      id: "actions",
  cell: ({ row }: { row: Row<Product> }) => {
        const product = row.original

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
                <Link href={`/products/${product.id}`} className="cursor-pointer">
                  <Eye className="mr-2 h-4 w-4 text-blue-500" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/products/${product.id}/edit`} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4 text-green-500" />
                  Edit Product
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer focus:text-red-600"
                onClick={() => handleDelete(product.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

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
            Products Management
          </h2>
          <p className="text-muted-foreground mt-1">Manage your product inventory and details</p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg whitespace-nowrap"
        >
          <Link href="/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-semibold">All Products</h3>
          <Badge variant="secondary" className="ml-auto">
            {products.length} total
          </Badge>
        </div>
        <DataTable
          columns={columns}
          data={products}
          searchKey="name"
          searchPlaceholder="Search products..."
          filterOptions={filterOptions}
        />
      </div>
    </motion.div>
  )
}
