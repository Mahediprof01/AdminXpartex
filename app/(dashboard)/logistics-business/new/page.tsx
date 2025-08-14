"use client";

import { useState } from "react";
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

export default function NewLogisticsOrderPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    orderId: "",
    customer: "",
    partner: "",
    status: "Pending",
    transactionId: "",
    completed: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Add logic to save logistics order
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/logistics";
    }, 500);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-4 md:p-6"
    >
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/logistics-business">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Add New Logistics Order</h1>
      </div>
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <Card className="border-0 shadow-none max-w-full">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label>Order ID</Label>
                <Input
                  value={formData.orderId}
                  onChange={(e) => handleChange("orderId", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Customer Name</Label>
                <Input
                  value={formData.customer}
                  onChange={(e) => handleChange("customer", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Logistics Partner</Label>
                <Input
                  value={formData.partner}
                  onChange={(e) => handleChange("partner", e.target.value)}
                  required
                />
              </div>
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
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.completed}
                  onChange={(e) => handleChange("completed", e.target.checked)}
                />
                <Label>Completed</Label>
              </div>
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Creating..." : "Create Order"}
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
