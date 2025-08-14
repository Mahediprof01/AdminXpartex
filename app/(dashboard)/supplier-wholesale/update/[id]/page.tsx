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

// Dummy vendor data
const vendors = [
  {
    id: "VEND001",
    name: "TechCorp Solutions",
    email: "contact@techcorp.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    products: 45,
    revenue: 125000,
    address: "123 Tech Street, Silicon Valley, CA",
    description: "Leading technology solutions provider",
  },
  {
    id: "VEND002",
    name: "Global Electronics",
    email: "info@globalelec.com",
    phone: "+1 (555) 987-6543",
    status: "active",
    products: 32,
    revenue: 89000,
    address: "456 Electronics Ave, Austin, TX",
    description: "Global electronics distributor",
  },
];

export default function UpdateVendorPage({
  params,
}: {
  params: { id: string };
}) {
  const actualParams = React.use(params) as { id: string };
  const vendor = vendors.find((v) => v.id === (actualParams?.id || ""));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: vendor?.name || "",
    email: vendor?.email || "",
    phone: vendor?.phone || "",
    status: vendor?.status || "active",
    products: vendor?.products?.toString() || "",
    revenue: vendor?.revenue?.toString() || "",
    address: vendor?.address || "",
    description: vendor?.description || "",
  });

  useEffect(() => {
    if (vendor) {
      setFormData({
        name: vendor.name,
        email: vendor.email,
        phone: vendor.phone,
        status: vendor.status,
        products: vendor.products.toString(),
        revenue: vendor.revenue.toString(),
        address: vendor.address,
        description: vendor.description,
      });
    }
  }, [vendor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Replace with API update logic
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/supplier-wholesale";
    }, 500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!vendor) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Vendor not found.
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
          <Link href="/supplier-wholesale">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Vendor</h1>
          <p className="text-muted-foreground">
            Update the details for this vendor.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>Vendor Details</CardTitle>
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
                  className="bg-gradient-to-r from-green-600 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Update"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/supplier-wholesale">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
