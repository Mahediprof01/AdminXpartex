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

// Dummy freelancer data
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

export default function UpdateFreelancerPage({
  params,
}: {
  params: { id: string };
}) {
  // Next.js 14+ params unwrapping
  const actualParams = React.use(params) as { id: string };
  const freelancer = freelancers.find((f) => f.id === (actualParams?.id || ""));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: freelancer?.name || "",
    email: freelancer?.email || "",
    skills: freelancer?.skills || "",
    rating: freelancer?.rating?.toString() || "",
    projects: freelancer?.projects?.toString() || "",
    status: freelancer?.status || "available",
    hourlyRate: freelancer?.hourlyRate?.toString() || "",
    joinedDate: freelancer?.joinedDate || "",
  });

  useEffect(() => {
    if (freelancer) {
      setFormData({
        name: freelancer.name,
        email: freelancer.email,
        skills: freelancer.skills,
        rating: freelancer.rating.toString(),
        projects: freelancer.projects.toString(),
        status: freelancer.status,
        hourlyRate: freelancer.hourlyRate.toString(),
        joinedDate: freelancer.joinedDate,
      });
    }
  }, [freelancer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Replace with real update logic
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/freelancers";
    }, 500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/freelancers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Freelancer</h1>
          <p className="text-muted-foreground">
            Update the details for this freelancer.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>Freelancer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <div>
                <Label>Skills</Label>
                <Input
                  value={formData.skills}
                  onChange={(e) => handleChange("skills", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Rating</Label>
                  <Input
                    type="number"
                    step="0.1"
                    max={5}
                    min={0}
                    value={formData.rating}
                    onChange={(e) => handleChange("rating", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Projects</Label>
                  <Input
                    type="number"
                    value={formData.projects}
                    onChange={(e) => handleChange("projects", e.target.value)}
                    min={0}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Hourly Rate ($)</Label>
                  <Input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => handleChange("hourlyRate", e.target.value)}
                    min={0}
                  />
                </div>
              </div>

              <div>
                <Label>Joined Date</Label>
                <Input
                  type="date"
                  value={formData.joinedDate}
                  onChange={(e) => handleChange("joinedDate", e.target.value)}
                />
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
                  <Link href="/freelancers">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
