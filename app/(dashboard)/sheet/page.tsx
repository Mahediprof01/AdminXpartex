"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  DollarSign,
  Users,
  PieChart,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { DatePicker } from "@/components/ui/date-picker";

// Dummy Data
const summaryData = {
  totalAssets: 250000,
  totalLiabilities: 120000,
  equity: 130000,
  totalRevenue: 180000,
  totalExpenses: 50000,
  netProfit: 130000,
};

const balanceSheetData = {
  assets: [
    { name: "Cash & Bank", amount: 100000 },
    { name: "Accounts Receivable", amount: 50000 },
    { name: "Inventory Value", amount: 80000 },
    { name: "Prepaid Expenses", amount: 20000 },
  ],
  liabilities: [
    { name: "Accounts Payable", amount: 60000 },
    { name: "Loans / Debts", amount: 40000 },
    { name: "Refunds Pending", amount: 20000 },
  ],
  equity: [
    { name: "Retained Earnings", amount: 100000 },
    { name: "Capital Invested", amount: 30000 },
  ],
};

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

const chartData = [
  { month: "Jan", revenue: 20000, expenses: 8000 },
  { month: "Feb", revenue: 25000, expenses: 10000 },
  { month: "Mar", revenue: 30000, expenses: 12000 },
  { month: "Apr", revenue: 40000, expenses: 15000 },
];

export const manufacturerData = [
  { id: "all", name: "All Manufacturers" },
  { id: "acme", name: "Acme Manufacturing" },
  { id: "globex", name: "Globex Corporation" },
  { id: "initech", name: "Initech Industries" },
  { id: "umbrella", name: "Umbrella Manufacturing" },
  { id: "wayne", name: "Wayne Enterprises" },
  { id: "stark", name: "Stark Industries" },
  { id: "wonka", name: "Wonka Industries" },
  { id: "soylent", name: "Soylent Corporation" },
  { id: "oscorp", name: "Oscorp Manufacturing" },
];

export const logisticsData = [
  { id: "all", name: "All Logistics Providers" },
  { id: "dhl", name: "DHL Express" },
  { id: "fedex", name: "FedEx" },
  { id: "ups", name: "UPS (United Parcel Service)" },
  { id: "usps", name: "USPS (United States Postal Service)" },
  { id: "tnt", name: "TNT Express" },
  { id: "aramex", name: "Aramex" },
  { id: "blue_dart", name: "Blue Dart" },
  { id: "canada_post", name: "Canada Post" },
  { id: "royal_mail", name: "Royal Mail" },
  { id: "australia_post", name: "Australia Post" },
  { id: "dpd", name: "DPD Group" },
  { id: "gls", name: "GLS (General Logistics Systems)" },
  { id: "sf_express", name: "SF Express" },
  { id: "yrc", name: "YRC Freight" },
  { id: "saia", name: "Saia LTL Freight" },
  { id: "xpo", name: "XPO Logistics" },
  { id: "maersk", name: "Maersk Logistics" },
  { id: "cma_cgm", name: "CMA CGM Logistics" },
  { id: "db_schenker", name: "DB Schenker" },
  { id: "kuehne_nagel", name: "Kuehne + Nagel" },
];

