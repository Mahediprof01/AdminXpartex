"use client"

import type { Row, Table, Column } from "@tanstack/react-table"
import type { Job } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Eye, Edit, Trash, Briefcase } from "lucide-react"
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

const jobs = [
  {
    id: "JOB001",
    title: "Senior React Developer",
    company: "TechCorp Solutions",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000",
    status: "active",
    applicants: 45,
    postedDate: "2024-01-15",
  },
  {
    id: "JOB002",
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "New York, NY",
    type: "Contract",
    salary: "$80/hour",
    status: "active",
    applicants: 23,
    postedDate: "2024-01-14",
  },
  {
    id: "JOB003",
    title: "Product Manager",
    company: "StartupXYZ",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140,000",
    status: "closed",
    applicants: 67,
    postedDate: "2024-01-10",
  },
  {
    id: "JOB004",
    title: "DevOps Engineer",
    company: "CloudTech Inc",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000",
    status: "active",
    applicants: 34,
    postedDate: "2024-01-12",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700 border-green-200"
    case "closed":
      return "bg-red-100 text-red-700 border-red-200"
    case "draft":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Full-time":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "Part-time":
      return "bg-purple-100 text-purple-700 border-purple-200"
    case "Contract":
      return "bg-orange-100 text-orange-700 border-orange-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const columns: import("@tanstack/react-table").ColumnDef<Job, any>[] = [
  {
    id: "select",
    header: ({ table }: { table: Table<Job> }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        className="rounded border-gray-300"
      />
    ),
    cell: ({ row }: { row: Row<Job> }) => (
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
    header: "Job ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm bg-indigo-100 px-2 py-1 rounded text-indigo-700">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Job Title",
  cell: ({ row }: { row: Row<Job> }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "company",
    header: "Company",
  cell: ({ row }: { row: Row<Job> }) => <div className="text-sm">{row.getValue("company")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
  cell: ({ row }: { row: Row<Job> }) => <div className="text-sm text-muted-foreground">{row.getValue("location")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
  cell: ({ row }: { row: Row<Job> }) => {
      const type = row.getValue("type") as string
      return (
        <Badge variant="outline" className={getTypeColor(type)}>
          {type}
        </Badge>
      )
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
  cell: ({ row }: { row: Row<Job> }) => <div className="font-semibold text-green-600">{row.getValue("salary")}</div>,
  },
  {
    accessorKey: "applicants",
    header: "Applicants",
  cell: ({ row }: { row: Row<Job> }) => (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        {row.getValue("applicants")} applied
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
  cell: ({ row }: { row: Row<Job> }) => {
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
  cell: ({ row }: { row: Row<Job> }) => {
      const job = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-indigo-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/jobs/${job.id}`} className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4 text-blue-500" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/jobs/${job.id}/edit`} className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4 text-green-500" />
                Edit Job
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Delete Job
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function JobsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Jobs Management
          </h2>
          <p className="text-muted-foreground mt-1">Manage job postings and track applications</p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg"
        >
          <Link href="/jobs/new">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-0 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5 text-indigo-500" />
          <h3 className="text-lg font-semibold">All Job Postings</h3>
          <Badge variant="secondary" className="ml-auto">
            {jobs.length} total
          </Badge>
        </div>
  <DataTable columns={columns} data={jobs as Job[]} searchKey="title" searchPlaceholder="Search jobs..." />
      </div>
    </motion.div>
  )
}
