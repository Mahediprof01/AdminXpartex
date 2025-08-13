"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Book, User, Calendar, Download } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as React from "react";

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
    description: "A comprehensive guide to mastering business skills.",
  },
  {
    id: "EBOOK002",
    title: "Modern Web Technology",
    author: "Bob Martin",
    category: "Technology",
    status: "published",
    downloads: 950,
    publishedDate: "2024-01-08",
    description: "Explore the latest in web development and technology trends.",
  },
  {
    id: "EBOOK003",
    title: "Marketing for Beginners",
    author: "Carol Lee",
    category: "Marketing",
    status: "draft",
    downloads: 0,
    publishedDate: "2024-01-05",
    description: "An introduction to marketing principles for newcomers.",
  },
  {
    id: "EBOOK004",
    title: "Fictional Worlds",
    author: "David Kim",
    category: "Fiction",
    status: "archived",
    downloads: 300,
    publishedDate: "2023-12-20",
    description: "Dive into imaginative stories and fictional universes.",
  },
];

export default function EbookDetailPage({ params }: { params: { id: string } }) {
  // Unwrap params for Next.js 14+ compatibility
  const actualParams = React.use(params) as { id: string };
  const ebook = ebooks.find((e) => e.id === actualParams.id);

  if (!ebook) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">E-book not found.</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-4 md:p-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/e-book">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">{ebook.title}</h1>
          <p className="text-muted-foreground">E-book ID: {ebook.id}</p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/e-book/update/${ebook.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit E-book
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-blue-500" />
              E-book Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{ebook.description}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Title</p>
                  <p className="text-sm font-semibold">{ebook.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {ebook.category}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge
                    variant={ebook.status === "published" ? "default" : ebook.status === "draft" ? "secondary" : "outline"}
                    className={ebook.status === "published" ? "bg-green-100 text-green-700" : ebook.status === "draft" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}
                  >
                    {ebook.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Author</p>
                  <span className="flex items-center gap-1"><User className="h-4 w-4 text-purple-500" />{ebook.author}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Downloads</p>
                  <span className="flex items-center gap-1"><Download className="h-4 w-4 text-blue-500" />{ebook.downloads}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Published Date</p>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-green-500" />{new Date(ebook.publishedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
