"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Edit,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Users,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as React from "react";

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

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Unwrap params for Next.js 15+
  const actualParams = React.use(params) as { id: string };

  const job = React.useMemo(
    () => jobs.find((j) => j.id === actualParams.id),
    [actualParams.id]
  );

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/jobs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">
            {job.title}
          </h1>
          <p className="text-muted-foreground">Job ID: {job.id}</p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/jobs/update/${job.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Job
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              Job Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The <strong>{job.title}</strong> role at{" "}
              <strong>{job.company}</strong> is a <strong>{job.type}</strong>{" "}
              position located in <strong>{job.location}</strong>, offering a
              salary of <strong>{job.salary}</strong>.
            </p>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Info
                  label="Company"
                  value={job.company}
                  icon={<Building2 className="h-4 w-4 text-purple-500" />}
                />
                <Info
                  label="Location"
                  value={job.location}
                  icon={<MapPin className="h-4 w-4 text-green-500" />}
                />
                <Info label="Type" value={job.type} />
                <Info
                  label="Salary"
                  value={job.salary}
                  icon={<DollarSign className="h-4 w-4 text-blue-500" />}
                />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge
                    className={
                      job.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {job.status}
                  </Badge>
                </div>
                <Info
                  label="Applicants"
                  value={job.applicants}
                  icon={<Users className="h-4 w-4 text-yellow-500" />}
                />
                <Info
                  label="Posted Date"
                  value={new Date(job.postedDate).toLocaleDateString()}
                  icon={<Calendar className="h-4 w-4 text-orange-500" />}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <span className="flex items-center gap-1">
        {icon}
        {value}
      </span>
    </div>
  );
}
