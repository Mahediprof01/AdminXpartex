"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const orderSchema = z.object({
  id: z.string().min(1, "Order ID is required"),
  customer: z.string().min(1, "Customer name is required"),
  items: z.number().min(1, "At least 1 item required"),
  total: z.number().min(0, "Total must be positive"),
  orderDate: z.string().min(1, "Order date is required"),
  paymentStatus: z.enum(["paid", "pending", "failed"]),
  shippingStatus: z.enum(["delivered", "shipped", "processing", "cancelled"]),
});

type OrderFormData = z.infer<typeof orderSchema>;

export default function CreateOrderPage() {
  const router = useRouter();
  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      id: "",
      customer: "",
      items: 1,
      total: 0,
      orderDate: new Date().toISOString().slice(0, 10),
      paymentStatus: "pending",
      shippingStatus: "processing",
    },
  });

  const onSubmit = (data: OrderFormData) => {
    console.log("New Order:", data);
    // TODO: Send to API
    router.push("/orders");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl p-6 space-y-6 bg-white rounded-xl shadow-lg"
    >
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Create New Order
          </h1>
          <p className="text-muted-foreground">
            Create a new order in your inventory
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order ID */}
          <div>
            <Label>Order ID</Label>
            <Input {...form.register("id")} placeholder="ORD005" />
            {form.formState.errors.id && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.id.message}
              </p>
            )}
          </div>

          {/* Customer Name */}
          <div>
            <Label>Customer Name</Label>
            <Input {...form.register("customer")} placeholder="John Doe" />
            {form.formState.errors.customer && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.customer.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Items */}
          <div>
            <Label>Items</Label>
            <Input
              type="number"
              {...form.register("items", { valueAsNumber: true })}
            />
            {form.formState.errors.items && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.items.message}
              </p>
            )}
          </div>

          {/* Total */}
          <div>
            <Label>Total (USD)</Label>
            <Input
              type="number"
              step="0.01"
              {...form.register("total", { valueAsNumber: true })}
            />
            {form.formState.errors.total && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.total.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Date */}
          <div>
            <Label>Order Date</Label>
            <Input type="date" {...form.register("orderDate")} />
            {form.formState.errors.orderDate && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.orderDate.message}
              </p>
            )}
          </div>

          {/* Payment Status */}
          <div>
            <Label>Payment Status</Label>
            <Select
              onValueChange={(val) =>
                form.setValue(
                  "paymentStatus",
                  val as OrderFormData["paymentStatus"]
                )
              }
              defaultValue={form.getValues("paymentStatus")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Shipping Status */}
        <div>
          <Label>Shipping Status</Label>
          <Select
            onValueChange={(val) =>
              form.setValue(
                "shippingStatus",
                val as OrderFormData["shippingStatus"]
              )
            }
            defaultValue={form.getValues("shippingStatus")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select shipping status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
        >
          Create Order
        </Button>
      </form>
    </motion.div>
  );
}
