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

// Dummy job data
const jobs = [
  {
    id: "JOB001",
    title: "Senior React Developer",
    company: "TechCorp Solutions",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000",
    status: "active",
    applicants: 45,
    postedDate: "2024-01-15",
  },
  {
    id: "JOB002",
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "New York, NY",
    type: "Contract",
    salary: "$80/hour",
    status: "active",
    applicants: 23,
    postedDate: "2024-01-14",
  },
  {
    id: "JOB003",
    title: "Product Manager",
    company: "StartupXYZ",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140,000",
    status: "closed",
    applicants: 67,
    postedDate: "2024-01-10",
  },
  {
    id: "JOB004",
    title: "DevOps Engineer",
    company: "CloudTech Inc",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000",
    status: "active",
    applicants: 34,
    postedDate: "2024-01-12",
  },
];

export default function UpdateJobPage({ params }: { params: { id: string } }) {
  const actualParams = React.use(params) as { id: string };
  const job = jobs.find((j) => j.id === (actualParams?.id || ""));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: job?.title || "",
    company: job?.company || "",
    location: job?.location || "",
    type: job?.type || "Full-time",
    salary: job?.salary || "",
    status: job?.status || "active",
    applicants: job?.applicants?.toString() || "",
    postedDate: job?.postedDate || "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        salary: job.salary,
        status: job.status,
        applicants: job.applicants.toString(),
        postedDate: job.postedDate,
      });
    }
  }, [job]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Replace with API update logic
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/jobs";
    }, 500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!job) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Job not found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-4 md:p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/jobs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Job</h1>
          <p className="text-muted-foreground">
            Update the details for this job listing.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Job Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Job Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Salary</Label>
                  <Input
                    value={formData.salary}
                    onChange={(e) => handleChange("salary", e.target.value)}
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
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Applicants</Label>
                  <Input
                    type="number"
                    value={formData.applicants}
                    onChange={(e) => handleChange("applicants", e.target.value)}
                    min={0}
                  />
                </div>
                <div>
                  <Label>Posted Date</Label>
                  <Input
                    type="date"
                    value={formData.postedDate}
                    onChange={(e) => handleChange("postedDate", e.target.value)}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-600 hover:to-cyan-600 text-white shadow-lg"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Update"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/jobs">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
