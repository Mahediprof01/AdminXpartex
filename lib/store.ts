// Manufacturer Types and Store
export interface Manufacturer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  products: number;
  revenue: number;
  address?: string;
  description?: string;
  createdAt?: string;
  suppliers?: { id: string; name: string }[];
  orders?: {
    id: string;
    product: string;
    quantity: number;
    price: number;
    date: string;
  }[];
  pricing?: { product: string; unitPrice: number }[];
}

interface ManufacturerStore {
  manufacturers: Manufacturer[];
  addManufacturer: (manufacturer: Omit<Manufacturer, "id">) => void;
  updateManufacturer: (id: string, manufacturer: Partial<Manufacturer>) => void;
  deleteManufacturer: (id: string) => void;
  getManufacturer: (id: string) => Manufacturer | undefined;
}

const initialManufacturers: Manufacturer[] = [
  {
    id: "MANU001",
    name: "Acme Manufacturing",
    email: "info@acmemfg.com",
    phone: "+1 (555) 111-2222",
    status: "active",
    products: 20,
    revenue: 50000,
    address: "789 Industrial Rd, Detroit, MI",
    description: "Leading manufacturer of industrial equipment",

    createdAt: "2025-04-18",
    suppliers: [
      { id: "SUP001", name: "Global Suppliers Ltd" },
      { id: "SUP002", name: "Prime Distributors" },
    ],
    orders: [
      {
        id: "ORD001",
        product: "Hydraulic Pump",
        quantity: 10,
        price: 1200,
        date: "2024-05-20",
      },
      {
        id: "ORD002",
        product: "Conveyor Belt",
        quantity: 5,
        price: 800,
        date: "2024-06-02",
      },
      {
        id: "ORD003",
        product: "Hydraulic Pump",
        quantity: 3,
        price: 1200,
        date: "2024-06-15",
      },
    ],
    pricing: [
      { product: "Hydraulic Pump", unitPrice: 1200 },
      { product: "Conveyor Belt", unitPrice: 800 },
      { product: "Industrial Drill", unitPrice: 1500 },
    ],
  },
];

export const useManufacturerStore = create<ManufacturerStore>((set, get) => ({
  manufacturers: initialManufacturers,
  addManufacturer: (manufacturer) =>
    set((state) => ({
      manufacturers: [
        ...state.manufacturers,
        { ...manufacturer, id: generateId("MANU") },
      ],
    })),
  updateManufacturer: (id, manufacturer) =>
    set((state) => ({
      manufacturers: state.manufacturers.map((m) =>
        m.id === id ? { ...m, ...manufacturer } : m
      ),
    })),
  deleteManufacturer: (id) =>
    set((state) => ({
      manufacturers: state.manufacturers.filter((m) => m.id !== id),
    })),
  getManufacturer: (id) => get().manufacturers.find((m) => m.id === id),
}));

import { create } from "zustand";

// Types
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
  createdAt: string;
  description?: string;
  vendor?: string;
  sku?: string;
  manufacturer?: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  products: number;
  revenue: number;
  address?: string;
  description?: string;
  createdAt?: string;
  connectedManufacturers?: number;
  mostOrderedProduct?: string;
  productPrices?: { name: string; price: number }[];
}

export interface PurchaseOrder {
  id: string;
  vendor: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  status: "pending" | "approved" | "delivered" | "cancelled";
}

export interface Order {
  id: string;
  customer: string;
  items: number;
  total: number;
  orderDate: string;
  paymentStatus: "paid" | "pending" | "failed";
  shippingStatus: "delivered" | "shipped" | "processing" | "cancelled";
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  salary: string;
  status: "active" | "closed" | "draft";
  applicants: number;
  postedDate: string;
  description?: string;
}

export interface Blog {
  id: string;
  title: string;
  author: string;
  category: string;
  status: "published" | "draft" | "archived";
  views: number;
  publishedDate: string;
  content?: string;
}

export interface Freelancer {
  id: string;
  name: string;
  email: string;
  skills: string;
  rating: number;
  projects: number;
  status: "available" | "busy" | "inactive";
  hourlyRate: number;
  joinedDate: string;
  bio?: string;
}

// Store interfaces
interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

