"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Edit,
  Truck,
  Calendar,
  Package,
  DollarSign,
  Users,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as React from "react";

const returnOrders = [
  {
    id: "RR001",
    vendor: "RetailMart",
    product: "Rice (5kg)",
    quantity: 2,
    price: 1200,
    total: 2400,
    date: "2024-01-10",
    status: "pending",
  },
  {
    id: "RR002",
    vendor: "Retail Direct",
    product: "Cooking Oil (1L)",
    quantity: 1,
    price: 200,
    total: 200,
    date: "2024-01-09",
    status: "approved",
  },
  {
    id: "RR003",
    vendor: "Everyday Retail",
    product: "Sugar (2kg)",
    quantity: 3,
    price: 150,
    total: 450,
    date: "2024-01-08",
    status: "delivered",
  },
];

export default function ReturnWholeSaleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const actualParams = React.use(params) as { id: string };

  const order = React.useMemo(
    () => returnOrders.find((o) => o.id === actualParams.id),
    [actualParams.id]
  );

  if (!order) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Return order not found.
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/return-retail">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">
            {order.id}
          </h1>
          <p className="text-muted-foreground">Supplier: {order.vendor}</p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/return-retail/update/${order.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Order
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-500" />
              Return Order Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Return order <strong>{order.id}</strong> from{" "}
              <strong>{order.vendor}</strong> includes{" "}
              <strong>{order.quantity}</strong> units of{" "}
              <strong>{order.product}</strong> totaling{" "}
              <strong>${order.total.toLocaleString()}</strong>.
            </p>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Info
                  label="Supplier"
                  value={order.vendor}
                  icon={<Users className="h-4 w-4 text-purple-500" />}
                />
                <Info
                  label="Product"
                  value={order.product}
                  icon={<Package className="h-4 w-4 text-green-500" />}
                />
                <Info
                  label="Quantity"
                  value={order.quantity}
                  icon={<Package className="h-4 w-4 text-blue-500" />}
                />
                <Info
                  label="Total"
                  value={`$${order.total.toLocaleString()}`}
                  icon={<DollarSign className="h-4 w-4 text-orange-500" />}
                />
                <Info
                  label="Order Date"
                  value={new Date(order.date).toLocaleDateString()}
                  icon={<Calendar className="h-4 w-4 text-blue-500" />}
                />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge
                    className={
                      order.status === "approved" ||
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <span className="flex items-center gap-1">
        {icon}
        {value}
      </span>
    </div>
  );
}
