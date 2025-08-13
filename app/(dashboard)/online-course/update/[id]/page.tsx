"use client";

import { useState, useEffect } from "react";
import * as React from "react";
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

// Dummy data for demonstration; replace with real data fetching logic as needed
const courses = [
  {
    id: "COURSE001",
    title: "Mastering React for Beginners",
    instructor: "Jane Doe",
    category: "Technology",
    status: "published",
    students: 320,
    publishedDate: "2024-01-10",
  },
  {
    id: "COURSE002",
    title: "Business Growth Strategies",
    instructor: "John Smith",
    category: "Business",
    status: "published",
    students: 210,
    publishedDate: "2024-01-08",
  },
  {
    id: "COURSE003",
    title: "Digital Marketing Essentials",
    instructor: "Emily Clark",
    category: "Marketing",
    status: "draft",
    students: 0,
    publishedDate: "2024-01-05",
  },
  {
    id: "COURSE004",
    title: "Advanced TypeScript",
    instructor: "Michael Lee",
    category: "Technology",
    status: "archived",
    students: 150,
    publishedDate: "2023-12-20",
  },
];

export default function UpdateOnlineCoursePage({ params }: { params: { id: string } }) {
  // Unwrap params for Next.js 14+ compatibility
  const actualParams = React.use(params) as { id: string };
  const course = courses.find((c) => c.id === (actualParams?.id || ""));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: course?.title || "",
    instructor: course?.instructor || "",
    category: course?.category || "Business",
    status: course?.status || "draft",
    students: course?.students?.toString() || "",
    publishedDate: course?.publishedDate || "",
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        instructor: course.instructor,
        category: course.category,
        status: course.status,
        students: course.students.toString(),
        publishedDate: course.publishedDate,
      });
    }
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Add logic to update course
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/online-course";
    }, 500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!course) {
    return <div className="p-8 text-center text-red-500 font-semibold">Course not found.</div>;
  }

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
          <Link href="/online-course">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Online Course</h1>
          <p className="text-muted-foreground">
            Update the details for this online course.
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
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Instructor</Label>
                  <Input
                    value={formData.instructor}
                    onChange={(e) => handleChange("instructor", e.target.value)}
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
                  {isLoading ? "Saving..." : "Update"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/online-course">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
