"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Package, DollarSign } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as React from "react";

// Dummy inventory dataset
const dummyInventory = [
  {
    id: "INV001",
    name: "Wireless Mouse",
    sku: "WM-1001",
    vendor: "TechCorp Solutions",
    quantity: 120,
    inbound: 50,
    price: 25.99,
    status: "in_stock",
    createdAt: "2025-08-01",
    category: "Electronics",
    location: "Warehouse A - Rack 3",
    reorderPoint: 50,
    safetyStock: 30,
    lastSoldUnits: 20,
  },
  {
    id: "INV002",
    name: "Mechanical Keyboard",
    sku: "MK-2002",
    vendor: "Global Gear Ltd",
    quantity: 15,
    inbound: 0,
    price: 79.99,
    status: "in_stock",
    createdAt: "2025-07-28",
    category: "Electronics",
    location: "Warehouse B - Rack 1",
    reorderPoint: 20,
    safetyStock: 10,
    lastSoldUnits: 7,
  },
  {
    id: "INV003",
    name: "Gaming Headset",
    sku: "GH-3003",
    vendor: "ProAudio Inc",
    quantity: 5,
    inbound: 20,
    price: 49.5,
    status: "in_stock",
    createdAt: "2025-07-25",
    category: "Electronics",
    location: "Warehouse A - Rack 5",
    reorderPoint: 10,
    safetyStock: 5,
    lastSoldUnits: 12,
  },
  {
    id: "INV004",
    name: "USB-C Cable 1m",
    sku: "UC-4004",
    vendor: "CableMasters",
    quantity: 0,
    inbound: 100,
    price: 8.99,
    status: "out_of_stock",
    createdAt: "2025-08-05",
    category: "Accessories",
    location: "Warehouse C - Rack 2",
    reorderPoint: 50,
    safetyStock: 20,
    lastSoldUnits: 50,
  },
  {
    id: "INV005",
    name: "Laptop Stand Adjustable",
    sku: "LS-5005",
    vendor: "ErgoGoods",
    quantity: 60,
    inbound: 0,
    price: 35.0,
    status: "in_stock",
    createdAt: "2025-08-10",
    category: "Office",
    location: "Warehouse B - Rack 4",
    reorderPoint: 30,
    safetyStock: 15,
    lastSoldUnits: 10,
  },
  {
    id: "INV006",
    name: "External Hard Drive 1TB",
    sku: "HD-6006",
    vendor: "StoragePlus",
    quantity: 8,
    inbound: 15,
    price: 59.99,
    status: "in_stock",
    createdAt: "2025-07-30",
    category: "Electronics",
    location: "Warehouse A - Rack 2",
    reorderPoint: 10,
    safetyStock: 5,
    lastSoldUnits: 4,
  },
];

export default function InventoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const actualParams = React.use(params); // unwrap the promise
  const item = dummyInventory.find((i) => i.id === actualParams.id);

  if (!item) notFound();

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
          <Link href="/inventory">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">
            {item.name}
          </h1>
          <p className="text-muted-foreground">Inventory ID: {item.id}</p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/inventory/update/${item.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Item
          </Link>
        </Button>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Image Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-green-500" />
              Item Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Name
                  </p>
                  <p className="text-sm font-semibold">{item.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Category
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {item.category}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Price
                  </p>
                  <p className="text-lg font-bold text-green-600 flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {item.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Quantity
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      item.quantity === 0
                        ? "text-red-500"
                        : item.quantity < 10
                        ? "text-orange-500"
                        : "text-green-600"
                    }`}
                  >
                    {item.quantity} units
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge
                    variant={
                      item.status === "in_stock" ? "default" : "secondary"
                    }
                    className={
                      item.status === "in_stock"
                        ? "bg-green-100 text-green-700"
                        : ""
                    }
                  >
                    {item.status === "in_stock" ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    SKU
                  </p>
                  <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                    {item.sku}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Inventory Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Description
                </p>
                <p className="text-sm">{item.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Vendor
                  </p>
                  <p className="text-sm font-semibold">{item.vendor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Location
                  </p>
                  <p className="text-sm">{item.location}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Reorder Point
                  </p>
                  <p className="text-sm">{item.reorderPoint}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Safety Stock
                  </p>
                  <p className="text-sm">{item.safetyStock}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Last Sold Units
                  </p>
                  <p className="text-sm">{item.lastSoldUnits}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Created At
                </p>
                <p className="text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
