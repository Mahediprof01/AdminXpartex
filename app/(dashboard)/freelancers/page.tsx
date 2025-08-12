"use client"

// Filter options for DataTable
const filterOptions = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Available", value: "available" },
      { label: "Busy", value: "busy" },
      { label: "Inactive", value: "inactive" },
    ],
  },
  {
    key: "skills",
    label: "Skills",
    options: [
      { label: "React, Node.js, TypeScript", value: "React, Node.js, TypeScript" },
      { label: "UI/UX Design, Figma", value: "UI/UX Design, Figma" },
      { label: "Python, Django, AWS", value: "Python, Django, AWS" },
      { label: "Content Writing, SEO", value: "Content Writing, SEO" },
    ],
  },
  {
    key: "name",
    label: "Name",
    options: [
      { label: "Alex Thompson", value: "Alex Thompson" },
      { label: "Maria Garcia", value: "Maria Garcia" },
      { label: "David Chen", value: "David Chen" },
      { label: "Sophie Miller", value: "Sophie Miller" },
    ],
  },
  {
    key: "rating",
    label: "Rating",
    options: [
      { label: "4.9", value: "4.9" },
      { label: "4.8", value: "4.8" },
      { label: "4.7", value: "4.7" },
      { label: "4.6", value: "4.6" },
    ],
  },
];

import type { Row, Table, Column } from "@tanstack/react-table"
import type { Freelancer } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Eye, Edit, Trash, UserCheck } from "lucide-react"
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

const freelancers = [
  {
    id: "FRLNC001",
    name: "Alex Thompson",
    email: "alex@example.com",
    skills: "React, Node.js, TypeScript",
    rating: 4.9,
    projects: 23,
    status: "available",
    hourlyRate: 85,
    joinedDate: "2024-01-15",
  },
  {
    id: "FRLNC002",
    name: "Maria Garcia",
    email: "maria@example.com",
    skills: "UI/UX Design, Figma",
    rating: 4.8,
    projects: 18,
    status: "busy",
    hourlyRate: 75,
    joinedDate: "2024-01-14",
  },
  {
    id: "FRLNC003",
    name: "David Chen",
    email: "david@example.com",
    skills: "Python, Django, AWS",
    rating: 4.7,
    projects: 31,
    status: "available",
    hourlyRate: 90,
    joinedDate: "2024-01-13",
  },
  {
    id: "FRLNC004",
    name: "Sophie Miller",
    email: "sophie@example.com",
    skills: "Content Writing, SEO",
    rating: 4.6,
    projects: 12,
    status: "inactive",
    hourlyRate: 45,
    joinedDate: "2024-01-12",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-700 border-green-200"
    case "busy":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "inactive":
      return "bg-gray-100 text-gray-700 border-gray-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const columns: import("@tanstack/react-table").ColumnDef<Freelancer, any>[] = [
  {
    id: "select",
    header: ({ table }: { table: Table<Freelancer> }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        className="rounded border-gray-300"
      />
    ),
    cell: ({ row }: { row: Row<Freelancer> }) => (
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
    header: "Freelancer ID",
  cell: ({ row }: { row: Row<Freelancer> }) => (
      <div className="font-mono text-sm bg-teal-100 px-2 py-1 rounded text-teal-700">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  cell: ({ row }: { row: Row<Freelancer> }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
  cell: ({ row }: { row: Row<Freelancer> }) => <div className="text-sm text-muted-foreground">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "skills",
    header: "Skills",
  cell: ({ row }: { row: Row<Freelancer> }) => <div className="text-sm max-w-xs truncate">{row.getValue("skills")}</div>,
  },
  {
    accessorKey: "rating",
    header: "Rating",
  cell: ({ row }: { row: Row<Freelancer> }) => (
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">★</span>
        <span className="font-medium">{row.getValue("rating")}</span>
      </div>
    ),
  },
  {
    accessorKey: "projects",
    header: "Projects",
  cell: ({ row }: { row: Row<Freelancer> }) => (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        {row.getValue("projects")} completed
      </Badge>
    ),
  },
  {
    accessorKey: "hourlyRate",
    header: "Rate",
  cell: ({ row }: { row: Row<Freelancer> }) => <div className="font-semibold text-green-600">${row.getValue("hourlyRate")}/hr</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
  cell: ({ row }: { row: Row<Freelancer> }) => {
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
  cell: ({ row }: { row: Row<Freelancer> }) => {
      const freelancer = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-teal-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/freelancers/${freelancer.id}`} className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4 text-blue-500" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/freelancers/${freelancer.id}/edit`} className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4 text-green-500" />
                Edit Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Remove Freelancer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function FreelancersPage() {
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
          <Link href="/freelancers/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserCheck className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-semibold flex items-center gap-2">
            All Freelancers
            <span className="ml-2 text-sm text-gray-500">(
              <span className="font-semibold text-green-600">{freelancers.length}</span> freelancers
            )</span>
          </h3>
        </div>
        <DataTable columns={columns} data={freelancers as Freelancer[]} searchKey="name" searchPlaceholder="Search freelancers..." filterOptions={filterOptions} />
      </div>
    </motion.div>
  )
}
