"use client";

import type { Row, Table, Column } from "@tanstack/react-table";
import React from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Eye, Edit, Trash, KeyRound } from "lucide-react";
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

// Dummy data for rental items
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

type RentalItem = (typeof rentalItems)[number];

export default function RentalPage() {
  const [items, setItems] = React.useState<RentalItem[]>(rentalItems);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this rental item?")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Available", value: "available" },
        { label: "Rented", value: "rented" },
      ],
    },
  ];

  const columns: import("@tanstack/react-table").ColumnDef<RentalItem, any>[] =
    [
      {
        id: "select",
        header: ({ table }: { table: Table<RentalItem> }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) =>
              table.toggleAllPageRowsSelected(!!e.target.checked)
            }
            className="rounded border-gray-300"
          />
        ),
        cell: ({ row }: { row: Row<RentalItem> }) => (
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
        header: "Rental ID",
        cell: ({ row }) => (
          <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded max-w-[100px] truncate">
            {row.getValue("id")}
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }: { column: Column<RentalItem, unknown> }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Item Name
            </Button>
          );
        },
        cell: ({ row }: { row: Row<RentalItem> }) => (
          <Link
            href={`/rental/${row.original.id}`}
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
          <span className="text-sm text-gray-700">
            {row.getValue("category")}
          </span>
        ),
      },
      {
        accessorKey: "pricePerDay",
        header: "Price/Day",
        cell: ({ row }) => (
          <span className="font-semibold text-blue-700 whitespace-nowrap">
            ${row.getValue("pricePerDay")}
          </span>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
          <span className="text-xs text-gray-500 max-w-[120px] block truncate">
            {row.getValue("location")}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: Row<RentalItem> }) => {
          const status = row.getValue("status");
          return (
            <Badge
              variant={status === "available" ? "default" : "secondary"}
              className={
                status === "available"
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
        cell: ({ row }: { row: Row<RentalItem> }) => {
          const item = row.original;
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
                  <Link href={`/rental/${item.id}`} className="cursor-pointer">
                    <Eye className="mr-2 h-4 w-4 text-blue-500" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/rental/update/${item.id}`}
                    className="cursor-pointer"
                  >
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">
            Rental Items
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage all rental items in the system.
          </p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-yellow-500 to-blue-500 hover:from-yellow-600 hover:to-blue-600 text-white shadow-lg whitespace-nowrap"
        >
          <Link href="/rental/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Rental Item
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <KeyRound className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold">All Rental Items</h3>
          <Badge variant="secondary" className="ml-auto">
            {items.length} total
          </Badge>
        </div>
        <DataTable
          columns={columns}
          data={items}
          searchKey="name"
          searchPlaceholder="Search rental items..."
          filterOptions={filterOptions}
        />
      </div>
    </motion.div>
  );
}
