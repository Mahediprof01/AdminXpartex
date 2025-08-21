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
  DollarSign,
  MoreHorizontal,
  Eye,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";

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
    totalOrders: 1200,
    totalCompletedOrders: 1000,
    totalServices: 5,
  },
  {
    id: "2",
    orderId: "ORD-002",
    customer: "Jane Smith",
    partner: "FedEx",
    status: "Delivered",
    transactionId: "TXN-67890",
    completed: true,
    createdAt: "2025-08-14",
    totalOrders: 2500,
    totalCompletedOrders: 2000,
    totalServices: 7,
  },
  {
    id: "3",
    orderId: "ORD-003",
    customer: "Michael Lee",
    partner: "UPS",
    status: "Completed",
    transactionId: "TXN-54321",
    completed: true,
    createdAt: "2025-08-15",
    totalOrders: 1800,
    totalCompletedOrders: 1500,
    totalServices: 8,
  },
];

const logisticsServices = [
  {
    id: "W-ORD001",
    customer: "Acme Wholesale",
    items: 10,
    servicesCount: 3,
    servicesAmount: 15000, // total service charges in BDT
    services: ["Standard Shipping", "Insurance", "Tracking & Notifications"],
    orderDate: "2024-01-10",
    deliveryDate: "2024-01-15",
    paymentStatus: "Paid",
    shippingStatus: "Delivered",
    trackingId: "DHL-TRK-1001",
    destination: "New York, USA",
    weight: "15kg",
    partner: "DHL",
    shipmentType: "Garments - T-Shirts",
  },
  {
    id: "W-ORD002",
    customer: "BulkMart",
    items: 5,
    servicesCount: 2,
    servicesAmount: 8000,
    services: ["Express Shipping", "Fragile Handling"],
    orderDate: "2024-01-09",
    deliveryDate: "2024-01-13",
    paymentStatus: "Pending",
    shippingStatus: "Processing",
    trackingId: "DHL-TRK-1002",
    destination: "Berlin, Germany",
    weight: "8kg",
    partner: "DHL",
    shipmentType: "Paper Documents",
  },
  {
    id: "W-ORD003",
    customer: "Wholesale Direct",
    items: 20,
    servicesCount: 4,
    servicesAmount: 25000,
    services: [
      "Express Shipping",
      "Insurance",
      "Fragile Handling",
      "Tracking & Notifications",
    ],
    orderDate: "2024-01-08",
    deliveryDate: "2024-01-14",
    paymentStatus: "Paid",
    shippingStatus: "Shipped",
    trackingId: "DHL-TRK-1003",
    destination: "Tokyo, Japan",
    weight: "25kg",
    partner: "DHL",
    shipmentType: "Garments - Jeans",
  },
];

