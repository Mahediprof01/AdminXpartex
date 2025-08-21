"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Edit,
  Factory,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Eye,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useManufacturerStore } from "@/lib/store";

import { notFound } from "next/navigation";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";

const productsList = [
  {
    id: "PROD001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    stock: 150,
    status: "active",
    createdAt: "2024-01-15",
    description: "High-quality wireless headphones with noise cancellation",
    vendor: "TechCorp Solutions",
    sku: "WH-001-BLK",

    // Orders placed for this product
    orderList: [
      {
        orderId: "ORD001",
        customer: "Acme Wholesale",
        quantity: 50,
        pricePerUnit: 99.99,
        totalPrice: 4999.5,
        status: "delivered",
        orderDate: "2025-08-01",
        deliveryDate: "2025-08-10",
      },
      {
        orderId: "ORD002",
        customer: "Global Retail",
        quantity: 30,
        pricePerUnit: 99.99,
        totalPrice: 2999.7,
        status: "pending",
        orderDate: "2025-08-05",
        deliveryDate: null,
      },
    ],

    // Product order received summary
    productOrderReceived: {
      totalOrders: 2,
      totalDelivered: 1,
      totalPending: 1,
      totalQuantityOrdered: 80,
      totalRevenue: 7999.2,
    },
  },

  {
    id: "PROD002",
    name: "Smart Watch",
    category: "Electronics",
    price: 299.99,
    stock: 75,
    status: "active",
    createdAt: "2024-01-14",
    description: "Advanced smartwatch with health monitoring",
    vendor: "Global Electronics",
    sku: "SW-002-SLV",

    orderList: [
      {
        orderId: "ORD003",
        customer: "Tech Retailers",
        quantity: 20,
        pricePerUnit: 299.99,
        totalPrice: 5999.8,
        status: "delivered",
        orderDate: "2025-07-25",
        deliveryDate: "2025-07-30",
      },
      {
        orderId: "ORD004",
        customer: "Smart Gadgets Ltd",
        quantity: 10,
        pricePerUnit: 299.99,
        totalPrice: 2999.9,
        status: "pending",
        orderDate: "2025-08-06",
        deliveryDate: null,
      },
    ],

    productOrderReceived: {
      totalOrders: 2,
      totalDelivered: 1,
      totalPending: 1,
      totalQuantityOrdered: 30,
      totalRevenue: 8999.7,
    },
  },
];

const revenueList = [
  { month: "January", amount: 120000, orders: 50 },
  { month: "February", amount: 95000, orders: 40 },
  { month: "March", amount: 150000, orders: 65 },
  { month: "April", amount: 110000, orders: 55 },
  { month: "May", amount: 175000, orders: 75 },
  { month: "June", amount: 200000, orders: 90 },
];

export default function ManufacturerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { getManufacturer } = useManufacturerStore();
  // Next.js 14+ compatibility: use React.use() if params is a promise, otherwise use directly
  let id: string;
  // Feature-detect if params is a promise (async route)
  if (
    typeof (params as any)?.then === "function" ||
    typeof (params as any)?.[Symbol.asyncIterator] === "function"
  ) {
    // @ts-ignore
    id = React.use(params).id;
  } else {
    id = params.id;
  }
  const manufacturer = getManufacturer(id);

  if (!manufacturer) {
    notFound();
  }

  // --- Tab state for table selection ---
  const [activeTab, setActiveTab] = React.useState<"products" | "revenue">(
    "products"
  );

  const productColumns: ColumnDef<any>[] = [
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
      header: "Product ID",
      cell: ({ row }) => (
        <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded max-w-[100px] truncate">
          {row.getValue("id")}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
        </Button>
      ),
      cell: ({ row }) => (
        <Link
          href={`/product-retail/${row.original.id}`}
          className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer block max-w-[150px] sm:max-w-[200px] md:max-w-[300px] truncate"
        >
          {row.getValue("name")}
        </Link>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200 whitespace-nowrap"
        >
          {row.getValue("category")}
        </Badge>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = Number(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-BD", {
          style: "currency",
          currency: "BDT",
        }).format(price);
        return (
          <div className="font-semibold text-green-600 whitespace-nowrap">
            {formatted}
          </div>
        );
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const stock = row.getValue("stock") as number;
        const color =
          stock === 0
            ? "text-red-500"
            : stock < 50
            ? "text-orange-500"
            : "text-green-600";
        return (
          <div className={`font-medium whitespace-nowrap ${color}`}>
            {stock} units
          </div>
        );
      },
    },
    {
      accessorKey: "orderList",
      header: "Orders",
      cell: ({ row }) => {
        const orders = row.getValue("orderList") as any[];
        return (
          <div className="whitespace-nowrap font-medium">
            {orders.length} orders
          </div>
        );
      },
    },
    {
      accessorKey: "productOrderReceived",
      header: "Order Received",
      cell: ({ row }) => {
        const summary = row.getValue("productOrderReceived") as any;
        return (
          <div className="flex flex-col text-sm">
            <span>Delivered: {summary.totalDelivered}</span>
            <span>Pending: {summary.totalPending}</span>
            <span>Total Qty: {summary.totalQuantityOrdered}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className={
              status === "active"
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : ""
            }
          >
            {String(status)}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;
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
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link
                  href={`/product-retail/${product.id}`}
                  className="cursor-pointer"
                >
                  <Eye className="mr-2 h-4 w-4 text-blue-500" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/product-retail/update/${product.id}`}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4 text-green-500" />
                  Edit Product
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Delete Product
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
      accessorKey: "amount",
      header: "Revenue",
      cell: ({ row }) => {
        const formatted = new Intl.NumberFormat("en-BD", {
          style: "currency",
          currency: "BDT",
        }).format(Number(row.getValue("amount")));
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
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-4 md:p-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/manufactures">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">
            {manufacturer.name}
          </h1>
          <p className="text-muted-foreground">
            Manufacturer ID: {manufacturer.id}
          </p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/manufactures/update/${manufacturer.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Manufacturer
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5 text-purple-500" />
              Manufacturer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="text-sm">{manufacturer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p className="text-sm">{manufacturer.phone}</p>
                </div>
              </div>
              {manufacturer.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Address
                    </p>
                    <p className="text-sm">{manufacturer.address}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Business Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {manufacturer.products}
                </p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                  <DollarSign className="h-5 w-5" />
                  {(manufacturer.revenue / 1000).toFixed(0)}K
                </p>
                <p className="text-sm text-muted-foreground">Revenue</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Status
              </p>
              <Badge
                variant={
                  manufacturer.status === "active" ? "default" : "secondary"
                }
                className={
                  manufacturer.status === "active"
                    ? "bg-green-100 text-green-700"
                    : ""
                }
              >
                {manufacturer.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "products" ? "default" : "outline"}
          onClick={() => setActiveTab("products")}
        >
          Products Table
        </Button>
        <Button
          variant={activeTab === "revenue" ? "default" : "outline"}
          onClick={() => setActiveTab("revenue")}
        >
          Revenue Table
        </Button>
      </div>

      {/* Table Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>
            {activeTab === "products" ? "Products List" : "Revenue Details"}
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {activeTab === "products" ? (
            <DataTable columns={productColumns} data={productsList} />
          ) : (
            <DataTable columns={revenueColumns} data={revenueList} />
          )}
        </CardContent>
      </Card>

      {/* Description */}

      {manufacturer.description && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {manufacturer.description}
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
