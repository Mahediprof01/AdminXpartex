"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Package, DollarSign } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useProductStore } from "@/lib/store";
import { notFound } from "next/navigation";

import * as React from "react";
export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { getProduct } = useProductStore();
  const actualParams = React.use(params);
  const product = getProduct(actualParams.id);

  if (!product) {
    notFound();
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
          <Link href="/product-wholesale">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">
            {product.name}
          </h1>
          <p className="text-muted-foreground">Product ID: {product.id}</p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/product-wholesale/${product.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Product
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-green-500" />
              Product Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt={product.name}
                fill
                className="object-cover"
              />
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
                  <p className="text-sm font-medium text-muted-foreground">
                    Name
                  </p>
                  <p className="text-sm font-semibold">{product.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Category
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {product.category}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Price
                  </p>
                  <p className="text-lg font-bold text-green-600 flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {product.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Stock
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      product.stock === 0
                        ? "text-red-500"
                        : product.stock < 50
                        ? "text-orange-500"
                        : "text-green-600"
                    }`}
                  >
                    {product.stock} units
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge
                    variant={
                      product.status === "active" ? "default" : "secondary"
                    }
                    className={
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : ""
                    }
                  >
                    {product.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    SKU
                  </p>
                  <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {product.sku}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Description
                </p>
                <p className="text-sm">{product.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Vendor
                  </p>
                  <p className="text-sm font-semibold">{product.vendor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Created
                  </p>
                  <p className="text-sm">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
