"use client"

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
			{ label: "Fiction", value: "Fiction" },
			{ label: "Non-fiction", value: "Non-fiction" },
		],
	},
	{
		key: "author",
		label: "Author",
		options: [
			{ label: "Alice Walker", value: "Alice Walker" },
			{ label: "Bob Martin", value: "Bob Martin" },
			{ label: "Carol Lee", value: "Carol Lee" },
			{ label: "David Kim", value: "David Kim" },
		],
	},
];

type Ebook = {
	id: string;
	title: string;
	author: string;
	category: string;
	status: "published" | "draft" | "archived";
	downloads: number;
	publishedDate: string;
};

import type { Row, Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Eye, Edit, Trash, Book } from "lucide-react";
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

const ebooks: Ebook[] = [
	{
		id: "EBOOK001",
		title: "The Art of Business",
		author: "Alice Walker",
		category: "Business",
		status: "published",
		downloads: 1200,
		publishedDate: "2024-01-10",
	},
	{
		id: "EBOOK002",
		title: "Modern Web Technology",
		author: "Bob Martin",
		category: "Technology",
		status: "published",
		downloads: 950,
		publishedDate: "2024-01-08",
	},
	{
		id: "EBOOK003",
		title: "Marketing for Startups",
		author: "Carol Lee",
		category: "Marketing",
		status: "draft",
		downloads: 0,
		publishedDate: "2024-01-05",
	},
	{
		id: "EBOOK004",
		title: "Fictional Worlds",
		author: "David Kim",
		category: "Fiction",
		status: "archived",
		downloads: 300,
		publishedDate: "2023-12-20",
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
		case "Fiction":
			return "bg-pink-100 text-pink-700 border-pink-200";
		case "Non-fiction":
			return "bg-gray-200 text-gray-800 border-gray-300";
		default:
			return "bg-gray-100 text-gray-700 border-gray-200";
	}
};

const columns: import("@tanstack/react-table").ColumnDef<Ebook, any>[] = [
	{
		id: "select",
		header: ({ table }: { table: Table<Ebook> }) => (
			<input
				type="checkbox"
				checked={table.getIsAllPageRowsSelected()}
				onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
				className="rounded border-gray-300"
			/>
		),
		cell: ({ row }: { row: Row<Ebook> }) => (
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
		header: "E-Book ID",
		cell: ({ row }: { row: Row<Ebook> }) => (
			<div className="font-mono text-sm bg-pink-100 px-2 py-1 rounded text-pink-700">{row.getValue("id")}</div>
		),
	},
       {
	       accessorKey: "title",
	       header: "Title",
	       cell: ({ row }: { row: Row<Ebook> }) => {
		       const ebook = row.original;
		       return (
			       <Link
				       href={`/e-book/${ebook.id}`}
				       className="font-medium max-w-xs truncate text-blue-600 hover:underline block"
			       >
				       {row.getValue("title")}
			       </Link>
		       );
	       },
       },
	{
		accessorKey: "author",
		header: "Author",
		cell: ({ row }: { row: Row<Ebook> }) => <div className="text-sm">{row.getValue("author")}</div>,
	},
	{
		accessorKey: "category",
		header: "Category",
		cell: ({ row }: { row: Row<Ebook> }) => {
			const category = row.getValue("category") as string;
			return (
				<Badge variant="outline" className={getCategoryColor(category)}>
					{category}
				</Badge>
			);
		},
	},
	{
		accessorKey: "downloads",
		header: "Downloads",
		cell: ({ row }: { row: Row<Ebook> }) => <div className="font-medium">{(row.getValue("downloads") as number).toLocaleString()}</div>,
	},
	{
		accessorKey: "publishedDate",
		header: "Published",
		cell: ({ row }: { row: Row<Ebook> }) => (
			<div className="text-sm text-muted-foreground">
				{new Date(row.getValue("publishedDate")).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
			</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }: { row: Row<Ebook> }) => {
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
		cell: ({ row }: { row: Row<Ebook> }) => {
			const ebook = row.original;
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
							<Link href={`/e-book/${ebook.id}`} className="cursor-pointer">
								<Eye className="mr-2 h-4 w-4 text-blue-500" />
								View E-Book
							</Link>
						</DropdownMenuItem>
			       <DropdownMenuItem asChild>
				       <Link href={`/e-book/update/${ebook.id}`} className="cursor-pointer">
					       <Edit className="mr-2 h-4 w-4 text-green-500" />
					       Edit E-Book
				       </Link>
			       </DropdownMenuItem>
			       <DropdownMenuSeparator />
			       {ebook.status === "published" && (
				       <DropdownMenuItem className="text-yellow-600 cursor-pointer focus:text-yellow-600">
					       <Trash className="mr-2 h-4 w-4" />
					       Archive E-Book
				       </DropdownMenuItem>
			       )}
			       {ebook.status === "archived" && (
				       <DropdownMenuItem className="text-green-600 cursor-pointer focus:text-green-600">
					       <Edit className="mr-2 h-4 w-4" />
					       Restore E-Book
				       </DropdownMenuItem>
			       )}
			       {ebook.status === "draft" && (
				       <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600">
					       <Trash className="mr-2 h-4 w-4" />
					       Delete E-Book
				       </DropdownMenuItem>
			       )}
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function EbookPage() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="space-y-6 p-4 md:p-6"
		>
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
						E-Books
					</h2>
					<p className="text-muted-foreground mt-1">Manage all e-books here.</p>
				</div>
				<Button
					asChild
					className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg whitespace-nowrap"
				>
					<Link href="/e-book/new">
						<Plus className="mr-2 h-4 w-4" />
						Add New
					</Link>
				</Button>
			</div>

			<div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
				<div className="flex items-center gap-2 mb-4">
					<Book className="h-5 w-5 text-blue-500" />
					<h3 className="text-lg font-semibold flex items-center gap-2">
						All E-Books
						<span className="ml-2 text-sm text-gray-500">(
							<span className="font-semibold text-blue-600">{ebooks.length}</span> e-books
						)</span>
					</h3>
				</div>
				<DataTable columns={columns} data={ebooks} searchKey="title" searchPlaceholder="Search e-books..." filterOptions={filterOptions} />
			</div>
		</motion.div>
	);
}
