"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Edit,
  BookOpen,
  User,
  Eye,
  Calendar,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as React from "react";

const blogs = [
  {
    id: "BLOG001",
    title: "10 Tips for E-commerce Success",
    author: "John Smith",
    category: "Business",
    status: "published",
    views: 1250,
    publishedDate: "2024-01-15",
  },
  {
    id: "BLOG002",
    title: "The Future of Online Shopping",
    author: "Sarah Johnson",
    category: "Technology",
    status: "published",
    views: 890,
    publishedDate: "2024-01-14",
  },
  {
    id: "BLOG003",
    title: "Building Customer Loyalty",
    author: "Mike Davis",
    category: "Marketing",
    status: "draft",
    views: 0,
    publishedDate: "2024-01-13",
  },
  {
    id: "BLOG004",
    title: "Mobile Commerce Trends 2024",
    author: "Lisa Wilson",
    category: "Technology",
    status: "published",
    views: 2100,
    publishedDate: "2024-01-12",
  },
];

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Unwrap params for Next.js 15+
  const actualParams = React.use(params) as { id: string };

  const blog = React.useMemo(
    () => blogs.find((b) => b.id === actualParams.id),
    [actualParams.id]
  );

  if (!blog) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Blog not found.
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
          <Link href="/news">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">
            {blog.title}
          </h1>
          <p className="text-muted-foreground">Blog ID: {blog.id}</p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/news/update/${blog.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Blog
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Blog Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This blog titled <strong>{blog.title}</strong> covers{" "}
              <strong>{blog.category}</strong> related topics and is authored by{" "}
              <strong>{blog.author}</strong>.
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
                <Info label="Title" value={blog.title} />
                <Info
                  label="Author"
                  value={blog.author}
                  icon={<User className="h-4 w-4 text-purple-500" />}
                />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Category
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {blog.category}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge
                    className={
                      blog.status === "published"
                        ? "bg-green-100 text-green-700"
                        : blog.status === "draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {blog.status}
                  </Badge>
                </div>
                <Info
                  label="Views"
                  value={blog.views}
                  icon={<Eye className="h-4 w-4 text-blue-500" />}
                />
                <Info
                  label="Published Date"
                  value={new Date(blog.publishedDate).toLocaleDateString()}
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
