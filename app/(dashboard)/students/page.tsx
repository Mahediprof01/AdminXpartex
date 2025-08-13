"use client";

import type { ColumnDef } from "@tanstack/react-table";
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
  UserCheck,
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

type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrollmentDate: string;
  coursesEnrolled: number;
  status: "active" | "inactive";
};

// Sample student data
const students: Student[] = [
  {
    id: "STU001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+880123456789",
    enrollmentDate: "2024-01-10",
    coursesEnrolled: 3,
    status: "active",
  },
  {
    id: "STU002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+880987654321",
    enrollmentDate: "2024-02-05",
    coursesEnrolled: 5,
    status: "active",
  },
  {
    id: "STU003",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+880112233445",
    enrollmentDate: "2024-03-12",
    coursesEnrolled: 2,
    status: "inactive",
  },
];

const filterOptions = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
  {
    key: "coursesEnrolled",
    label: "Courses Enrolled",
    options: [
      { label: "1-2 Courses", value: "1-2" },
      { label: "3-5 Courses", value: "3-5" },
      { label: "6+ Courses", value: "6+" },
    ],
  },
];

// Badge color based on student status
const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700 border-green-200";
    case "inactive":
      return "bg-red-100 text-red-700 border-red-200";
  }
};

const columns: ColumnDef<Student>[] = [
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
    header: "Student ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm bg-blue-100 px-2 py-1 rounded text-blue-700">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.getValue("phone")}
      </div>
    ),
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
    accessorKey: "coursesEnrolled",
    header: "Courses",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="bg-blue-50 text-blue-700 border-blue-200"
      >
        {row.getValue("coursesEnrolled")} courses
      </Badge>
    ),
    footer: ({ table }) => {
      const totalCourses = table
        .getFilteredRowModel()
        .rows.reduce(
          (sum, row) => sum + Number(row.getValue("coursesEnrolled")),
          0
        );
      return (
        <div className="font-bold text-gray-700 whitespace-nowrap">
          {totalCourses} courses
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant="outline" className={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
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
              <Link href={`/students/${student.id}`} className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4 text-blue-500" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/students/${student.id}/edit`}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4 text-green-500" />
                Edit Student
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function StudentsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"></h2>
          <p className="text-muted-foreground mt-1"></p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
        >
          <Link href="/students/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Student
          </Link>
        </Button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserCheck className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold"> All Students</h3>
          <Badge variant="secondary" className="ml-auto">
            {students.length} total
          </Badge>
        </div>
        <DataTable
          columns={columns}
          data={students}
          filterOptions={filterOptions}
          searchKey="name"
          searchPlaceholder="Search by student name..."
          rowClassName={(row) =>
            row.original.status === "inactive"
              ? "opacity-50 pointer-events-none"
              : ""
          }
        />
      </div>
    </motion.div>
  );
}
