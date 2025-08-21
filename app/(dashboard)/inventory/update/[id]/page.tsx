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
import { notFound } from "next/navigation";

// Dummy inventory data
const dummyInventory = [
  {
    id: "INV001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    quantity: 150,
    status: "in_stock",
    createdAt: "2024-01-15",
    description: "High-quality wireless headphones with noise cancellation",
    vendor: "TechCorp Solutions",
  },
  {
    id: "INV002",
    name: "Smart Watch",
    category: "Electronics",
    price: 299.99,
    quantity: 75,
    status: "in_stock",
    createdAt: "2024-01-14",
    description: "Advanced smartwatch with health monitoring",
    vendor: "Global Electronics",
  },
  {
    id: "INV003",
    name: "Coffee Maker",
    category: "Appliances",
    price: 149.99,
    quantity: 0,
    status: "out_of_stock",
    createdAt: "2024-01-13",
    description: "Premium coffee maker with programmable features",
    vendor: "Home Appliances Co",
  },
];

export default function UpdateInventoryPage({
  params,
}: {
  params: { id: string };
}) {
  const actualParams = React.use(params) as { id: string };
  const item = dummyInventory.find((i) => i.id === actualParams.id);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: item?.name || "",
    category: item?.category || "Electronics",
    price: item?.price?.toString() || "",
    quantity: item?.quantity?.toString() || "",
    status: item?.status || "in_stock",
    createdAt: item?.createdAt || "",
    description: item?.description || "",
    vendor: item?.vendor || "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        price: item.price.toString(),
        quantity: item.quantity.toString(),
        status: item.status,
        createdAt: item.createdAt,
        description: item.description,
        vendor: item.vendor,
      });
    }
  }, [item]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Replace with API update logic
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/inventory";
    }, 500);
  };

  if (!item) return notFound();

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
          <Link href="/inventory">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Update Inventory Item</h1>
          <p className="text-muted-foreground">
            Edit details for this inventory item.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
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
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Appliances">Appliances</SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Price ($)</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    min={0}
                    step="0.01"
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleChange("quantity", e.target.value)}
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
                      <SelectItem value="in_stock">In Stock</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Vendor</Label>
                  <Input
                    value={formData.vendor}
                    onChange={(e) => handleChange("vendor", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Created At</Label>
                  <Input
                    type="date"
                    value={formData.createdAt}
                    onChange={(e) => handleChange("createdAt", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Update"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/inventory">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
