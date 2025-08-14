"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Edit,
  Store,
  Mail,
  Phone,
  MapPin,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useVendorStore } from "@/lib/store";
import { notFound } from "next/navigation";
import * as React from "react";

export default function VendorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { getVendor } = useVendorStore();
  // Unwrap params using React.use() for Next.js 14+ compatibility
  const actualParams = React.use(params) as { id: string };
  const vendor = getVendor(actualParams.id);

  if (!vendor) {
    notFound();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-4 md:p-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/supplier-retail">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">
            {vendor.name}
          </h1>
          <p className="text-muted-foreground">Supplier ID: {vendor.id}</p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/supplier-retail/update/${vendor.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Supplier
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5 text-purple-500" />
              Supplier Information
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
                  <p className="text-sm">{vendor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p className="text-sm">{vendor.phone}</p>
                </div>
              </div>
              {vendor.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Address
                    </p>
                    <p className="text-sm">{vendor.address}</p>
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
                  {vendor.products}
                </p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                  <DollarSign className="h-5 w-5" />
                  {(vendor.revenue / 1000).toFixed(0)}K
                </p>
                <p className="text-sm text-muted-foreground">Revenue</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Status
              </p>
              <Badge
                variant={vendor.status === "active" ? "default" : "secondary"}
                className={
                  vendor.status === "active"
                    ? "bg-green-100 text-green-700"
                    : ""
                }
              >
                {vendor.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {vendor.description && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {vendor.description}
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
