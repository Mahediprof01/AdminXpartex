"use client";

// Filter options for DataTable
const filterOptions = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Published", value: "published" },
      { label: "Draft", value: "draft" },
      { label: "Archived", value: "archived" },
    ],
  },
  {
    key: "category",
    label: "Category",
    options: [
      { label: "Business", value: "Business" },
      { label: "Technology", value: "Technology" },
      { label: "Marketing", value: "Marketing" },
    ],
  },
  {
    key: "author",
    label: "Author",
    options: [
      { label: "John Smith", value: "John Smith" },
      { label: "Sarah Johnson", value: "Sarah Johnson" },
      { label: "Mike Davis", value: "Mike Davis" },
      { label: "Lisa Wilson", value: "Lisa Wilson" },
    ],
  },
];
import type { Row, Table, Column } from "@tanstack/react-table";
import type { Blog } from "@/lib/store";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Eye, Edit, Trash, FileText } from "lucide-react";
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

const blogs = [
  {
    id: "BLOG001",
    title: "10 Tips for E-commerce Success",
    author: "John Smith",
    category: "Business",
    status: "published",
    views: 1250,
    publishedDate: "2024-01-15",
  },
  {
    id: "BLOG002",
    title: "The Future of Online Shopping",
    author: "Sarah Johnson",
    category: "Technology",
    status: "published",
    views: 890,
    publishedDate: "2024-01-14",
  },
  {
    id: "BLOG003",
    title: "Building Customer Loyalty",
    author: "Mike Davis",
    category: "Marketing",
    status: "draft",
    views: 0,
    publishedDate: "2024-01-13",
  },
  {
    id: "BLOG004",
    title: "Mobile Commerce Trends 2024",
    author: "Lisa Wilson",
    category: "Technology",
    status: "published",
    views: 2100,
    publishedDate: "2024-01-12",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-700 border-green-200";
    case "draft":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "archived":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Business":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Technology":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "Marketing":
      return "bg-orange-100 text-orange-700 border-orange-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const columns: import("@tanstack/react-table").ColumnDef<Blog, any>[] = [
  {
    id: "select",
    header: ({ table }: { table: Table<Blog> }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        className="rounded border-gray-300"
      />
    ),
    cell: ({ row }: { row: Row<Blog> }) => (
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
    header: "News ID",
    cell: ({ row }: { row: Row<Blog> }) => (
      <div className="font-mono text-sm bg-pink-100 px-2 py-1 rounded text-pink-700">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }: { row: Row<Blog> }) => (
      <div className="font-medium max-w-xs truncate">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }: { row: Row<Blog> }) => (
      <div className="text-sm">{row.getValue("author")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }: { row: Row<Blog> }) => {
      const category = row.getValue("category") as string;
      return (
        <Badge variant="outline" className={getCategoryColor(category)}>
          {category}
        </Badge>
      );
    },
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }: { row: Row<Blog> }) => (
      <div className="font-medium">
        {(row.getValue("views") as number).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "publishedDate",
    header: "Published",
    cell: ({ row }: { row: Row<Blog> }) => (
      <div className="text-sm text-muted-foreground">
        {new Date(row.getValue("publishedDate")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<Blog> }) => {
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
    cell: ({ row }: { row: Row<Blog> }) => {
      const blog = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-pink-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/blogs/${blog.id}`} className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4 text-blue-500" />
                View Post
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/blogs/${blog.id}/edit`} className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4 text-green-500" />
                Edit Post
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Delete Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function BlogsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-4 md:p-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"></h2>
          <p className="text-muted-foreground mt-1"> </p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg whitespace-nowrap"
        >
          <Link href="/news/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold flex items-center gap-2">
            All News Posts
            <span className="ml-2 text-sm text-gray-500">
              (
              <span className="font-semibold text-blue-600">
                {blogs.length}
              </span>{" "}
              blogs )
            </span>
          </h3>
        </div>
        <DataTable
          columns={columns}
          data={blogs as Blog[]}
          searchKey="title"
          searchPlaceholder="Search blogs..."
          filterOptions={filterOptions}
        />
      </div>
    </motion.div>
  );
}