interface VendorStore {
  vendors: Vendor[];
  addVendor: (vendor: Omit<Vendor, "id">) => void;
  updateVendor: (id: string, vendor: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;
  getVendor: (id: string) => Vendor | undefined;
}

interface PurchaseOrderStore {
  purchaseOrders: PurchaseOrder[];
  addPurchaseOrder: (order: Omit<PurchaseOrder, "id">) => void;
  updatePurchaseOrder: (id: string, order: Partial<PurchaseOrder>) => void;
  deletePurchaseOrder: (id: string) => void;
  getPurchaseOrder: (id: string) => PurchaseOrder | undefined;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, "id">) => void;
  updateOrder: (id: string, order: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  getOrder: (id: string) => Order | undefined;
}

interface JobStore {
  jobs: Job[];
  addJob: (job: Omit<Job, "id">) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  getJob: (id: string) => Job | undefined;
}

interface BlogStore {
  blogs: Blog[];
  addBlog: (blog: Omit<Blog, "id">) => void;
  updateBlog: (id: string, blog: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;
  getBlog: (id: string) => Blog | undefined;
}

interface FreelancerStore {
  freelancers: Freelancer[];
  addFreelancer: (freelancer: Omit<Freelancer, "id">) => void;
  updateFreelancer: (id: string, freelancer: Partial<Freelancer>) => void;
  deleteFreelancer: (id: string) => void;
  getFreelancer: (id: string) => Freelancer | undefined;
}

// Generate ID helper
const generateId = (prefix: string) => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}${timestamp}${random}`.toUpperCase();
};

// Initial data
const initialProducts: Product[] = [
  {
    id: "PROD001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    stock: 150,
    status: "active",
    createdAt: "2024-01-15",
    description: "High-quality wireless headphones with noise cancellation",
    vendor: "TechCorp Solutions",
    sku: "WH-001-BLK",
    manufacturer: "Acme Manufacturing",
  },
  {
    id: "PROD002",
    name: "Smart Watch",
    category: "Electronics",
    price: 299.99,
    stock: 75,
    status: "active",
    createdAt: "2024-01-14",
    description: "Advanced smartwatch with health monitoring",
    vendor: "Global Electronics",
    sku: "SW-002-SLV",
    manufacturer: "Acme Manufacturing",
  },
  {
    id: "PROD003",
    name: "Coffee Maker",
    category: "Appliances",
    price: 149.99,
    stock: 0,
    status: "inactive",
    createdAt: "2024-01-13",
    description: "Premium coffee maker with programmable features",
    vendor: "Home Appliances Co",
    sku: "CM-003-BLK",
    manufacturer: "Acme Manufacturing",
  },
];

const initialVendors: Vendor[] = [
  {
    id: "VEND001",
    name: "TechCorp Solutions",
    email: "contact@techcorp.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    products: 45,
    revenue: 125000,
    address: "123 Tech Street, Silicon Valley, CA",
    description: "Leading technology solutions provider",
    createdAt: "2025-04-18",
    connectedManufacturers: 12,
    mostOrderedProduct: "Wireless Headphones",
    productPrices: [
      { name: "Wireless Headphones", price: 99.99 },
      { name: "Smartwatch", price: 149.99 },
      { name: "Laptop Charger", price: 29.99 },
    ],
  },
  {
    id: "VEND002",
    name: "Global Electronics",
    email: "info@globalelec.com",
    phone: "+1 (555) 987-6543",
    status: "active",
    products: 32,
    revenue: 89000,
    address: "456 Electronics Ave, Austin, TX",
    description: "Global electronics distributor",
    createdAt: "2025-01-10",
    connectedManufacturers: 8,
    mostOrderedProduct: "Bluetooth Speaker",
    productPrices: [
      { name: "Bluetooth Speaker", price: 59.99 },
      { name: "USB-C Cable", price: 9.99 },
      { name: "Portable Charger", price: 39.99 },
    ],
  },
];

// Create stores
export const useProductStore = create<ProductStore>((set, get) => ({
  products: initialProducts,
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, id: generateId("PROD") }],
    })),
  updateProduct: (id, product) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...product } : p
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  getProduct: (id) => get().products.find((p) => p.id === id),
}));

export const useVendorStore = create<VendorStore>((set, get) => ({
  vendors: initialVendors,
  addVendor: (vendor) =>
    set((state) => ({
      vendors: [...state.vendors, { ...vendor, id: generateId("VEND") }],
    })),
  updateVendor: (id, vendor) =>
    set((state) => ({
      vendors: state.vendors.map((v) =>
        v.id === id ? { ...v, ...vendor } : v
      ),
    })),
  deleteVendor: (id) =>
    set((state) => ({
      vendors: state.vendors.filter((v) => v.id !== id),
    })),
  getVendor: (id) => get().vendors.find((v) => v.id === id),
}));

export const usePurchaseOrderStore = create<PurchaseOrderStore>((set, get) => ({
  purchaseOrders: [
    {
      id: "PO001",
      vendor: "TechCorp Solutions",
      product: "Wireless Headphones",
      quantity: 100,
      price: 75.0,
      total: 7500.0,
      date: "2024-01-15",
      status: "pending",
    },
  ],
  addPurchaseOrder: (order) =>
    set((state) => ({
      purchaseOrders: [
        ...state.purchaseOrders,
        { ...order, id: generateId("PO") },
      ],
    })),
  updatePurchaseOrder: (id, order) =>
    set((state) => ({
      purchaseOrders: state.purchaseOrders.map((o) =>
        o.id === id ? { ...o, ...order } : o
      ),
    })),
  deletePurchaseOrder: (id) =>
    set((state) => ({
      purchaseOrders: state.purchaseOrders.filter((o) => o.id !== id),
    })),
  getPurchaseOrder: (id) => get().purchaseOrders.find((o) => o.id === id),
}));

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [
    {
      id: "ORD001",
      customer: "John Doe",
      items: 3,
      total: 299.97,
      orderDate: "2024-01-15",
      paymentStatus: "paid",
      shippingStatus: "delivered",
    },
  ],
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, { ...order, id: generateId("ORD") }],
    })),
  updateOrder: (id, order) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, ...order } : o)),
    })),
  deleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((o) => o.id !== id),
    })),
  getOrder: (id) => get().orders.find((o) => o.id === id),
}));

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [
    {
      id: "JOB001",
      title: "Senior React Developer",
      company: "TechCorp Solutions",
      location: "Remote",
      type: "Full-time",
      salary: "$120,000",
      status: "active",
      applicants: 45,
      postedDate: "2024-01-15",
      description: "We are looking for a senior React developer...",
    },
  ],
  addJob: (job) =>
    set((state) => ({
      jobs: [...state.jobs, { ...job, id: generateId("JOB") }],
    })),
  updateJob: (id, job) =>
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, ...job } : j)),
    })),
  deleteJob: (id) =>
    set((state) => ({
      jobs: state.jobs.filter((j) => j.id !== id),
    })),
  getJob: (id) => get().jobs.find((j) => j.id === id),
}));

export const useBlogStore = create<BlogStore>((set, get) => ({
  blogs: [
    {
      id: "BLOG001",
      title: "10 Tips for E-commerce Success",
      author: "John Smith",
      category: "Business",
      status: "published",
      views: 1250,
      publishedDate: "2024-01-15",
      content: "Here are 10 essential tips for e-commerce success...",
    },
  ],
  addBlog: (blog) =>
    set((state) => ({
      blogs: [...state.blogs, { ...blog, id: generateId("BLOG") }],
    })),
  updateBlog: (id, blog) =>
    set((state) => ({
      blogs: state.blogs.map((b) => (b.id === id ? { ...b, ...blog } : b)),
    })),
  deleteBlog: (id) =>
    set((state) => ({
      blogs: state.blogs.filter((b) => b.id !== id),
    })),
  getBlog: (id) => get().blogs.find((b) => b.id === id),
}));

export const useFreelancerStore = create<FreelancerStore>((set, get) => ({
  freelancers: [
    {
      id: "FRLNC001",
      name: "Alex Thompson",
      email: "alex@example.com",
      skills: "React, Node.js, TypeScript",
      rating: 4.9,
      projects: 23,
      status: "available",
      hourlyRate: 85,
      joinedDate: "2024-01-15",
      bio: "Experienced full-stack developer with 5+ years of experience",
    },
  ],
  addFreelancer: (freelancer) =>
    set((state) => ({
      freelancers: [
        ...state.freelancers,
        { ...freelancer, id: generateId("FRLNC") },
      ],
    })),
  updateFreelancer: (id, freelancer) =>
    set((state) => ({
      freelancers: state.freelancers.map((f) =>
        f.id === id ? { ...f, ...freelancer } : f
      ),
    })),
  deleteFreelancer: (id) =>
    set((state) => ({
      freelancers: state.freelancers.filter((f) => f.id !== id),
    })),
  getFreelancer: (id) => get().freelancers.find((f) => f.id === id),
}));
