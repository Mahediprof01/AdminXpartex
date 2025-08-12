"use client"
import { BarChart3, Package, ShoppingCart, Briefcase, FileText, UserCheck, Store, ShoppingBag, Truck } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
    color: "text-blue-500",
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
    color: "text-green-500",
  },
  {
    title: "Vendors",
    url: "/vendors",
    icon: Store,
    color: "text-purple-500",
  },
  {
    title: "Purchase Orders",
    url: "/purchase-orders",
    icon: ShoppingBag,
    color: "text-orange-500",
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingCart,
    color: "text-red-500",
  },
  {
    title: "Logistics",
    url: "/logistics",
    icon: Truck,
    color: "text-cyan-500",
  },
  {
    title: "Jobs",
    url: "/jobs",
    icon: Briefcase,
    color: "text-indigo-500",
  },
  {
    title: "News / Blogs",
    url: "/blogs",
    icon: FileText,
    color: "text-pink-500",
  },
  {
    title: "Freelancers",
    url: "/freelancers",
    icon: UserCheck,
    color: "text-teal-500",
  },
]

export function  AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r-0">
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
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="h-11 px-3 rounded-xl transition-all duration-200 hover:bg-sidebar-accent/50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500/10 data-[active=true]:to-pink-500/10 data-[active=true]:border data-[active=true]:border-purple-200 data-[active=true]:shadow-sm"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className={`size-5 ${pathname === item.url ? "text-purple-600" : item.color}`} />
                      <span className={`font-medium ${pathname === item.url ? "text-purple-900" : ""}`}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
