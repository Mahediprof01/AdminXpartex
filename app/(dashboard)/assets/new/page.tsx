"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function NewAssetPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "Physical" as "Physical" | "Digital",
    owner: "",
    location: "",
    quantity: "",
    value: "",
    status: "Active" as "Active" | "Inactive" | "Under Maintenance" | "Retired",
    purchaseDate: "",
    depreciation: "",
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
      console.log("New Asset:", formData);

      // Reset form or navigate back
      router.push("/assets");
    } catch (error) {
      console.error("Error adding asset:", error);
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
          <Link href="/assets">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Add New Asset
          </h1>
          <p className="text-muted-foreground">
            Fill out the form to add a new asset
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>Asset Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Asset Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter asset name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Asset Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Physical">Physical</SelectItem>
                      <SelectItem value="Digital">Digital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Owner & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="owner">Owner *</Label>
                  <Input
                    id="owner"
                    value={formData.owner}
                    onChange={(e) => handleChange("owner", e.target.value)}
                    placeholder="Enter owner or department"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="Physical or cloud location"
                  />
                </div>
              </div>

              {/* Quantity & Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="value">Value ($) *</Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => handleChange("value", e.target.value)}
                    placeholder="Enter asset value"
                    required
                  />
                </div>
              </div>

              {/* Purchase Date & Depreciation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date *</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) =>
                      handleChange("purchaseDate", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="depreciation">Depreciation ($)</Label>
                  <Input
                    id="depreciation"
                    type="number"
                    value={formData.depreciation}
                    onChange={(e) =>
                      handleChange("depreciation", e.target.value)
                    }
                    placeholder="Enter depreciation value"
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Under Maintenance">
                      Under Maintenance
                    </SelectItem>
                    <SelectItem value="Retired">Retired</SelectItem>
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
                  placeholder="Enter asset description"
                  rows={4}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Creating..." : "Create Asset"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/assets">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
