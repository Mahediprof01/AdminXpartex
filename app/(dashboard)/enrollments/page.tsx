"use client";

import type { Row, Table } from "@tanstack/react-table";
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
  GraduationCap,
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

const enrollments = [
  {
    id: "ENR-001",
    studentName: "John Doe",
    studentEmail: "john@example.com",
    courseName: "React for Beginners",
    enrollmentDate: "2025-07-10",
    progress: 45,
    status: "active",
    paymentStatus: "paid",
  },
  {
    id: "ENR-002",
    studentName: "Jane Smith",
    studentEmail: "jane@example.com",
    courseName: "Advanced JavaScript",
    enrollmentDate: "2025-07-15",
    progress: 100,
    status: "completed",
    paymentStatus: "paid",
  },
  {
    id: "ENR-003",
    studentName: "Mike Johnson",
    studentEmail: "mike@example.com",
    courseName: "UI/UX Design Basics",
    enrollmentDate: "2025-07-20",
    progress: 10,
    status: "pending",
    paymentStatus: "pending",
  },
];

const filterOptions = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Completed", value: "completed" },
      { label: "Pending", value: "pending" },
      { label: "Dropped", value: "dropped" },
    ],
  },
  {
    key: "paymentStatus",
    label: "Payment Status",
    options: [
      { label: "Paid", value: "paid" },
      { label: "Pending", value: "pending" },
      { label: "Failed", value: "failed" },
    ],
  },
  {
    key: "courseName",
    label: "Course Name",
    options: [
      { label: "React for Beginners", value: "React for Beginners" },
      { label: "Advanced JavaScript", value: "Advanced JavaScript" },
      { label: "UI/UX Design Basics", value: "UI/UX Design Basics" },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700 border-green-200";
    case "completed":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "dropped":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

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
    header: "Enrollment ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm bg-purple-100 px-2 py-1 rounded text-purple-700">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "studentName",
    header: "Student Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("studentName")}</div>
    ),
  },
  {
    accessorKey: "studentEmail",
    header: "Student Email",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.getValue("studentEmail")}
      </div>
    ),
  },
  {
    accessorKey: "courseName",
    header: "Course Name",
    cell: ({ row }) => <div>{row.getValue("courseName")}</div>,
  },
  {
    accessorKey: "enrollmentDate",
    header: "Enrollment Date",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {new Date(row.getValue("enrollmentDate")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="bg-blue-50 text-blue-700 border-blue-200"
      >
        {row.getValue("progress")}% Complete
      </Badge>
    ),
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
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as string;
      return (
        <Badge variant="outline" className={getPaymentStatusColor(status)}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<any> }) => {
      const enrollment = row.original;
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
              <Link href={`/enrollments/${enrollment.id}`}>
                <Eye className="mr-2 h-4 w-4 text-blue-500" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/enrollments/update/${enrollment.id}`}>
                <Edit className="mr-2 h-4 w-4 text-green-500" />
                Edit Enrollment
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer">
              <Trash className="mr-2 h-4 w-4" />
              Remove Enrollment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function EnrollmentsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6"
    >
      <div className="flex items-center justify-between">
        <div></div>
        <Button
          asChild
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
        >
          <Link href="/enrollments/new">
            <Plus className="mr-2 h-4 w-4" />
            New Enrollment
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-0 p-6">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="h-5 w-5 text-purple-500" />
          <h3 className="text-lg font-semibold">All Enrollments</h3>
          <Badge variant="secondary" className="ml-auto">
            {enrollments.length} total
          </Badge>
        </div>
        <DataTable
          columns={columns}
          data={enrollments}
          searchKey="studentName"
          searchPlaceholder="Search by student name..."
          filterOptions={filterOptions}
        />
      </div>
    </motion.div>
  );
}
