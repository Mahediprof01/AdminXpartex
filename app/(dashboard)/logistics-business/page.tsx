
"use client"

import React from "react"
import type { Row, Table, Column } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Eye, Edit, Trash, Truck } from "lucide-react"
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

// Dummy data for logistics companies
const logisticsCompanies = [
  {
    id: "LOG001",
    name: "FastTrack Logistics",
    email: "contact@fasttrack.com",
    phone: "+1 (555) 111-2222",
    address: "789 Logistics Blvd, Dallas, TX",
    description: "Specialized in nationwide express delivery services.",
    status: "active",
  },
  {
    id: "LOG002",
    name: "Global Movers",
    email: "info@globalmovers.com",
    phone: "+1 (555) 333-4444",
    address: "321 Cargo Lane, Miami, FL",
    description: "International shipping and freight forwarding.",
    status: "inactive",
  },
]

type LogisticsCompany = typeof logisticsCompanies[number]

export default function LogisticsBusinessPage() {
  // In a real app, replace with zustand or API data
  const [companies, setCompanies] = React.useState<LogisticsCompany[]>(logisticsCompanies)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this logistics company?")) {
      setCompanies((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ]

  const columns: import("@tanstack/react-table").ColumnDef<LogisticsCompany, any>[] = [
    {
      id: "select",
      header: ({ table }: { table: Table<LogisticsCompany> }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
          className="rounded border-gray-300"
        />
      ),
      cell: ({ row }: { row: Row<LogisticsCompany> }) => (
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
      header: "Logistics ID",
      cell: ({ row }) => (
        <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded max-w-[100px] truncate">
          {row.getValue("id")}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }: { column: Column<LogisticsCompany, unknown> }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Company Name</Button>
        )
      },
      cell: ({ row }: { row: Row<LogisticsCompany> }) => (
        <Link
          href={`/logistics-business/${row.original.id}`}
          className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer block max-w-[150px] sm:max-w-[200px] md:max-w-[300px] truncate"
        >
          {row.getValue("name")}
        </Link>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-gray-700">{row.getValue("email")}</span>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <span className="text-sm text-gray-700">{row.getValue("phone")}</span>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
        <span className="text-xs text-gray-500 max-w-[180px] block truncate">{row.getValue("address")}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <span className="text-xs text-gray-500 max-w-[180px] block truncate">{row.getValue("description")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: Row<LogisticsCompany> }) => {
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
      cell: ({ row }: { row: Row<LogisticsCompany> }) => {
        const company = row.original
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
                <Link href={`/logistics-business/${company.id}`} className="cursor-pointer">
                  <Eye className="mr-2 h-4 w-4 text-blue-500" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/logistics-business/${company.id}/edit`} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4 text-green-500" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer focus:text-red-600"
                onClick={() => handleDelete(company.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
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
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Logistics Business
          </h2>
          <p className="text-muted-foreground mt-1">Manage all logistics companies in the system.</p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg whitespace-nowrap"
        >
          <Link href="/logistics-business/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Logistics Company
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Truck className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">All Logistics Companies</h3>
          <Badge variant="secondary" className="ml-auto">
            {companies.length} total
          </Badge>
        </div>
        <DataTable
          columns={columns}
          data={companies}
          searchKey="name"
          searchPlaceholder="Search logistics companies..."
          filterOptions={filterOptions}
        />
      </div>
    </motion.div>
  )
}
