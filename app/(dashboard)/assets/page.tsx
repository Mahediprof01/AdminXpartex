"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  Layers,
  TrendingDown,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/data-table";
import Link from "next/link";
import { DatePicker } from "@/components/ui/date-picker";

// Dummy Assets Dataset
const assetsData = [
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

export default function AssetsPage() {
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(
    null
  );

  const filteredData = assetsData.filter((item) => {
    if (selectedDateFilter) {
      const today = new Date();
      const itemDate = new Date(item.purchaseDate);
      switch (selectedDateFilter) {
        case "today":
          return itemDate.toDateString() === today.toDateString();
        case "thisWeek":
          const firstDayOfWeek = new Date(
            today.setDate(today.getDate() - today.getDay())
          );
          return itemDate >= firstDayOfWeek;
        case "thisMonth":
          return (
            itemDate.getMonth() === today.getMonth() &&
            itemDate.getFullYear() === today.getFullYear()
          );
        case "thisYear":
          return itemDate.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    }
    return true;
  });

  // KPIs
  const totalAssets = assetsData.length;
  const underMaintenanceAssets = assetsData.filter(
    (item) => item.status === "Under Maintenance"
  ).length;
  const totalAssetValue = assetsData.reduce(
    (sum, item) => sum + item.value * item.quantity,
    0
  );
  const highestValueAsset =
    assetsData.sort((a, b) => b.value - a.value)[0]?.name || "N/A";

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this asset?")) {
      alert(`Deleted asset ${id} (dummy action)`);
    }
  };

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        { label: "Under Maintenance", value: "Under Maintenance" },
        { label: "Retired", value: "Retired" },
      ],
    },
    {
      key: "purchaseDate",
      label: "Acquired On",
      options: [
        { label: "Today", value: "today" },
        { label: "This Week", value: "thisWeek" },
        { label: "This Month", value: "thisMonth" },
        { label: "This Year", value: "thisYear" },
      ],
    },
  ];

  const columns: ColumnDef<(typeof assetsData)[0]>[] = [
    {
      id: "sl",
      header: "SL",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "id",
      header: "Asset ID",
    },
    {
      accessorKey: "name",
      header: "Asset Name",
    },
    {
      accessorKey: "type",
      header: "Asset Type",
    },
    {
      accessorKey: "owner",
      header: "Vendor / Owner",
    },
    {
      accessorKey: "quantity",
      header: "Quantity / Units",
    },
    {
      accessorKey: "value",
      header: "Value ($)",
      cell: ({ row }) =>
        `$${Number(row.getValue("value")).toLocaleString("en-US")}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        const color =
          status === "Active"
            ? "bg-green-100 text-green-700"
            : status === "Inactive"
            ? "bg-gray-100 text-gray-700"
            : status === "Under Maintenance"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700";
        return <Badge className={`px-2 py-1 ${color}`}>{status}</Badge>;
      },
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "purchaseDate",
      header: "Acquired On",
      cell: ({ row }) =>
        new Date(row.getValue("purchaseDate")).toLocaleDateString(),
    },
    {
      accessorKey: "depreciation",
      header: "Depreciation ($)",
      cell: ({ row }) =>
        `$${Number(row.getValue("depreciation")).toLocaleString("en-US")}`,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const asset = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/assets/${asset.id}`}>
                  <Eye className="mr-2 h-4 w-4 text-blue-500" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/assets/update/${asset.id}`}>
                  <Edit className="mr-2 h-4 w-4 text-green-500" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer focus:text-red-600"
                onClick={() => handleDelete(asset.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
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
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Assets</p>
            <p className="text-2xl font-bold">{totalAssets}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Under Maintenance</p>
            <p className="text-2xl font-bold">{underMaintenanceAssets}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4">
          <div className="bg-green-100 text-green-600 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Asset Value</p>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalAssetValue)}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Highest Value Asset</p>
            <p className="text-2xl font-bold">{highestValueAsset}</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold"></h2>
        <Button
          asChild
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg whitespace-nowrap"
        >
          <Link href="/assets/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Asset
          </Link>
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex items-center justify-between gap-2 mb-4">
          <Layers className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">All Assets</h3>
          <Badge variant="secondary" className="ml-auto">
            {assetsData.length} total
          </Badge>
        </div>

        <div className="mb-4">
          <DatePicker
            dateRange={{ from: null, to: null }}
            setDateRange={() => {}}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          searchKey="name"
          searchPlaceholder="Search assets..."
          filterOptions={filterOptions}
        />
      </div>
    </motion.div>
  );
}
