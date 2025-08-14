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

// Dummy blog data
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

export default function UpdateBlogPage({ params }: { params: { id: string } }) {
  // Next.js 14+ params unwrapping
  const actualParams = React.use(params) as { id: string };
  const blog = blogs.find((b) => b.id === (actualParams?.id || ""));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    author: blog?.author || "",
    category: blog?.category || "Business",
    status: blog?.status || "draft",
    views: blog?.views?.toString() || "",
    publishedDate: blog?.publishedDate || "",
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        author: blog.author,
        category: blog.category,
        status: blog.status,
        views: blog.views.toString(),
        publishedDate: blog.publishedDate,
      });
    }
  }, [blog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Replace with real update logic
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/news";
    }, 500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/news">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Blog</h1>
          <p className="text-muted-foreground">
            Update the details for this blog post.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>Blog Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Blog Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Author</Label>
                  <Input
                    value={formData.author}
                    onChange={(e) => handleChange("author", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Views</Label>
                  <Input
                    type="number"
                    value={formData.views}
                    onChange={(e) => handleChange("views", e.target.value)}
                    min={0}
                  />
                </div>
                <div>
                  <Label>Published Date</Label>
                  <Input
                    type="date"
                    value={formData.publishedDate}
                    onChange={(e) =>
                      handleChange("publishedDate", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Update"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/news">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
