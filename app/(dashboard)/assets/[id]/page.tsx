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

// Dummy assets dataset
const dummyAssets = [
  {
    id: "ASSET001",
    name: "Dell Laptop XPS 13",
    type: "Physical",
    owner: "Company",
    quantity: 20,
    value: 1200,
    status: "Active",
    location: "Office HQ",
    purchaseDate: "2023-02-15",
    depreciation: 1000,
  },
  {
    id: "ASSET002",
    name: "Adobe Creative Cloud License",
    type: "Digital",
    owner: "Design Team",
    quantity: 10,
    value: 600,
    status: "Active",
    location: "Cloud",
    purchaseDate: "2024-01-10",
    depreciation: 500,
  },
  {
    id: "ASSET003",
    name: "Delivery Truck",
    type: "Physical",
    owner: "Logistics",
    quantity: 5,
    value: 50000,
    status: "Under Maintenance",
    location: "Warehouse 3",
    purchaseDate: "2022-11-20",
    depreciation: 42000,
  },
];

export default function AssetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const actualParams = React.use(params); // unwrap promise
  const asset = dummyAssets.find((a) => a.id === actualParams.id);

  if (!asset) notFound();

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
          <Link href="/assets">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">
            {asset.name}
          </h1>
          <p className="text-muted-foreground">Asset ID: {asset.id}</p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/assets/update/${asset.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Asset
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
              Asset Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt={asset.name}
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
                  <p className="text-sm font-semibold">{asset.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Type
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {asset.type}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Value
                  </p>
                  <p className="text-lg font-bold text-green-600 flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {asset.value.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Quantity
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      asset.quantity === 0
                        ? "text-red-500"
                        : asset.quantity < 5
                        ? "text-orange-500"
                        : "text-green-600"
                    }`}
                  >
                    {asset.quantity} units
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge
                    variant={
                      asset.status === "Active" ? "default" : "secondary"
                    }
                    className={
                      asset.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {asset.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Owner
                  </p>
                  <p className="text-sm">{asset.owner}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Asset Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Description
                </p>
                <p className="text-sm">{asset.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Location
                  </p>
                  <p className="text-sm">{asset.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Purchase Date
                  </p>
                  <p className="text-sm">
                    {new Date(asset.purchaseDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Depreciation
                  </p>
                  <p className="text-sm">${asset.depreciation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
