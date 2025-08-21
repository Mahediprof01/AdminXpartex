"use client";

import type { Row, Table, Column } from "@tanstack/react-table";
import type { Vendor } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Plus,
  Eye,
  Edit,
  Trash,
  Building2,
  DollarSign,
  Package,
  Users,
  Calendar,
  Truck,
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
import { useVendorStore } from "@/lib/store";
import { dateFilterFn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";

export default function SuppliersBusinessPage() {
  const { vendors, deleteVendor } = useVendorStore();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this supplier?")) {
      deleteVendor(id);
    }
  };

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    {
      key: "createdAt",
      label: "Registered On",
      options: [
        { label: "Today", value: "today" },
        { label: "This Week", value: "thisWeek" },
        { label: "This Month", value: "thisMonth" },
        { label: "This Year", value: "thisYear" },
      ],
    },
  ];

  // Total registrations this month
  const totalRegistrationsThisMonth = vendors.filter((m) => {
    if (!m.createdAt) return false;
    const date = new Date(m.createdAt);
    return (
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    );
  }).length;

  // Total clients connected
  const totalClientsConnected = vendors.reduce((sum, m) => {
    return sum + (m.suppliers?.length || 0);
  }, 0);

  // Top product ordered across all manufacturers
  const productCount: Record<string, number> = {};
  vendors.forEach((m) => {
    m.orders?.forEach((o) => {
      productCount[o.product] = (productCount[o.product] || 0) + o.quantity;
    });
  });
  const topProductOrdered =
    Object.entries(productCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  // Avg. Manufacturing Price
  const totalRevenue = vendors.reduce((sum, m) => sum + (m.revenue || 0), 0);
  const avgManufacturingPrice = vendors.length
    ? totalRevenue / vendors.length
    : 0;

  const columns: import("@tanstack/react-table").ColumnDef<Vendor, any>[] = [
    {
      id: "select",
      header: ({ table }: { table: Table<Vendor> }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
          className="rounded border-gray-300"
        />
      ),
      cell: ({ row }: { row: Row<Vendor> }) => (
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
      header: "Supplier ID",
      cell: ({ row }) => (
        <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded max-w-[100px] truncate">
          {row.getValue("id")}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }: { column: Column<Vendor, unknown> }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Supplier Name
          </Button>
        );
      },
      cell: ({ row }: { row: Row<Vendor> }) => (
        <Link
          href={`/suppliers-business/${row.original.id}`}
          className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer block max-w-[150px] sm:max-w-[200px] md:max-w-[300px] truncate"
        >
          {row.getValue("name")}
        </Link>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-gray-700">{row.getValue("email")}</span>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <span className="text-sm text-gray-700">{row.getValue("phone")}</span>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
        <span className="text-xs text-gray-500 max-w-[180px] block truncate">
          {row.getValue("address")}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <span className="text-xs text-gray-500 max-w-[180px] block truncate">
          {row.getValue("description")}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Registered On",

      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return <span>{date.toLocaleDateString()}</span>;
      },
      filterFn: dateFilterFn,
    },
    {
      accessorKey: "connectedManufacturers",
      header: "Connected Manufacturers",
      cell: ({ row }) => {
        const manufacturers = row.getValue("connectedManufacturers");
        return (
          <span className="text-sm text-gray-700">{manufacturers ?? 0}</span>
        );
      },
    },
    {
      accessorKey: "mostOrderedProduct",
      header: "Most Ordered Product",
      cell: ({ row }) => {
        const product = row.getValue("mostOrderedProduct"); // Product name
        return (
          <span className="text-sm text-gray-700">{product ?? "N/A"}</span>
        );
      },
    },
    {
      accessorKey: "productPrices",
      header: "Product Prices",
      cell: ({ row }) => {
        const prices = row.getValue("productPrices"); // Array of { name, price }
        return (
          <div className="flex flex-col gap-1">
            {prices?.map((p: any) => (
              <span key={p.name} className="text-sm text-gray-700">
                {p.name}: {p.price} ৳
              </span>
            )) ?? <span>N/A</span>}
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: Row<Vendor> }) => {
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
      cell: ({ row }: { row: Row<Vendor> }) => {
        const vendor = row.original;
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
                  href={`/suppliers-business/${vendor.id}`}
                  className="cursor-pointer"
                >
                  <Eye className="mr-2 h-4 w-4 text-blue-500" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/suppliers-business/update/${vendor.id}`}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4 text-green-500" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer focus:text-red-600"
                onClick={() => handleDelete(vendor.id)}
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
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {/* Registrations */}
          <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm">
                Registrations This Month
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalRegistrationsThisMonth}
              </p>
            </div>
          </div>

          {/* Avg. Manufacturing Price */}
          <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 hover:shadow-xl transition-shadow">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm">
                Avg. Manufacturing Price
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {new Intl.NumberFormat("en-BD", {
                  style: "currency",
                  currency: "BDT",
                }).format(avgManufacturingPrice)}
              </p>
            </div>
          </div>

          {/* Top Supplier by Product Supply */}
          <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 hover:shadow-xl transition-shadow">
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm">
                Top Supplier (by Supply)
              </p>
              <p className="text-2xl font-bold text-gray-900">
                TechCorp Solution
              </p>
              <p className="text-sm text-gray-500">Wireless Headphone</p>
            </div>
          </div>

          {/* Top Product */}
          <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm">Top Product</p>
              <p className="text-2xl font-bold text-gray-900">
                Wireless Headphone
              </p>
              <p className="text-sm text-gray-500"> TechCorp Solution</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"></h2>
            <p className="text-muted-foreground mt-1"></p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg whitespace-nowrap"
          >
            <Link href="/suppliers-business/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Supplier
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">All Suppliers</h3>
          <Badge variant="secondary" className="ml-auto">
            {vendors.length} total
          </Badge>
        </div>
        <div className="flex items-center justify-start gap-2 mb-4">
          <DatePicker
            dateRange={{ from: null, to: null }}
            setDateRange={() => {}}
          />
        </div>
        <DataTable
          columns={columns}
          data={vendors}
          searchKey="name"
          searchPlaceholder="Search suppliers..."
          filterOptions={filterOptions}
        />
      </div>
    </motion.div>
  );
}
