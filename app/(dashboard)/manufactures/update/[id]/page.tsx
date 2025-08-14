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

// Dummy manufacturer data
const manufacturers = [
  {
    id: "MANU001",
    name: "Acme Manufacturing",
    email: "info@acmemfg.com",
    phone: "+1 (555) 111-2222",
    status: "active",
    products: 20,
    revenue: 50000,
    address: "789 Industrial Rd, Detroit, MI",
    description: "Leading manufacturer of industrial equipment",
  },
];

export default function UpdateManufacturerPage({
  params,
}: {
  params: { id: string };
}) {
  const actualParams = React.use(params) as { id: string };
  const manufacturer = manufacturers.find(
    (m) => m.id === (actualParams?.id || "")
  );

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: manufacturer?.name || "",
    email: manufacturer?.email || "",
    phone: manufacturer?.phone || "",
    status: manufacturer?.status || "active",
    products: manufacturer?.products?.toString() || "",
    revenue: manufacturer?.revenue?.toString() || "",
    address: manufacturer?.address || "",
    description: manufacturer?.description || "",
  });

  useEffect(() => {
    if (manufacturer) {
      setFormData({
        name: manufacturer.name,
        email: manufacturer.email,
        phone: manufacturer.phone,
        status: manufacturer.status,
        products: manufacturer.products.toString(),
        revenue: manufacturer.revenue.toString(),
        address: manufacturer.address,
        description: manufacturer.description,
      });
    }
  }, [manufacturer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Replace with API update logic
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/manufactures";
    }, 500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!manufacturer) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Manufacturer not found.
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
          <Link href="/manufactures">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Manufacturer</h1>
          <p className="text-muted-foreground">
            Update the details for this manufacturer.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>Manufacturer Details</CardTitle>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Products</Label>
                  <Input
                    type="number"
                    value={formData.products}
                    onChange={(e) => handleChange("products", e.target.value)}
                    min={0}
                  />
                </div>
                <div>
                  <Label>Revenue</Label>
                  <Input
                    type="number"
                    value={formData.revenue}
                    onChange={(e) => handleChange("revenue", e.target.value)}
                    min={0}
                  />
                </div>
              </div>

              <div>
                <Label>Address</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Update"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/manufactures">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
