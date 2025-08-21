"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { useRouter } from "next/navigation";

export default function NewInventoryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    vendor: "",
    category: "",
    location: "",
    quantity: "",
    inbound: "",
    price: "",
    status: "in_stock" as "in_stock" | "out_of_stock",
    reorderPoint: "",
    safetyStock: "",
    lastSoldUnits: "",
    description: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Dummy action: log form data
      console.log("New Inventory Item:", formData);

      // Reset form or navigate back
      router.push("/inventory");
    } catch (error) {
      console.error("Error adding inventory:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-4 md:p-6"
    >
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/inventory">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Add New Inventory Item
          </h1>
          <p className="text-muted-foreground">
            Fill out the form to add a new inventory item
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>Inventory Item Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter item name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => handleChange("sku", e.target.value)}
                    placeholder="Enter SKU code"
                    required
                  />
                </div>
              </div>

              {/* Vendor & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor *</Label>
                  <Input
                    id="vendor"
                    value={formData.vendor}
                    onChange={(e) => handleChange("vendor", e.target.value)}
                    placeholder="Enter vendor name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    placeholder="Enter category"
                    required
                  />
                </div>
              </div>

              {/* Location & Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="Warehouse / Rack location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                    placeholder="Enter quantity"
                    required
                  />
                </div>
              </div>

              {/* Inbound & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inbound">Inbound</Label>
                  <Input
                    id="inbound"
                    type="number"
                    value={formData.inbound}
                    onChange={(e) => handleChange("inbound", e.target.value)}
                    placeholder="Enter inbound units"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Unit Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>

              {/* Stock & Sales Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reorderPoint">Reorder Point</Label>
                  <Input
                    id="reorderPoint"
                    type="number"
                    value={formData.reorderPoint}
                    onChange={(e) =>
                      handleChange("reorderPoint", e.target.value)
                    }
                    placeholder="Min stock before reorder"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="safetyStock">Safety Stock</Label>
                  <Input
                    id="safetyStock"
                    type="number"
                    value={formData.safetyStock}
                    onChange={(e) =>
                      handleChange("safetyStock", e.target.value)
                    }
                    placeholder="Safety stock level"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastSoldUnits">Last Sold Units</Label>
                  <Input
                    id="lastSoldUnits"
                    type="number"
                    value={formData.lastSoldUnits}
                    onChange={(e) =>
                      handleChange("lastSoldUnits", e.target.value)
                    }
                    placeholder="Units sold last period"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_stock">In Stock</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Enter item description"
                  rows={4}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Creating..." : "Create Inventory Item"}
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
