"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Factory, Mail, Phone, MapPin, DollarSign } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useManufacturerStore } from "@/lib/store";

import { notFound } from "next/navigation";
import * as React from "react";


export default function ManufacturerDetailPage({ params }: { params: { id: string } }) {
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">{manufacturer.name}</h1>
          <p className="text-muted-foreground">Manufacturer ID: {manufacturer.id}</p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/manufactures/${manufacturer.id}/edit`}>
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
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-sm">{manufacturer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="text-sm">{manufacturer.phone}</p>
                </div>
              </div>
              {manufacturer.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
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
                <p className="text-2xl font-bold text-blue-600">{manufacturer.products}</p>
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
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge
                variant={manufacturer.status === "active" ? "default" : "secondary"}
                className={manufacturer.status === "active" ? "bg-green-100 text-green-700" : ""}
              >
                {manufacturer.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      {manufacturer.description && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{manufacturer.description}</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
