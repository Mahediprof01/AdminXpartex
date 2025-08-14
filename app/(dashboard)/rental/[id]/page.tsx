"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Tag, MapPin, DollarSign } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as React from "react";

const rentalItems = [
  {
    id: "RENT001",
    name: "Excavator",
    category: "Construction Equipment",
    pricePerDay: 250,
    location: "Dhaka",
    status: "available",
  },
  {
    id: "RENT002",
    name: "Event Tent",
    category: "Event Supplies",
    pricePerDay: 40,
    location: "Chittagong",
    status: "rented",
  },
];

export default function RentalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const actualParams = React.use(params) as { id: string };

  const rental = React.useMemo(
    () => rentalItems.find((r) => r.id === actualParams.id),
    [actualParams.id]
  );

  if (!rental) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Rental item not found.
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
          <Link href="/rental">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">
            {rental.name}
          </h1>
          <p className="text-muted-foreground">Rental ID: {rental.id}</p>
        </div>
        <Button asChild className="whitespace-nowrap">
          <Link href={`/rental/update/${rental.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Rental
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-blue-500" />
              Rental Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The rental item <strong>{rental.name}</strong> falls under{" "}
              <strong>{rental.category}</strong> category, located in{" "}
              <strong>{rental.location}</strong> with a daily price of{" "}
              <strong>${rental.pricePerDay}</strong>.
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
                <Info label="Name" value={rental.name} />
                <Info
                  label="Category"
                  value={rental.category}
                  icon={<Tag className="h-4 w-4 text-purple-500" />}
                />
                <Info
                  label="Price per Day"
                  value={`$${rental.pricePerDay}`}
                  icon={<DollarSign className="h-4 w-4 text-blue-500" />}
                />
                <Info
                  label="Location"
                  value={rental.location}
                  icon={<MapPin className="h-4 w-4 text-green-500" />}
                />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge
                    className={
                      rental.status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {rental.status.charAt(0).toUpperCase() +
                      rental.status.slice(1)}
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
