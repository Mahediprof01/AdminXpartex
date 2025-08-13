"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function EditEnrollmentPage() {
  const params = useParams();
  const enrollmentId = params.id as string;
  const router = useRouter();

  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    courseName: "",
    enrollmentDate: "",
    progress: 0,
    status: "active" as "active" | "completed" | "pending" | "dropped",
    paymentStatus: "paid" as "paid" | "pending" | "failed",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const found = enrollments.find((e) => e.id === enrollmentId);
    if (found) {
      setEnrollment(found);
      setFormData({
        studentName: found.studentName,
        studentEmail: found.studentEmail,
        courseName: found.courseName,
        enrollmentDate: found.enrollmentDate,
        progress: found.progress,
        status: found.status,
        paymentStatus: found.paymentStatus,
      });
    }
  }, [enrollmentId]);

  if (!enrollment) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Enrollment not found.
      </div>
    );
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with API call to update enrollment
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/enrollments/${enrollmentId}`);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/enrollments/${enrollmentId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Enrollment</h1>
      </div>

      {/* Edit Form Card */}
      <Card className="bg-white rounded-xl shadow-lg border-0">
        <CardHeader>
          <CardTitle>Enrollment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Student Name</Label>
                <Input
                  value={formData.studentName}
                  onChange={(e) => handleChange("studentName", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Student Email</Label>
                <Input
                  type="email"
                  value={formData.studentEmail}
                  onChange={(e) => handleChange("studentEmail", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Course Name</Label>
                <Input
                  value={formData.courseName}
                  onChange={(e) => handleChange("courseName", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Enrollment Date</Label>
                <Input
                  type="date"
                  value={formData.enrollmentDate}
                  onChange={(e) =>
                    handleChange("enrollmentDate", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Progress (%)</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={formData.progress}
                  onChange={(e) =>
                    handleChange("progress", Number(e.target.value))
                  }
                  required
                />
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="dropped">Dropped</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Payment Status</Label>
              <Select
                value={formData.paymentStatus}
                onValueChange={(value) => handleChange("paymentStatus", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-end gap-4 mt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                disabled={isLoading}
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>

              <Button asChild variant="outline">
                <Link href={`/enrollments/${enrollmentId}`}>Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
