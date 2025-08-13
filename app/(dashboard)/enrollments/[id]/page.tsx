"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  GraduationCap,
  User,
  BookOpen,
  Calendar,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

type Enrollment = {
  id: string;
  studentName: string;
  studentEmail: string;
  courseName: string;
  enrollmentDate: string;
  progress: number;
  status: "active" | "completed" | "pending" | "dropped";
  paymentStatus: "paid" | "pending" | "failed";
};

// Sample data (replace with API call in real project)
const enrollments: Enrollment[] = [
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

export default function EnrollmentDetailPage() {
  const params = useParams();
  const enrollmentId = params.id as string;

  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);

  useEffect(() => {
    const found = enrollments.find((e) => e.id === enrollmentId) || null;
    setEnrollment(found);
  }, [enrollmentId]);

  if (!enrollment) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Enrollment not found.
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
            <Link href="/enrollments">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Enrollment {enrollment.id}</h1>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
        >
          <Link href={`/enrollments/update/${enrollment.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Enrollment
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white rounded-xl shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-500" />
              Enrollment Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Enrollment ID:</span>
              <span className="font-mono text-purple-700 bg-purple-100 px-2 py-1 rounded">
                {enrollment.id}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Status:</span>
              <Badge
                variant="outline"
                className={getStatusColor(enrollment.status)}
              >
                {enrollment.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Payment Status:</span>
              <Badge
                variant="outline"
                className={getPaymentStatusColor(enrollment.paymentStatus)}
              >
                {enrollment.paymentStatus}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Progress:</span>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                {enrollment.progress}% Complete
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Enrollment Date:</span>
              <span>
                {new Date(enrollment.enrollmentDate).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-white rounded-xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Name
                </span>
                <span className="font-semibold">{enrollment.studentName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Email
                </span>
                <span>{enrollment.studentEmail}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                Course Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Course
                </span>
                <span className="font-semibold">{enrollment.courseName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Start Date
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-green-600" />
                  {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
