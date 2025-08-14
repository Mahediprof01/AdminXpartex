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

// Dummy rental items data
const rentalItems = [
  {
    id: "RENT001",
    name: "Excavator",
    category: "Construction Equipment",
    pricePerDay: 250,
    location: "Dhaka",
    status: "available",
  },
  {
    id: "RENT002",
    name: "Event Tent",
    category: "Event Supplies",
    pricePerDay: 40,
    location: "Chittagong",
    status: "rented",
  },
];

export default function UpdateRentalItemPage({
  params,
}: {
  params: { id: string };
}) {
  const actualParams = React.use(params) as { id: string };
  const item = rentalItems.find((r) => r.id === (actualParams?.id || ""));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: item?.name || "",
    category: item?.category || "",
    pricePerDay: item?.pricePerDay?.toString() || "",
    location: item?.location || "",
    status: item?.status || "available",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        pricePerDay: item.pricePerDay.toString(),
        location: item.location,
        status: item.status,
      });
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Replace with API update logic
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/rental";
    }, 500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!item) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Rental item not found.
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
          <Link href="/rental">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Rental Item</h1>
          <p className="text-muted-foreground">
            Update the details for this rental item.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>Rental Item Details</CardTitle>
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
                  <Input
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Price per Day</Label>
                  <Input
                    type="number"
                    value={formData.pricePerDay}
                    onChange={(e) =>
                      handleChange("pricePerDay", e.target.value)
                    }
                    min={0}
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
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-600 hover:to-yellow-600 text-white shadow-lg"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Update"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/rental">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
