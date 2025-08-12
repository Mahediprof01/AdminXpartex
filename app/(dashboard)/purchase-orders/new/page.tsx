"use client";

import { useForm } from "react-hook-form";
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
import { useEffect } from "react";

type PurchaseOrderForm = {
  id: string;
  vendor: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  status: string;
};

export default function CreatePurchaseOrderPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PurchaseOrderForm>({
    defaultValues: {
      id: "",
      vendor: "",
      product: "",
      quantity: 1,
      price: 0,
      total: 0,
      date: new Date().toISOString().slice(0, 10),
      status: "pending",
    },
  });

  // Auto-calculate total when quantity or price changes
  const quantity = watch("quantity");
  const price = watch("price");
  useEffect(() => {
    setValue("total", quantity * price);
  }, [quantity, price, setValue]);

  const onSubmit = (data: PurchaseOrderForm) => {
    console.log("New Purchase Order:", data);
    // TODO: Save to DB via API call
    router.push("/purchase-orders");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl p-6 bg-white rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
        Create Purchase Order
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {" "}
          {/* Purchase ID */}
          <div>
            <Label>Purchase ID</Label>
            <Input
              {...register("id", { required: "Purchase ID is required" })}
              placeholder="PO005"
            />
            {errors.id && (
              <p className="text-red-500 text-sm">{errors.id.message}</p>
            )}
          </div>
          {/* Vendor */}
          <div>
            <Label>Vendor</Label>
            <Input
              {...register("vendor", { required: "Vendor name is required" })}
              placeholder="TechCorp Solutions"
            />
            {errors.vendor && (
              <p className="text-red-500 text-sm">{errors.vendor.message}</p>
            )}
          </div>
        </div>

        {/* Product */}
        <div>
          <Label>Product</Label>
          <Input
            {...register("product", { required: "Product name is required" })}
            placeholder="Wireless Headphones"
          />
          {errors.product && (
            <p className="text-red-500 text-sm">{errors.product.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quantity */}
          <div>
            <Label>Quantity</Label>
            <Input
              type="number"
              {...register("quantity", {
                valueAsNumber: true,
                required: true,
                min: 1,
              })}
            />
          </div>

          {/* Unit Price */}
          <div>
            <Label>Unit Price (USD)</Label>
            <Input
              type="number"
              step="0.01"
              {...register("price", {
                valueAsNumber: true,
                required: true,
                min: 0,
              })}
            />
          </div>

          {/* Total */}
          <div>
            <Label>Total (USD)</Label>
            <Input
              type="number"
              {...register("total", { valueAsNumber: true })}
              readOnly
              className="bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div>
            <Label>Date</Label>
            <Input type="date" {...register("date", { required: true })} />
          </div>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <Select
              onValueChange={(val) => setValue("status", val)}
              defaultValue="pending"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
        >
          Create Purchase Order
        </Button>
      </form>
    </motion.div>
  );
}
