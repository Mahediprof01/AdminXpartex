"use client";

import type { Row, Table, Column } from "@tanstack/react-table";
import type { Manufacturer } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MoreHorizontal,
  Plus,
  Eye,
  Edit,
  Trash,
  Factory,
  DollarSign,
  Package,
  Users,
  Calendar,
  UserPlus,
  ShieldAlert,
  AlertTriangle,
  TrendingUp,
  Activity,
  MessageSquare,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  ShoppingCart,
  Headphones,
  Mail,
  Bell,
  MessageCircle,
  Filter,
  RefreshCw,
  Download,
  Upload,
  AlertCircle,
  Star,
  StarOff,
  TrendingDown,
  Users2,
  Building2,
  ClipboardList,
  CreditCard,
  Shield,
  FileCheck,
  FileX,
  FileClock,
  MessageSquareMore,
  ActivitySquare,
  Target,
  Zap,
  Award,
  Flag,
  HelpCircle,
  Settings,
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
import { useManufacturerStore } from "@/lib/store";
import { matchesDateFilter, dateFilterFn } from "@/lib/utils";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

export default function ManufacturesPage() {
  const { manufacturers, deleteManufacturer } = useManufacturerStore();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this manufacturer?")) {
      deleteManufacturer(id);
    }
  };

  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(
    null
  );

  const filteredData = manufacturers.filter((item) => {
    if (selectedDateFilter) {
      return matchesDateFilter(item.createdAt || "", selectedDateFilter);
    }
    return true;
  });

  // Calculate dashboard metrics
  const totalManufacturers = manufacturers.length;
  const activeManufacturers = manufacturers.filter(
    (m) => m.status === "active"
  ).length;
  const inactiveManufacturers = totalManufacturers - activeManufacturers;

  // Recently registered (last 30 days)
  const recentlyRegistered = manufacturers.filter((m) => {
    if (!m.createdAt) return false;
    const createdDate = new Date(m.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdDate >= thirtyDaysAgo;
  }).length;

  // Top performing manufacturers (by revenue)
  const topPerformingManufacturers = manufacturers
    .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
    .slice(0, 10);

  // Pending verifications (mock data - would come from backend)
  const pendingVerifications = 25;
  const flaggedManufacturers = 5;

  // Activity feed data (mock data)
  const activityFeed = [
    {
      id: 1,
      type: "product_listed",
      manufacturer: "Acme Manufacturing",
      product: "Hydraulic Pump",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "rfq_response",
      manufacturer: "TechCorp Industries",
      rfq: "RFQ-2024-001",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "message_sent",
      manufacturer: "Global Mfg Co",
      recipient: "Supplier XYZ",
      time: "6 hours ago",
    },
    {
      id: 4,
      type: "profile_update",
      manufacturer: "Industrial Solutions",
      field: "Contact Info",
      time: "1 day ago",
    },
  ];

  // Product listings summary
  const totalListings = manufacturers.reduce(
    (sum, m) => sum + (m.products || 0),
    0
  );
  const inactiveListings = Math.floor(totalListings * 0.15); // 15% inactive
  const pendingApprovals = 12;

  // Order metrics
  const totalOrders = manufacturers.reduce(
    (sum, m) => sum + (m.orders?.length || 0),
    0
  );
  const totalRevenue = manufacturers.reduce(
    (sum, m) => sum + (m.revenue || 0),
    0
  );
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Support tickets (mock data)
  const supportTickets = [
    {
      id: 1,
      manufacturer: "Acme Manufacturing",
      type: "Technical Issue",
      status: "Open",
      priority: "High",
    },
    {
      id: 2,
      manufacturer: "TechCorp Industries",
      type: "Payment Issue",
      status: "Resolved",
      priority: "Medium",
    },
    {
      id: 3,
      manufacturer: "Global Mfg Co",
      type: "Account Access",
      status: "Pending",
      priority: "Low",
    },
  ];

  const openTickets = supportTickets.filter((t) => t.status === "Open").length;
  const resolvedTickets = supportTickets.filter(
    (t) => t.status === "Resolved"
  ).length;

  // Verification status (mock data)
  const verificationStats = {
    pending: 25,
    verified: 175,
    rejected: 8,
    incomplete: 12,
  };

  // Communication logs (mock data)
  const communicationLogs = [
    {
      id: 1,
      type: "Bulk Email",
      subject: "Platform Updates",
      sent: 150,
      opened: 120,
      time: "2 days ago",
    },
    {
      id: 2,
      type: "Notification",
      subject: "New RFQ Available",
      sent: 200,
      opened: 180,
      time: "3 days ago",
    },
    {
      id: 3,
      type: "Direct Message",
      subject: "Account Verification",
      sent: 25,
      opened: 20,
      time: "1 week ago",
    },
  ];

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

  const columns: import("@tanstack/react-table").ColumnDef<
    Manufacturer,
    any
  >[] = [
    {
      id: "select",
      header: ({ table }: { table: Table<Manufacturer> }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
          className="rounded border-gray-300"
        />
      ),
      cell: ({ row }: { row: Row<Manufacturer> }) => (
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
      header: "ID",
      cell: ({ row }) => (
        <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded max-w-[100px] truncate">
          {row.getValue("id")}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }: { column: Column<Manufacturer, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
        </Button>
      ),
      cell: ({ row }: { row: Row<Manufacturer> }) => (
        <Link
          href={`/manufactures/${row.original.id}`}
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
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => (
        <span className="font-semibold text-purple-700 whitespace-nowrap">
          {row.getValue("products")}
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
      accessorKey: "suppliers",
      header: "Clients Connected",
      cell: ({ row }) => (
        <span className="font-medium text-indigo-600">
          {row.original.suppliers?.length || 0}
        </span>
      ),
    },
    {
      accessorKey: "orders",
      header: "Total Orders",
      cell: ({ row }) => (
        <span className="font-semibold text-blue-700">
          {row.original.orders?.length || 0}
        </span>
      ),
    },
    {
      id: "topProduct",
      header: "Top Ordered Product",
      cell: ({ row }) => {
        const orders = row.original.orders || [];
        if (!orders.length) return <span className="text-gray-400">N/A</span>;

        const productCount: Record<string, number> = {};
        orders.forEach((o) => {
          productCount[o.product] = (productCount[o.product] || 0) + o.quantity;
        });

        const topProduct = Object.entries(productCount).sort(
          (a, b) => b[1] - a[1]
        )[0][0];

        return <span className="text-sm text-gray-800">{topProduct}</span>;
      },
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
      cell: ({ row }) => {
        const revenue = Number(row.getValue("revenue"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(revenue);
        return (
          <div className="font-semibold text-green-600 whitespace-nowrap">
            {formatted}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: Row<Manufacturer> }) => {
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
      cell: ({ row }: { row: Row<Manufacturer> }) => {
        const manufacturer = row.original;
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
                  href={`/manufactures/${manufacturer.id}`}
                  className="cursor-pointer"
                >
                  <Eye className="mr-2 h-4 w-4 text-blue-500" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/manufactures/update/${manufacturer.id}`}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4 text-green-500" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer focus:text-red-600"
                onClick={() => handleDelete(manufacturer.id)}
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
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Manufacturer Dashboard
          </h2>
          <p className="text-muted-foreground mt-1">
            Comprehensive monitoring and insights for manufacturer management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg whitespace-nowrap"
          >
            <Link href="/manufactures/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Manufacturer
            </Link>
          </Button>
        </div>
      </div>

      {/* A. Manufacturer Overview Widget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
              <Factory className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm">
                Total Manufacturers
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalManufacturers}
              </p>
              <p className="text-xs text-gray-500">
                {activeManufacturers} Active / {inactiveManufacturers} Inactive
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm">
                Recently Registered
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {recentlyRegistered}
              </p>
              <p className="text-xs text-gray-500">Last 30 days</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm">
                Top Performing
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {topPerformingManufacturers.length}
              </p>
              <p className="text-xs text-gray-500">By revenue</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm">
                Pending Verifications
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingVerifications}
              </p>
              <p className="text-xs text-gray-500">Awaiting review</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-red-100 text-red-600 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm">
                Flagged / Reported
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {flaggedManufacturers}
              </p>
              <p className="text-xs text-gray-500">Requires attention</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* B. Manufacturer Activity Monitoring */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Live Activity Feed
                </CardTitle>
                <CardDescription>
                  Recent manufacturer activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {activityFeed.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.manufacturer}
                      </p>
                      <p className="text-xs text-gray-600">
                        {activity.type === "product_listed" &&
                          `Listed: ${activity.product}`}
                        {activity.type === "rfq_response" &&
                          `Responded to ${activity.rfq}`}
                        {activity.type === "message_sent" &&
                          `Message to ${activity.recipient}`}
                        {activity.type === "profile_update" &&
                          `Updated ${activity.field}`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* C. Product Listings Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-500" />
                  Product Listings Summary
                </CardTitle>
                <CardDescription>Product management overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {totalListings}
                    </p>
                    <p className="text-xs text-gray-500">Total Listings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {inactiveListings}
                    </p>
                    <p className="text-xs text-gray-500">Inactive</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Approval Queue</span>
                    <span className="font-medium">{pendingApprovals}</span>
                  </div>
                  <Progress
                    value={(pendingApprovals / totalListings) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* D. Order & Transaction Metrics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-purple-500" />
                  Order & Transaction Metrics
                </CardTitle>
                <CardDescription>
                  Financial performance overview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {totalOrders}
                    </p>
                    <p className="text-xs text-gray-500">Total Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      ${avgOrderValue.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Avg Order Value</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Revenue</span>
                    <span className="font-medium">
                      ${totalRevenue.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ActivitySquare className="h-5 w-5 text-blue-500" />
                Manufacturer Activity Monitoring
              </CardTitle>
              <CardDescription>
                Real-time activity tracking and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Engagement Score */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Engagement Score</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Logins per week</span>
                      <Badge variant="secondary">High</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Number of listings</span>
                      <Badge variant="secondary">Medium</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">RFQ response rate</span>
                      <Badge variant="secondary">High</Badge>
                    </div>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Recent Activities</h4>
                  <div className="space-y-2">
                    {activityFeed.slice(0, 5).map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">
                          {activity.manufacturer}
                        </span>
                        <span className="text-gray-600">-</span>
                        <span className="text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-500" />
                Product Listings Management
              </CardTitle>
              <CardDescription>
                Quality control and content moderation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Package className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{totalListings}</p>
                  <p className="text-sm text-gray-600">Total Listings</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{pendingApprovals}</p>
                  <p className="text-sm text-gray-600">Pending Approval</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{inactiveListings}</p>
                  <p className="text-sm text-gray-600">Inactive Listings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-purple-500" />
                Order & Transaction Analytics
              </CardTitle>
              <CardDescription>
                Monitor reliability and revenue flow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <ShoppingCart className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{totalOrders}</p>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">
                    ${totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">
                    ${avgOrderValue.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Avg Order Value</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-600">Payment Flags</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-orange-500" />
                Support & Dispute Management
              </CardTitle>
              <CardDescription>Handle escalations efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Ticket Summary</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-xl font-bold text-red-600">
                        {openTickets}
                      </p>
                      <p className="text-sm text-gray-600">Open</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-xl font-bold text-green-600">
                        {resolvedTickets}
                      </p>
                      <p className="text-sm text-gray-600">Resolved</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Recent Tickets</h4>
                  <div className="space-y-2">
                    {supportTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {ticket.manufacturer}
                          </p>
                          <p className="text-xs text-gray-600">{ticket.type}</p>
                        </div>
                        <Badge
                          variant={
                            ticket.status === "Open"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {ticket.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verification Tab */}
        <TabsContent value="verification" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Verification & Compliance
              </CardTitle>
              <CardDescription>
                Ensure only trusted manufacturers onboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Verification Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileClock className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Pending</span>
                      </div>
                      <Badge variant="secondary">
                        {verificationStats.pending}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Verified</span>
                      </div>
                      <Badge variant="secondary">
                        {verificationStats.verified}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileX className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Rejected</span>
                      </div>
                      <Badge variant="secondary">
                        {verificationStats.rejected}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">Incomplete</span>
                      </div>
                      <Badge variant="secondary">
                        {verificationStats.incomplete}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">
                    KYC/Business Document Status
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Documents Submitted</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Auto-Reminders Sent</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Missing Info Requests</span>
                      <span className="font-medium">8</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareMore className="h-5 w-5 text-purple-500" />
                Communication Logs
              </CardTitle>
              <CardDescription>
                Audit internal platform communication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Mail className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">375</p>
                    <p className="text-sm text-gray-600">Bulk Emails Sent</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Bell className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">425</p>
                    <p className="text-sm text-gray-600">Notifications</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <MessageCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">45</p>
                    <p className="text-sm text-gray-600">Direct Messages</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Recent Communications</h4>
                  {communicationLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">{log.subject}</p>
                          <p className="text-xs text-gray-600">
                            {log.sent} sent, {log.opened} opened
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Data Table Section */}
      <div className="bg-white rounded-xl shadow-lg border-0 p-4 md:p-6">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Factory className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-semibold">All Manufacturers</h3>
            <Badge variant="secondary" className="ml-auto">
              {manufacturers.length} total
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <DatePicker
              dateRange={{ from: null, to: null }}
              setDateRange={() => {}}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          searchKey="name"
          searchPlaceholder="Search manufacturers..."
          filterOptions={filterOptions}
        />
      </div>
    </motion.div>
  );
}
