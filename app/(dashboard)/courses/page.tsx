
"use client";

import type { Row, Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Eye, Edit, Trash, BookOpen } from "lucide-react";
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
		key: "teacher",
		label: "Teacher",
		options: [
			{ label: "Jane Doe", value: "Jane Doe" },
			{ label: "John Smith", value: "John Smith" },
			{ label: "Emily Clark", value: "Emily Clark" },
			{ label: "Michael Lee", value: "Michael Lee" },
		],
	},
];

type Course = {
	id: string;
	name: string;
	teacher: string;
	category: string;
	status: "published" | "draft" | "archived";
	students: number;
	publishedDate: string;
};

const courses: Course[] = [
	{
		id: "COURSE101",
		name: "Introduction to Programming",
		teacher: "Jane Doe",
		category: "Technology",
		status: "published",
		students: 120,
		publishedDate: "2024-02-10",
	},
	{
		id: "COURSE102",
		name: "Business Analytics",
		teacher: "John Smith",
		category: "Business",
		status: "published",
		students: 80,
		publishedDate: "2024-02-01",
	},
	{
		id: "COURSE103",
		name: "Digital Marketing 101",
		teacher: "Emily Clark",
		category: "Marketing",
		status: "draft",
		students: 0,
		publishedDate: "2024-01-20",
	},
	{
		id: "COURSE104",
		name: "Advanced Algorithms",
		teacher: "Michael Lee",
		category: "Technology",
		status: "archived",
		students: 60,
		publishedDate: "2023-12-15",
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

const columns: import("@tanstack/react-table").ColumnDef<Course, any>[] = [
	{
		id: "select",
		header: ({ table }: { table: Table<Course> }) => (
			<input
				type="checkbox"
				checked={table.getIsAllPageRowsSelected()}
				onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
				className="rounded border-gray-300"
			/>
		),
		cell: ({ row }: { row: Row<Course> }) => (
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
		header: "Course ID",
		cell: ({ row }: { row: Row<Course> }) => (
			<div className="font-mono text-sm bg-pink-100 px-2 py-1 rounded text-pink-700">{row.getValue("id")}</div>
		),
	},
		{
			accessorKey: "name",
			header: "Course Name",
			cell: ({ row }: { row: Row<Course> }) => {
				const course = row.original;
				return (
					<Link
						href={`/courses/${course.id}`}
						className="font-medium max-w-xs truncate text-blue-700 hover:underline"
					>
						{row.getValue("name")}
					</Link>
				);
			},
		},
	{
		accessorKey: "teacher",
		header: "Created By ",
		cell: ({ row }: { row: Row<Course> }) => <div className="text-sm">{row.getValue("teacher")}</div>,
	},
	{
		accessorKey: "category",
		header: "Category",
		cell: ({ row }: { row: Row<Course> }) => {
			const category = row.getValue("category") as string;
			return (
				<Badge variant="outline" className={getCategoryColor(category)}>
					{category}
				</Badge>
			);
		},
	},
	{
		accessorKey: "students",
		header: "Students",
		cell: ({ row }: { row: Row<Course> }) => <div className="font-medium">{(row.getValue("students") as number).toLocaleString()}</div>,
	},
	{
		accessorKey: "publishedDate",
		header: "Published",
		cell: ({ row }: { row: Row<Course> }) => (
			<div className="text-sm text-muted-foreground">
				{new Date(row.getValue("publishedDate")).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
			</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }: { row: Row<Course> }) => {
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
				cell: ({ row }: { row: Row<Course> }) => {
					const course = row.original;
					let statusAction = null;
					if (course.status === "published") {
						statusAction = (
							<DropdownMenuItem className="text-gray-700 cursor-pointer focus:text-gray-900">
								<Trash className="mr-2 h-4 w-4 text-gray-500" />
								Archive Course
							</DropdownMenuItem>
						);
					} else if (course.status === "draft") {
						statusAction = (
							<DropdownMenuItem className="text-green-700 cursor-pointer focus:text-green-900">
								<Eye className="mr-2 h-4 w-4 text-green-500" />
								Publish Course
							</DropdownMenuItem>
						);
					} else if (course.status === "archived") {
						statusAction = (
							<DropdownMenuItem className="text-blue-700 cursor-pointer focus:text-blue-900">
								<Edit className="mr-2 h-4 w-4 text-blue-500" />
								Restore Course
							</DropdownMenuItem>
						);
					}
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
									<Link href={`/courses/${course.id}`} className="cursor-pointer">
										<Eye className="mr-2 h-4 w-4 text-blue-500" />
										View Course
									</Link>
								</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link href={`/courses/update/${course.id}`} className="cursor-pointer">
													<Edit className="mr-2 h-4 w-4 text-green-500" />
													Edit Course
												</Link>
											</DropdownMenuItem>
								<DropdownMenuSeparator />
								{statusAction}
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
			},
];

export default function CoursesPage() {
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
						
					</h2>
					<p className="text-muted-foreground mt-1"> </p>
				</div>
				<Button
					asChild
					className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg whitespace-nowrap"
				>
					<Link href="/courses/new">
						<Plus className="mr-2 h-4 w-4" />
						Add New
					</Link>
				</Button>
			</div>

			<div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
				<div className="flex items-center gap-2 mb-4">
					<BookOpen className="h-5 w-5 text-blue-500" />
					<h3 className="text-lg font-semibold flex items-center gap-2">
						All Courses
						<span className="ml-2 text-sm text-gray-500">(
							<span className="font-semibold text-blue-600">{courses.length}</span> courses
						)</span>
					</h3>
				</div>
				<DataTable columns={columns} data={courses} searchKey="name" searchPlaceholder="Search courses..." filterOptions={filterOptions} />
			</div>
		</motion.div>
	);
}
