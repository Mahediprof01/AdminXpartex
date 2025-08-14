"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Edit,
  User,
  Mail,
  Star,
  Briefcase,
  DollarSign,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as React from "react";

const freelancers = [
  {
    id: "FRLNC001",
    name: "Alex Thompson",
    email: "alex@example.com",
    skills: "React, Node.js, TypeScript",
    rating: 4.9,
    projects: 23,
    status: "available",
    hourlyRate: 85,
    joinedDate: "2024-01-15",
  },
  {
    id: "FRLNC002",
    name: "Maria Garcia",
    email: "maria@example.com",
    skills: "UI/UX Design, Figma",
    rating: 4.8,
    projects: 18,
    status: "busy",
    hourlyRate: 75,
    joinedDate: "2024-01-14",
  },
  {
    id: "FRLNC003",
    name: "David Chen",
    email: "david@example.com",
    skills: "Python, Django, AWS",
    rating: 4.7,
    projects: 31,
    status: "available",
    hourlyRate: 90,
    joinedDate: "2024-01-13",
  },
  {
    id: "FRLNC004",
    name: "Sophie Miller",
    email: "sophie@example.com",
    skills: "Content Writing, SEO",
    rating: 4.6,
    projects: 12,
    status: "inactive",
    hourlyRate: 45,
    joinedDate: "2024-01-12",
  },
];

export default function FreelancerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Properly unwrap params in Next.js 15+
  const actualParams = React.use(params) as { id: string };

  const freelancer = React.useMemo(
    () => freelancers.find((f) => f.id === actualParams.id),
    [actualParams.id]
  );

  if (!freelancer) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Freelancer not found.
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
          <Link href="/freelancers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">
            {freelancer.name}
          </h1>
          <p className="text-muted-foreground">
            Freelancer ID: {freelancer.id}
          </p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/freelancers/update/${freelancer.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Freelancer
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Freelancer Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Skilled in: {freelancer.skills}
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
                <Info label="Name" value={freelancer.name} />
                <Info
                  label="Email"
                  value={freelancer.email}
                  icon={<Mail className="h-4 w-4 text-purple-500" />}
                />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge
                    className={
                      freelancer.status === "available"
                        ? "bg-green-100 text-green-700"
                        : freelancer.status === "busy"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {freelancer.status}
                  </Badge>
                </div>
                <Info
                  label="Rating"
                  value={freelancer.rating}
                  icon={<Star className="h-4 w-4 text-yellow-500" />}
                />
                <Info
                  label="Projects"
                  value={freelancer.projects}
                  icon={<Briefcase className="h-4 w-4 text-blue-500" />}
                />
                <Info
                  label="Hourly Rate"
                  value={`$${freelancer.hourlyRate}/hr`}
                  icon={<DollarSign className="h-4 w-4 text-green-500" />}
                />
                <Info
                  label="Joined Date"
                  value={new Date(freelancer.joinedDate).toLocaleDateString()}
                  icon={<Calendar className="h-4 w-4 text-green-500" />}
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
