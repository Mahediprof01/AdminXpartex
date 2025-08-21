"use client";

import type { Row, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Plus,
  Eye,
  Edit,
  Trash,
  Package,
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
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const inventory = [
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

const vendorData = [
  {
    vendor: "TechCorp",
    totalSales: 60000,
    commission: 6000,
    payout: 54000,
    returns: 2000,
  },
  {
    vendor: "Global Gear",
    totalSales: 40000,
    commission: 4000,
    payout: 36000,
    returns: 1000,
  },
  {
    vendor: "ErgoGoods",
    totalSales: 30000,
    commission: 3000,
    payout: 27000,
    returns: 500,
  },
];

export default function InventoryPage() {
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(
    null
  );
  const [selectedVendor, setSelectedVendor] = useState("all");
  const filteredData = inventory.filter((item) => {
    if (selectedDateFilter) {
      const today = new Date();
      const itemDate = new Date(item.createdAt);
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
  const totalStock = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventory.filter((item) => item.quantity < 10).length;
  const totalInventoryValue = inventory.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const topStockedItem =
    inventory.sort((a, b) => b.quantity - a.quantity)[0]?.name || "N/A";

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      alert(`Deleted item ${id} (dummy action)`);
    }
  };

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "In Stock", value: "in_stock" },
        { label: "Out of Stock", value: "out_of_stock" },
      ],
    },
    {
      key: "createdAt",
      label: "Added On",
      options: [
        { label: "Today", value: "today" },
        { label: "This Week", value: "thisWeek" },
        { label: "This Month", value: "thisMonth" },
        { label: "This Year", value: "thisYear" },
      ],
    },
  ];

  const columns: ColumnDef<(typeof inventory)[0]>[] = [
    {
      id: "sl",
      header: "SL",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded max-w-[100px] truncate">
          {row.getValue("id")}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Item Name",
      cell: ({ row }) => (
        <span className="font-medium text-gray-800">
          {row.getValue("name")}
        </span>
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "vendor",
      header: "Vendor",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => (
        <span
          className={`font-semibold ${
            (row.getValue("quantity") as number) < 10
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {row.getValue("quantity")}
        </span>
      ),
    },
    {
      accessorKey: "price",
      header: "Unit Price",
      cell: ({ row }) => (
        <span className="text-gray-700">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(row.getValue("price"))}
        </span>
      ),
    },
    {
      id: "totalValue",
      header: "Total Value",
      cell: ({ row }) => {
        const total = row.original.price * row.original.quantity;
        return (
          <span className="font-semibold text-blue-600">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </span>
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
            variant={status === "in_stock" ? "default" : "secondary"}
            className={
              status === "in_stock"
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-red-100 text-red-700"
            }
          >
            {status === "in_stock" ? "In Stock" : "Out of Stock"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Added On",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return <span>{date.toLocaleDateString()}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
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
                <Link href={`/inventory/${item.id}`}>
                  <Eye className="mr-2 h-4 w-4 text-blue-500" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/inventory/update/${item.id}`}>
                  <Edit className="mr-2 h-4 w-4 text-green-500" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer focus:text-red-600"
                onClick={() => handleDelete(item.id)}
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
            <p className="text-gray-500 text-sm">Total Stock</p>
            <p className="text-2xl font-bold">{totalStock}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-lg">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Low Stock Items</p>
            <p className="text-2xl font-bold">{lowStockItems}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4">
          <div className="bg-green-100 text-green-600 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Inventory Value</p>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalInventoryValue)}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Top Stocked Item</p>
            <p className="text-2xl font-bold">{topStockedItem}</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold"></h2>
        <Button
          asChild
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg whitespace-nowrap"
        >
          <Link href="/inventory/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Inventory Item
          </Link>
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex items-center justify-between gap-2 mb-4">
          <Package className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">All Inventory Items</h3>
          <Badge variant="secondary" className="ml-auto">
            {inventory.length} total
          </Badge>
        </div>

        <div className="flex items-center justify-between mb-4">
          <DatePicker
            dateRange={{ from: null, to: null }}
            setDateRange={() => {}}
          />

          <Select
            value={selectedVendor}
            onValueChange={(value) => setSelectedVendor(value)}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select Vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vendors</SelectItem>
              {vendorData.map((v) => (
                <SelectItem key={v.vendor} value={v.vendor}>
                  {v.vendor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          searchKey="name"
          searchPlaceholder="Search inventory..."
          filterOptions={filterOptions}
        />
      </div>
    </motion.div>
  );
}
