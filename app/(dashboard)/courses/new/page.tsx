"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NewCoursePage() {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		teacher: "",
		category: "Technology",
		status: "draft",
		students: "",
		publishedDate: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		// TODO: Add logic to save course
		setTimeout(() => {
			setIsLoading(false);
			window.location.href = "/courses";
		}, 500);
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="space-y-6 p-4 md:p-6"
		>
			{/* Header Section */}
			<div className="flex items-center gap-4 mb-4">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/courses">
						<ArrowLeft className="h-4 w-4" />
					</Link>
				</Button>
				<div>
					<h1 className="text-2xl font-bold">Add New Course</h1>
					<p className="text-muted-foreground">
						Fill in the details to add a new course.
					</p>
				</div>
			</div>

			{/* Form Section */}
			<div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
				<Card className="border-0 shadow-none max-w-full">
					<CardHeader>
						<CardTitle>Course Details</CardTitle>
					</CardHeader>
					<CardContent>
						<form className="space-y-4" onSubmit={handleSubmit}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<Label>Course Name</Label>
									<Input
										value={formData.name}
										onChange={(e) => handleChange("name", e.target.value)}
										required
									/>
								</div>
								<div>
									<Label>Teacher</Label>
									<Input
										value={formData.teacher}
										onChange={(e) => handleChange("teacher", e.target.value)}
										required
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<Label>Category</Label>
									<Select
										value={formData.category}
										onValueChange={(value) => handleChange("category", value)}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Business">Business</SelectItem>
											<SelectItem value="Technology">Technology</SelectItem>
											<SelectItem value="Marketing">Marketing</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label>Status</Label>
									<Select
										value={formData.status}
										onValueChange={(value) => handleChange("status", value)}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="published">Published</SelectItem>
											<SelectItem value="draft">Draft</SelectItem>
											<SelectItem value="archived">Archived</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<Label>Students</Label>
									<Input
										type="number"
										value={formData.students}
										onChange={(e) => handleChange("students", e.target.value)}
										min={0}
									/>
								</div>
								<div>
									<Label>Published Date</Label>
									<Input
										type="date"
										value={formData.publishedDate}
										onChange={(e) => handleChange("publishedDate", e.target.value)}
									/>
								</div>
							</div>

							{/* Actions */}
							<div className="flex items-center justify-end gap-4 pt-4">
								<Button
									type="submit"
									className="bg-gradient-to-r from-green-600 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
									disabled={isLoading}
								>
									<Save className="mr-2 h-4 w-4" />
									{isLoading ? "Saving..." : "Submit"}
								</Button>
								<Button type="button" variant="outline" asChild>
									<Link href="/courses">Cancel</Link>
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
}