const completedOrdersData = [
  {
    month: "January 2025",
    revenue: 1250000,
    orders: 150,
    servicesCount: 180, // total logistics services handled
    avgDeliveryTime: 3.5, // in days
    totalWeight: 1250, // in kg
    topCarrier: "DHL",
    onTimePercentage: 92, // %
    avgRevenuePerOrder: 8333, // BDT
  },
  {
    month: "February 2025",
    revenue: 980000,
    orders: 120,
    servicesCount: 140,
    avgDeliveryTime: 4,
    totalWeight: 1000,
    topCarrier: "FedEx",
    onTimePercentage: 88,
    avgRevenuePerOrder: 8166,
  },
  {
    month: "March 2025",
    revenue: 1450000,
    orders: 180,
    servicesCount: 200,
    avgDeliveryTime: 3.2,
    totalWeight: 1500,
    topCarrier: "DHL",
    onTimePercentage: 95,
    avgRevenuePerOrder: 8055,
  },
  {
    month: "April 2025",
    revenue: 1100000,
    orders: 140,
    servicesCount: 160,
    avgDeliveryTime: 3.8,
    totalWeight: 1200,
    topCarrier: "UPS",
    onTimePercentage: 90,
    avgRevenuePerOrder: 7857,
  },
  {
    month: "May 2025",
    revenue: 1320000,
    orders: 160,
    servicesCount: 180,
    avgDeliveryTime: 3.6,
    totalWeight: 1350,
    topCarrier: "DHL",
    onTimePercentage: 93,
    avgRevenuePerOrder: 8250,
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

  // --- Tab state for table selection ---
  const [activeTab, setActiveTab] = React.useState<"services" | "order">(
    "services"
  );

  const orderColumns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
          className="rounded border-gray-300"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
          className="rounded border-gray-300"
        />
      ),
    },
    {
      id: "sl",
      header: "SL",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => (
        <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded max-w-[120px] truncate">
          {row.getValue("id")}
        </div>
      ),
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => (
        <div className="font-medium truncate max-w-[200px]">
          {row.getValue("customer")}
        </div>
      ),
    },
    {
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => (
        <div className="text-center font-semibold">{row.getValue("items")}</div>
      ),
    },
    {
      accessorKey: "servicesCount",
      header: "Services Enrolled",
      cell: ({ row }) => (
        <div className="text-center font-semibold text-blue-600">
          {row.getValue("servicesCount")}
        </div>
      ),
    },
    {
      accessorKey: "services",
      header: "Services",
      cell: ({ row }) => {
        const services: string[] = row.getValue("services") || [];
        return (
          <div className="max-w-[200px] truncate">
            <span
              title={services.join(", ")}
              className="cursor-help text-sm text-gray-700"
            >
              {services.slice(0, 2).join(", ")}
              {services.length > 2 ? `, +${services.length - 2} more` : ""}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "servicesAmount",
      header: "Service Amount (BDT)",
      cell: ({ row }) => {
        const amount = Number(row.getValue("servicesAmount"));
        const formatted = new Intl.NumberFormat("en-BD", {
          style: "currency",
          currency: "BDT",
        }).format(amount);
        return (
          <div className="font-semibold text-green-600 whitespace-nowrap">
            {formatted}
          </div>
        );
      },
    },
    {
      accessorKey: "orderDate",
      header: "Order Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("orderDate")).toLocaleDateString();
        return <div className="whitespace-nowrap">{date}</div>;
      },
    },
    {
      accessorKey: "deliveryDate",
      header: "Delivery Date",
      cell: ({ row }) => {
        const date = row.getValue("deliveryDate")
          ? new Date(row.getValue("deliveryDate")).toLocaleDateString()
          : "—";
        return <div className="whitespace-nowrap">{date}</div>;
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => {
        const status = row.getValue("paymentStatus");
        return (
          <Badge
            variant="outline"
            className={
              status === "Paid"
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-yellow-100 text-yellow-700 border-yellow-200"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "shippingStatus",
      header: "Shipping",
      cell: ({ row }) => {
        const status = row.getValue("shippingStatus");
        let badgeClass = "bg-gray-100 text-gray-700 border-gray-200";

        if (status === "Delivered")
          badgeClass = "bg-green-100 text-green-700 border-green-200";
        else if (status === "Shipped")
          badgeClass = "bg-blue-100 text-blue-700 border-blue-200";
        else if (status === "Processing")
          badgeClass = "bg-yellow-100 text-yellow-700 border-yellow-200";

        return (
          <Badge
            variant="outline"
            className={`${badgeClass} whitespace-nowrap`}
          >
            {status}
          </Badge>
        );
      },
    },

    {
      accessorKey: "shipmentType",
      header: "Product",
      cell: ({ row }) => (
        <div className="truncate">
          <span className="text-sm text-gray-700">
            {row.getValue("shipmentType")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "destination",
      header: "Destination",
      cell: ({ row }) => (
        <div className="truncate max-w-[180px]">
          {row.getValue("destination")}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-purple-100"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link
                  href={`/logistics-business/orders/${order.id}`}
                  className="cursor-pointer"
                >
                  <Eye className="mr-2 h-4 w-4 text-blue-500" />
                  View Order
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/logistics-business/orders/update/${order.id}`}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4 text-green-500" />
                  Edit Order
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Cancel Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const revenueColumns: ColumnDef<any>[] = [
    {
      accessorKey: "month",
      header: "Month",
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
      cell: ({ row }) => {
        const formatted = new Intl.NumberFormat("en-BD", {
          style: "currency",
          currency: "BDT",
        }).format(Number(row.getValue("revenue")));
        return <div className="text-green-600 font-semibold">{formatted}</div>;
      },
    },
    {
      accessorKey: "orders",
      header: "Orders",
      cell: ({ row }) => (
        <div className="text-blue-600 font-medium">
          {row.getValue("orders")}
        </div>
      ),
    },
    {
      accessorKey: "servicesCount",
      header: "Services Performed",
      cell: ({ row }) => (
        <div className="text-purple-600 font-medium">
          {row.getValue("servicesCount")}
        </div>
      ),
    },
    {
      accessorKey: "avgDeliveryTime",
      header: "Avg Delivery (days)",
      cell: ({ row }) => (
        <div className="text-orange-600 font-medium">
          {row.getValue("avgDeliveryTime")}
        </div>
      ),
    },
    {
      accessorKey: "totalWeight",
      header: "Total Weight (kg)",
      cell: ({ row }) => (
        <div className="text-teal-600 font-medium">
          {row.getValue("totalWeight")}
        </div>
      ),
    },
    {
      accessorKey: "topCarrier",
      header: "Top Carrier",
      cell: ({ row }) => (
        <div className="text-gray-700 font-medium">
          {row.getValue("topCarrier")}
        </div>
      ),
    },
    {
      accessorKey: "onTimePercentage",
      header: "On-Time Delivery (%)",
      cell: ({ row }) => (
        <div className="text-green-700 font-medium">
          {row.getValue("onTimePercentage")}%
        </div>
      ),
    },
    {
      accessorKey: "avgRevenuePerOrder",
      header: "Avg Revenue/Order",
      cell: ({ row }) => {
        const formatted = new Intl.NumberFormat("en-BD", {
          style: "currency",
          currency: "BDT",
        }).format(Number(row.getValue("avgRevenuePerOrder")));
        return <div className="text-indigo-600 font-semibold">{formatted}</div>;
      },
    },
  ];

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
        <div>
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

        {/* Basic Info */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Business Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {order.totalServices}
                  </p>
                  <p className="text-sm text-muted-foreground">Services</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                    {order.totalCompletedOrders}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Order Completed
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Status
                </p>
                <Badge
                  variant={order.status === "active" ? "default" : "secondary"}
                  className={
                    order.status === "active"
                      ? "bg-green-100 text-green-700"
                      : ""
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Table Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "services" ? "default" : "outline"}
          onClick={() => setActiveTab("services")}
        >
          Services Table
        </Button>
        <Button
          variant={activeTab === "order" ? "default" : "outline"}
          onClick={() => setActiveTab("order")}
        >
          Order Table
        </Button>
      </div>

      {/* Table Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>
            {activeTab === "services" ? "Services List" : "Order Details"}
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {activeTab === "services" ? (
            <DataTable columns={orderColumns} data={logisticsServices} />
          ) : (
            <DataTable columns={revenueColumns} data={completedOrdersData} />
          )}
        </CardContent>
      </Card>
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
