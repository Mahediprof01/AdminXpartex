"use client";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Briefcase,
  FileText,
  UserCheck,
  Store,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const menuModules = [
  {
    title: "Businesses Management",
    icon: Store,
    children: [
      { title: "Manufactures", url: "/manufactures" },
      { title: "Suppliers", url: "/suppliers-business" },
      { title: "Logistics", url: "/logistics-business" },
    ],
  },
  {
    title: "Product Management",
    icon: Package,
    children: [
      {
        title: "Products",
        children: [
          { title: "Whole Sell", url: "/product-wholesale" },
          { title: "Retail", url: "/product-retail" },
        ],
      },
      {
        title: "Suppliers",
        children: [
          { title: "Whole Sell", url: "/supplier-wholesale" },
          { title: "Retail", url: "/supplier-retail" },
        ],
      },
    ],
  },
  {
    title: "Order Management",
    icon: ShoppingCart,
    children: [
      {
        title: "Order",
        children: [
          { title: "Whole Sale", url: "/orders-wholesale" },
          { title: "Retail", url: "/orders-retail" },
        ],
      },
      {
        title: "Purchase",
        children: [
          { title: "Whole Sale", url: "/purchase-wholesale" },
          { title: "Retail", url: "/purchase-retail" },
        ],
      },
      {
        title: "Return",
        children: [
          { title: "Whole Sale", url: "/return-wholesale" },
          { title: "Retail", url: "/return-retail" },
        ],
      },
      {
        title: "Logistics",
        children: [
          { title: "Whole Sale", url: "/logistics-wholesale" },
          { title: "Retail", url: "/logistics-retail" },
        ],
      },
      { title: "Rental", url: "/rental" },
    ],
  },
  {
    title: "Job Management",
    icon: Briefcase,
    children: [{ title: "Jobs", url: "/jobs" }],
  },
  {
    title: "News Management",
    icon: FileText,
    children: [
      { title: "News", url: "/news" },
    ],
  },
  {
    title: "Freelancers Management",
    icon: UserCheck,
    children: [
      { title: "Freelancers", url: "/freelancers" },
    ],
  },
  {
    title: "LMS",
    icon: FileText,
    children: [
      { title: "Online Course", url: "/online-course" },
      { title: "E-book", url: "/e-book" },
    ],
  },
  {
    title: "Customer Support",
    icon: UserCheck,
    children: [{ title: "Support Center", url: "/support" }],
  },
];

import { useState } from "react";
import { ChevronRight } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  // Move Customer Support to the bottom
  const mainModules = menuModules.filter((m) => m.title !== "Customer Support");
  const customerSupportModule = menuModules.find(
    (m) => m.title === "Customer Support"
  );

  const handleDropdown = (title: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Recursive render for nested menus
  const renderMenu = (items: any[], parentKey = "", isSub = false) => {
    return (
      <ul className={isSub ? "pl-4 border-l border-gray-200 ml-2" : "pl-0"}>
        {items.map((item) => {
          const hasChildren =
            Array.isArray(item.children) && item.children.length > 0;
          const key = parentKey + item.title;
          return (
            <li key={key} className="mb-1">
              {hasChildren ? (
                <div>
                  <button
                    type="button"
                    className="flex items-center w-full h-11 px-3 rounded-xl transition-all duration-200 hover:bg-sidebar-accent/50 font-medium gap-3"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => handleDropdown(key)}
                  >
                    {item.icon && (
                      <item.icon className="size-5 text-purple-600" />
                    )}
                    <span className="truncate">{item.title}</span>
                    <span className="ml-auto flex items-center">
                      <ChevronRight
                        className={`size-4 transition-transform duration-200 ${
                          openDropdowns[key] ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    </span>
                  </button>
                  {openDropdowns[key] && (
                    <div className="mt-1">
                      {renderMenu(item.children, key, true)}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.url || "#"} legacyBehavior>
                  <a
                    className={`flex items-center h-10 px-3 rounded-lg transition-all duration-200 hover:bg-sidebar-accent/50 font-normal gap-3 ${
                      pathname === item.url
                        ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 shadow-sm text-purple-900"
                        : ""
                    }`}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {item.icon && <item.icon className="size-5" />}
                    <span className="truncate">{item.title}</span>
                  </a>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Sidebar className="border-r-0 min-w-[250px] max-w-[270px] w-[260px]">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
            <Store className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Xpartex
            </span>
            <span className="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 flex flex-col h-full">
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {renderMenu(mainModules)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {customerSupportModule && (
          <div className="mt-auto pb-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                {/* Empty for spacing */}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {renderMenu([customerSupportModule])}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
