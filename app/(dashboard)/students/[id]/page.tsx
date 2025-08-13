"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrollmentDate: string;
  coursesEnrolled: number;
  status: "active" | "inactive";
};

// Sample data (replace with API call in real project)
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

// Badge color based on status
const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700 border-green-200";
    case "inactive":
      return "bg-red-100 text-red-700 border-red-200";
  }
};

export default function ViewStudentPage() {
  const params = useParams();
  const studentId = params.id as string;

  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const found = students.find((s) => s.id === studentId);
    setStudent(found || null);
  }, [studentId]);

  if (!student) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Student not found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/students">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{student.name}</h1>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg"
        >
          <Link href={`/students/update/${student.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Student
          </Link>
        </Button>
      </div>

      {/* Student Info Card */}
      <Card className="bg-white rounded-xl shadow-lg border-0">
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Student ID:</span>
            <span className="font-mono text-blue-700 bg-blue-100 px-2 py-1 rounded">
              {student.id}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Email:</span>
            <span>{student.email}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Phone:</span>
            <span>{student.phone}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Enrollment Date:</span>
            <span>{new Date(student.enrollmentDate).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Courses Enrolled:</span>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              {student.coursesEnrolled} courses
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Status:</span>
            <Badge variant="outline" className={getStatusColor(student.status)}>
              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
