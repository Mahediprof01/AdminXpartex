"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, BookOpen, User, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as React from "react";

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
    description: "A complete beginner's guide to mastering React.js.",
  },
  {
    id: "COURSE002",
    title: "Business Growth Strategies",
    instructor: "John Smith",
    category: "Business",
    status: "published",
    students: 210,
    publishedDate: "2024-01-08",
    description: "Learn proven strategies for growing your business.",
  },
  {
    id: "COURSE003",
    title: "Digital Marketing Essentials",
    instructor: "Emily Clark",
    category: "Marketing",
    status: "draft",
    students: 0,
    publishedDate: "2024-01-05",
    description: "Essential digital marketing skills for modern marketers.",
  },
  {
    id: "COURSE004",
    title: "Advanced TypeScript",
    instructor: "Michael Lee",
    category: "Technology",
    status: "archived",
    students: 150,
    publishedDate: "2023-12-20",
    description: "Deep dive into advanced TypeScript concepts.",
  },
];

export default function OnlineCourseDetailPage({ params }: { params: { id: string } }) {
  // Unwrap params for Next.js 14+ compatibility
  const actualParams = React.use(params) as { id: string };
  const course = courses.find((c) => c.id === actualParams.id);

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
          <Link href="/online-course">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">{course.title}</h1>
          <p className="text-muted-foreground">Course ID: {course.id}</p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/online-course/update/${course.id}`}>
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
                  <p className="text-sm font-medium text-muted-foreground">Title</p>
                  <p className="text-sm font-semibold">{course.title}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Instructor</p>
                  <span className="flex items-center gap-1"><User className="h-4 w-4 text-purple-500" />{course.instructor}</span>
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