export default function BalanceSheetPage() {
  const [selectedVendor, setSelectedVendor] = useState("all");
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");
  const [selectedLogistics, setSelectedLogistics] = useState("all");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-4 md:p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5 text-gray-600 hover:text-gray-900 transition" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Balance Sheet</h1>
          <p className="text-gray-500">Overview of platform financial health</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
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

        <Select
          value={selectedManufacturer}
          onValueChange={(value) => setSelectedManufacturer(value)}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="All Manufacturer" />
          </SelectTrigger>
          <SelectContent>
            {manufacturerData.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedLogistics}
          onValueChange={(value) => setSelectedLogistics(value)}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select Logistics Provider" />
          </SelectTrigger>
          <SelectContent>
            {logisticsData.map((l) => (
              <SelectItem key={l.id} value={l.id}>
                {l.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            title: "Total Assets",
            value: summaryData.totalAssets,
            icon: <DollarSign className="text-green-500" />,
            border: "border-green-400",
          },
          {
            title: "Total Liabilities",
            value: summaryData.totalLiabilities,
            icon: <TrendingDown className="text-red-500" />,
            border: "border-red-400",
          },
          {
            title: "Equity",
            value: summaryData.equity,
            icon: <PieChart className="text-blue-500" />,
            border: "border-blue-400",
          },
          {
            title: "Total Revenue",
            value: summaryData.totalRevenue,
            icon: <TrendingUp className="text-green-600" />,
            border: "border-green-600",
          },
          {
            title: "Total Expenses",
            value: summaryData.totalExpenses,
            icon: <TrendingDown className="text-orange-500" />,
            border: "border-orange-400",
          },
          {
            title: "Net Profit",
            value: summaryData.netProfit,
            icon: <DollarSign className="text-purple-500" />,
            border: "border-purple-400",
          },
        ].map((item) => (
          <Card
            key={item.title}
            className={`p-4 hover:shadow-lg transition-shadow ${item.border} border-l-4 flex flex-col justify-between`}
          >
            <div className="flex items-center gap-3 mb-2">
              {item.icon}
              <h3 className="text-sm font-medium text-gray-600">
                {item.title}
              </h3>
            </div>
            <p className="text-xl font-bold text-gray-900 text-right">
              ${item.value.toLocaleString()}
            </p>
          </Card>
        ))}
      </div>

      {/* Balance Sheet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["assets", "liabilities", "equity"].map((section) => (
          <Card
            key={section}
            className="border-0 shadow-lg hover:shadow-xl transition"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold capitalize">
                {section}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {balanceSheetData[section].map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between text-gray-700"
                >
                  <span>{item.name}</span>
                  <span>${item.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t mt-2 pt-2 font-bold flex justify-between text-gray-900">
                <span>
                  Total {section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
                <span>
                  $
                  {balanceSheetData[section]
                    .reduce((a, b) => a + b.amount, 0)
                    .toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vendor Breakdown */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="text-indigo-500" /> Vendor Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Vendor</th>
                <th className="p-2 text-right">Total Sales</th>
                <th className="p-2 text-right">Commission</th>
                <th className="p-2 text-right">Payout</th>
                <th className="p-2 text-right">Returns</th>
              </tr>
            </thead>
            <tbody>
              {vendorData.map((v, idx) => (
                <tr
                  key={v.vendor}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-2 font-medium">{v.vendor}</td>
                  <td className="p-2 text-right">
                    ${v.totalSales.toLocaleString()}
                  </td>
                  <td className="p-2 text-right">
                    ${v.commission.toLocaleString()}
                  </td>
                  <td className="p-2 text-right">
                    ${v.payout.toLocaleString()}
                  </td>
                  <td className="p-2 text-right">
                    ${v.returns.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Revenue vs Expenses */}
      <Card className="border-0 shadow-lg hover:shadow-2xl transition mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="text-green-500" /> Revenue vs Expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              {/* Grid */}
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              {/* Axes */}
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 14 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 14 }} />
              {/* Tooltip */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  borderRadius: 8,
                  border: "none",
                  padding: 10,
                }}
                itemStyle={{ color: "#111827", fontWeight: "500" }}
              />
              {/* Legend */}
              <Legend verticalAlign="top" height={36} />
              {/* Revenue Line */}
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4ade80"
                strokeWidth={3}
                dot={{ r: 5, fill: "#22c55e", strokeWidth: 0 }}
                activeDot={{ r: 7 }}
                animationDuration={1500}
              />
              {/* Expenses Line */}
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#f87171"
                strokeWidth={3}
                dot={{ r: 5, fill: "#ef4444", strokeWidth: 0 }}
                activeDot={{ r: 7 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
