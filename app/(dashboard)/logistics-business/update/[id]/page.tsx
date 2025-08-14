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

// Dummy order data
const orders = [
  {
    id: "1",
    orderId: "ORD-001",
    customer: "John Doe",
    partner: "DHL",
    status: "In Transit",
    transactionId: "TXN-12345",
    completed: false,
    createdAt: "2025-08-12",
  },
];

export default function UpdateOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const actualParams = React.use(params) as { id: string };
  const order = orders.find((o) => o.id === (actualParams?.id || ""));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    orderId: order?.orderId || "",
    customer: order?.customer || "",
    partner: order?.partner || "",
    status: order?.status || "Pending",
    transactionId: order?.transactionId || "",
    completed: order?.completed ? "true" : "false",
    createdAt: order?.createdAt || "",
  });

  useEffect(() => {
    if (order) {
      setFormData({
        orderId: order.orderId,
        customer: order.customer,
        partner: order.partner,
        status: order.status,
        transactionId: order.transactionId,
        completed: order.completed ? "true" : "false",
        createdAt: order.createdAt,
      });
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Replace with API update logic
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/logistics-business";
    }, 500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!order) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Order not found.
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
          <Link href="/logistics-business">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Order</h1>
          <p className="text-muted-foreground">
            Update the details for this order.
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
                  <Label>Order ID</Label>
                  <Input
                    value={formData.orderId}
                    onChange={(e) => handleChange("orderId", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Customer</Label>
                  <Input
                    value={formData.customer}
                    onChange={(e) => handleChange("customer", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Partner</Label>
                  <Input
                    value={formData.partner}
                    onChange={(e) => handleChange("partner", e.target.value)}
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
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Transit">In Transit</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Transaction ID</Label>
                  <Input
                    value={formData.transactionId}
                    onChange={(e) =>
                      handleChange("transactionId", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Completed</Label>
                  <Select
                    value={formData.completed}
                    onValueChange={(value) => handleChange("completed", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select completed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Created At</Label>
                <Input
                  type="date"
                  value={formData.createdAt}
                  onChange={(e) => handleChange("createdAt", e.target.value)}
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
                  <Link href="/logistics-business">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
