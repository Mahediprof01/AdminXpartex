"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, BookOpen, Users, Calendar, User } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as React from "react";

// Dummy data for demonstration; replace with real data fetching logic as needed
const courses = [
	{
		id: "COURSE101",
		name: "Introduction to Programming",
		teacher: "Jane Doe",
		category: "Technology",
		status: "published",
		students: 120,
		publishedDate: "2024-02-10",
		description: "Learn the basics of programming using modern languages and tools.",
	},
	{
		id: "COURSE102",
		name: "Business Analytics",
		teacher: "John Smith",
		category: "Business",
		status: "published",
		students: 80,
		publishedDate: "2024-02-01",
		description: "Analyze business data and make informed decisions.",
	},
	{
		id: "COURSE103",
		name: "Digital Marketing 101",
		teacher: "Emily Clark",
		category: "Marketing",
		status: "draft",
		students: 0,
		publishedDate: "2024-01-20",
		description: "Master the essentials of digital marketing for modern businesses.",
	},
	{
		id: "COURSE104",
		name: "Advanced Algorithms",
		teacher: "Michael Lee",
		category: "Technology",
		status: "archived",
		students: 60,
		publishedDate: "2023-12-15",
		description: "Deep dive into advanced algorithms and problem-solving techniques.",
	},
];


export default function CourseDetailPage({ params }: { params: { id: string } }) {
	// Unwrap params for Next.js 14+ compatibility
	const actualParams = React.use(params) as { id: string };
	const course = React.useMemo(() => courses.find((c) => c.id === actualParams.id), [actualParams.id]);

	if (!course) {
		return (
			<div className="p-8 text-center text-red-500 font-semibold">Course not found.</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="space-y-6 p-4 md:p-6"
		>
			<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/courses">
						<ArrowLeft className="h-4 w-4" />
					</Link>
				</Button>
				<div className="flex-1 min-w-0">
					<h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">{course.name}</h1>
					<p className="text-muted-foreground">Course ID: {course.id}</p>
				</div>
				   <Button asChild className="whitespace-nowrap">
					   <Link href={`/courses/update/${course.id}`}>
						   <Edit className="mr-2 h-4 w-4" />
						   Edit Course
					   </Link>
				   </Button>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card className="border-0 shadow-lg">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<BookOpen className="h-5 w-5 text-blue-500" />
							Course Overview
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<p className="text-sm text-muted-foreground">{course.description}</p>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle>Basic Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<p className="text-sm font-medium text-muted-foreground">Name</p>
									<p className="text-sm font-semibold">{course.name}</p>
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">Category</p>
									<Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
										{course.category}
									</Badge>
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">Status</p>
									<Badge
										variant={course.status === "published" ? "default" : course.status === "draft" ? "secondary" : "outline"}
										className={course.status === "published" ? "bg-green-100 text-green-700" : course.status === "draft" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}
									>
										{course.status}
									</Badge>
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">Teacher</p>
									<span className="flex items-center gap-1"><User className="h-4 w-4 text-purple-500" />{course.teacher}</span>
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">Students</p>
									<span className="flex items-center gap-1"><Users className="h-4 w-4 text-blue-500" />{course.students}</span>
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">Published Date</p>
									<span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-green-500" />{new Date(course.publishedDate).toLocaleDateString()}</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</motion.div>
	);
}
