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

// Dummy wholesale orders data
const retailOrders = [
  {
    id: "R-ORD001",
    customer: "Retail Buyer 1",
    items: 2,
    price: 1200,
    orderDate: "2024-01-10",
    paymentStatus: "paid",
    shippingStatus: "delivered",
  },
  {
    id: "R-ORD002",
    customer: "Retail Buyer 2",
    items: 1,
    price: 800,
    orderDate: "2024-01-09",
    paymentStatus: "pending",
    shippingStatus: "processing",
  },
  {
    id: "R-ORD003",
    customer: "Retail Buyer 3",
    items: 3,
    price: 2100,
    orderDate: "2024-01-08",
    paymentStatus: "paid",
    shippingStatus: "shipped",
  },
];

export default function UpdateRetailOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const actualParams = React.use(params) as { id: string };
  const order = retailOrders.find((o) => o.id === (actualParams?.id || ""));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer: order?.customer || "",
    items: order?.items?.toString() || "",
    orderDate: order?.orderDate || "",
    paymentStatus: order?.paymentStatus || "pending",
    shippingStatus: order?.shippingStatus || "processing",
  });

  useEffect(() => {
    if (order) {
      setFormData({
        customer: order.customer,
        items: order.items.toString(),
        orderDate: order.orderDate,
        paymentStatus: order.paymentStatus,
        shippingStatus: order.shippingStatus,
      });
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Replace with API update logic
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/orders-retail";
    }, 500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!order) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Retail order not found.
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
          <Link href="/orders-retail">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Retail Order</h1>
          <p className="text-muted-foreground">
            Update the details for this retail order.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Customer</Label>
                  <Input
                    value={formData.customer}
                    onChange={(e) => handleChange("customer", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Number of Items</Label>
                  <Input
                    type="number"
                    value={formData.items}
                    onChange={(e) => handleChange("items", e.target.value)}
                    min={0}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Order Date</Label>
                  <Input
                    type="date"
                    value={formData.orderDate}
                    onChange={(e) => handleChange("orderDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Payment Status</Label>
                  <Select
                    value={formData.paymentStatus}
                    onValueChange={(value) =>
                      handleChange("paymentStatus", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Shipping Status</Label>
                <Select
                  value={formData.shippingStatus}
                  onValueChange={(value) =>
                    handleChange("shippingStatus", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select shipping status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white shadow-lg"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Update"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/orders-retail">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
