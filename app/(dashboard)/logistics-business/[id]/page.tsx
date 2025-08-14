"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Edit,
  Users,
  Truck,
  Hash,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as React from "react";

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

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const actualParams = React.use(params) as { id: string };

  const order = React.useMemo(
    () => orders.find((o) => o.id === actualParams.id),
    [actualParams.id]
  );

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/logistics-business">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">
            {order.orderId}
          </h1>
          <p className="text-muted-foreground">Order ID: {order.id}</p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/logistics-business/update/${order.id}`}>
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
              <Truck className="h-5 w-5 text-blue-500" />
              Order Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Order <strong>{order.orderId}</strong> for customer{" "}
              <strong>{order.customer}</strong> is currently{" "}
              <strong>{order.status}</strong> via{" "}
              <strong>{order.partner}</strong>.
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
                  label="Customer"
                  value={order.customer}
                  icon={<Users className="h-4 w-4 text-purple-500" />}
                />
                <Info
                  label="Delivery Partner"
                  value={order.partner}
                  icon={<Truck className="h-4 w-4 text-green-500" />}
                />
                <Info
                  label="Transaction ID"
                  value={order.transactionId}
                  icon={<Hash className="h-4 w-4 text-blue-500" />}
                />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge
                    className={
                      order.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {order.completed ? "Completed" : order.status}
                  </Badge>
                </div>
                <Info
                  label="Created At"
                  value={new Date(order.createdAt).toLocaleDateString()}
                  icon={<Calendar className="h-4 w-4 text-orange-500" />}
                />
                <Info
                  label="Completed"
                  value={order.completed ? "Yes" : "No"}
                  icon={<CheckCircle className="h-4 w-4 text-green-500" />}
                />
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
