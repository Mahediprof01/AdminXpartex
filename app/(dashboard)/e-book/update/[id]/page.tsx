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

// Dummy data for demonstration; replace with real data fetching logic as needed
const ebooks = [
  {
    id: "EBOOK001",
    title: "The Art of Business",
    author: "Alice Walker",
    category: "Business",
    status: "published",
    downloads: 1200,
    publishedDate: "2024-01-10",
  },
  {
    id: "EBOOK002",
    title: "Modern Web Technology",
    author: "Bob Martin",
    category: "Technology",
    status: "published",
    downloads: 950,
    publishedDate: "2024-01-08",
  },
  {
    id: "EBOOK003",
    title: "Marketing for Beginners",
    author: "Carol Lee",
    category: "Marketing",
    status: "draft",
    downloads: 0,
    publishedDate: "2024-01-05",
  },
  {
    id: "EBOOK004",
    title: "Fictional Worlds",
    author: "David Kim",
    category: "Fiction",
    status: "archived",
    downloads: 300,
    publishedDate: "2023-12-20",
  },
];

export default function UpdateEbookPage({ params }: { params: { id: string } }) {
  // Unwrap params for Next.js 14+ compatibility
  const actualParams = React.use(params) as { id: string };
  const ebook = ebooks.find((e) => e.id === (actualParams?.id || ""));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: ebook?.title || "",
    author: ebook?.author || "",
    category: ebook?.category || "Business",
    status: ebook?.status || "draft",
    downloads: ebook?.downloads?.toString() || "",
    publishedDate: ebook?.publishedDate || "",
  });

  useEffect(() => {
    if (ebook) {
      setFormData({
        title: ebook.title,
        author: ebook.author,
        category: ebook.category,
        status: ebook.status,
        downloads: ebook.downloads.toString(),
        publishedDate: ebook.publishedDate,
      });
    }
  }, [ebook]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Add logic to update ebook
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/e-book";
    }, 500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!ebook) {
    return <div className="p-8 text-center text-red-500 font-semibold">E-book not found.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-4 md:p-6"
    >
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/e-book">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit E-book</h1>
          <p className="text-muted-foreground">
            Update the details for this e-book.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>E-book Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Title</Label>
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
                      <SelectItem value="Fiction">Fiction</SelectItem>
                      <SelectItem value="Non-fiction">Non-fiction</SelectItem>
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
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Downloads</Label>
                  <Input
                    type="number"
                    value={formData.downloads}
                    onChange={(e) => handleChange("downloads", e.target.value)}
                    min={0}
                  />
                </div>
                <div>
                  <Label>Published Date</Label>
                  <Input
                    type="date"
                    value={formData.publishedDate}
                    onChange={(e) => handleChange("publishedDate", e.target.value)}
                  />
                </div>
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
                  <Link href="/e-book">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
