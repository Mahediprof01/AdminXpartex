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

// Dummy assets data
const dummyAssets = [
  {
    id: "ASSET001",
    name: "Dell Laptop XPS 13",
    type: "Physical",
    owner: "Company",
    quantity: 20,
    value: 1200,
    status: "Active",
    location: "Office HQ",
    purchaseDate: "2023-02-15",
    depreciation: 1000,
  },
  {
    id: "ASSET002",
    name: "Adobe Creative Cloud License",
    type: "Digital",
    owner: "Design Team",
    quantity: 10,
    value: 600,
    status: "Active",
    location: "Cloud",
    purchaseDate: "2024-01-10",
    depreciation: 500,
  },
  {
    id: "ASSET003",
    name: "Delivery Truck",
    type: "Physical",
    owner: "Logistics",
    quantity: 5,
    value: 50000,
    status: "Under Maintenance",
    location: "Warehouse 3",
    purchaseDate: "2022-11-20",
    depreciation: 42000,
  },
];

export default function UpdateAssetPage({
  params,
}: {
  params: { id: string };
}) {
  const actualParams = React.use(params) as { id: string };
  const asset = dummyAssets.find((a) => a.id === actualParams.id);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: asset?.name || "",
    type: asset?.type || "Physical",
    owner: asset?.owner || "",
    location: asset?.location || "",
    quantity: asset?.quantity?.toString() || "",
    value: asset?.value?.toString() || "",
    status: asset?.status || "Active",
    purchaseDate: asset?.purchaseDate || "",
    depreciation: asset?.depreciation?.toString() || "",
  });

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name,
        type: asset.type,
        owner: asset.owner,
        location: asset.location,
        quantity: asset.quantity.toString(),
        value: asset.value.toString(),
        status: asset.status,
        purchaseDate: asset.purchaseDate,
        depreciation: asset.depreciation.toString(),
      });
    }
  }, [asset]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Replace with actual API update logic
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/assets";
    }, 500);
  };

  if (!asset) return notFound();

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
          <Link href="/assets">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Update Asset</h1>
          <p className="text-muted-foreground">Edit details for this asset.</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>Asset Details</CardTitle>
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
                  <Label>Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Physical">Physical</SelectItem>
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Owner</Label>
                  <Input
                    value={formData.owner}
                    onChange={(e) => handleChange("owner", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                    min={0}
                  />
                </div>
                <div>
                  <Label>Value ($)</Label>
                  <Input
                    type="number"
                    value={formData.value}
                    onChange={(e) => handleChange("value", e.target.value)}
                    min={0}
                    step="0.01"
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
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Disposed">Disposed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Purchase Date</Label>
                  <Input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) =>
                      handleChange("purchaseDate", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Depreciation ($)</Label>
                  <Input
                    type="number"
                    value={formData.depreciation}
                    onChange={(e) =>
                      handleChange("depreciation", e.target.value)
                    }
                    min={0}
                    step="0.01"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Update"}
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
