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

// Dummy purchase orders data
const purchaseOrders = [
  {
    id: "WPO001",
    vendor: "BulkMart",
    product: "Bulk Rice Bag",
    quantity: 200,
    total: 240000,
    date: "2024-01-10",
    status: "pending",
  },
  {
    id: "WPO002",
    vendor: "Wholesale Direct",
    product: "Industrial Cleaning Solution",
    quantity: 50,
    total: 17500,
    date: "2024-01-09",
    status: "approved",
  },
  {
    id: "WPO003",
    vendor: "Acme Wholesale",
    product: "Bulk Flour Pack",
    quantity: 100,
    total: 90000,
    date: "2024-01-08",
    status: "delivered",
  },
];

export default function UpdatePurchaseOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const actualParams = React.use(params) as { id: string };
  const order = purchaseOrders.find((o) => o.id === (actualParams?.id || ""));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    vendor: order?.vendor || "",
    product: order?.product || "",
    quantity: order?.quantity?.toString() || "",
    total: order?.total?.toString() || "",
    date: order?.date || "",
    status: order?.status || "pending",
  });

  useEffect(() => {
    if (order) {
      setFormData({
        vendor: order.vendor,
        product: order.product,
        quantity: order.quantity.toString(),
        total: order.total.toString(),
        date: order.date,
        status: order.status,
      });
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Replace with API update logic
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/purchase-wholesale";
    }, 500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!order) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Purchase order not found.
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
          <Link href="/purchase-wholesale">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Purchase Order</h1>
          <p className="text-muted-foreground">
            Update the details for this purchase order.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>Purchase Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Vendor</Label>
                  <Input
                    value={formData.vendor}
                    onChange={(e) => handleChange("vendor", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Product</Label>
                  <Input
                    value={formData.product}
                    onChange={(e) => handleChange("product", e.target.value)}
                    required
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
                  <Label>Total</Label>
                  <Input
                    type="number"
                    value={formData.total}
                    onChange={(e) => handleChange("total", e.target.value)}
                    min={0}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Order Date</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Update"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/purchase-wholesale">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
