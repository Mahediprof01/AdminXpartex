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

export default function EditStudentPage() {
  const params = useParams();
  const studentId = params.id as string;
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enrollmentDate: "",
    coursesEnrolled: 0,
    status: "active" as "active" | "inactive",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const found = students.find((s) => s.id === studentId);
    if (found) {
      setStudent(found);
      setFormData({
        name: found.name,
        email: found.email,
        phone: found.phone,
        enrollmentDate: found.enrollmentDate,
        coursesEnrolled: found.coursesEnrolled,
        status: found.status,
      });
    }
  }, [studentId]);

  if (!student) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Student not found.
      </div>
    );
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with API call to update student
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/students/${studentId}`);
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
          <Link href={`/students/${studentId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Student</h1>
      </div>

      {/* Edit Form Card */}
      <Card className="bg-white rounded-xl shadow-lg border-0">
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>
                <Label>Courses Enrolled</Label>
                <Input
                  type="number"
                  min={0}
                  value={formData.coursesEnrolled}
                  onChange={(e) =>
                    handleChange("coursesEnrolled", Number(e.target.value))
                  }
                  required
                />
              </div>
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
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-end gap-4 mt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white shadow-lg"
                disabled={isLoading}
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>

              <Button asChild variant="outline">
                <Link href={`/students/${studentId}`}>Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
