"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { GROUP_TIERS } from "@/lib/pricing";
import { RichTextEditor } from "@/components/rich-text-editor";
import {
  Plus,
  Trash2,
  Save,
  Eye,
  Package,
  FileText,
  Users,
  Car,
  BarChart3,
  FolderPlus,
  Calendar,
  Search,
  RefreshCw,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  DollarSign,
  MapPin,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";

const AdminPage: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("categories");
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
  });
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [packageForm, setPackageForm] = useState({
    title: "",
    slug: "",
    categoryId: "",
    days: "",
    price: "",
    oldPrice: "",
    pricingTiers: {
      adultPrice: "",
      kidPrice: "",
      infantPrice: "",
      couplePrice: "",
      adultTiers: {
        "1": "",
        "2": "",
        "3": "",
        "4-5": "",
        "6-8": "",
        "9-15": "",
        "16-30": "",
        "31-45": "",
      } as Record<string, string>,
    },
    shortDescription: "",
    detailedDescription: "",
    image: "",
  });

  const selectedCategory = categories.find((c) => c.id === packageForm.categoryId);
  const isHoneymoonCategory = Boolean(
    packageForm.categoryId === "68babf3c85d85b76f41bcfe5" ||
    (selectedCategory && (
      selectedCategory.slug === "honeymoon-tours" ||
      selectedCategory.name?.toLowerCase().includes("honeymoon") ||
      selectedCategory.id === "68babf3c85d85b76f41bcfe5"
    ))
  );
  const [packages, setPackages] = useState<any[]>([]);
  const [editingPackage, setEditingPackage] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
  });
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingBlog, setEditingBlog] = useState<string | null>(null);
  // Things to Do state
  const [thingsForm, setThingsForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
  });
  const [things, setThings] = useState<any[]>([]);
  const [editingThings, setEditingThings] = useState<string | null>(null);

  // Bookings state
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("ALL");
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const fetchBookings = async () => {
    setBookingsLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (Array.isArray(data)) {
        setBookings(data);
      }
    } catch (e) {
      console.error("Failed to fetch bookings:", e);
    } finally {
      setBookingsLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
        if (selectedBooking && selectedBooking.id === id) {
          setSelectedBooking((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (e) {
      console.error("Failed to update booking status:", e);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this booking?")) return;
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        if (selectedBooking && selectedBooking.id === id) {
          setIsDetailsOpen(false);
          setSelectedBooking(null);
        }
      }
    } catch (e) {
      console.error("Failed to delete booking:", e);
    }
  };

  // Cloudinary config
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dgyxftryr/upload";
  const CLOUDINARY_UPLOAD_PRESET = "ftl_main";

  // Redirect to login if not authenticated
  useEffect(() => {
    // Only redirect if not authenticated and not already on /admin/login
    if (
      !user &&
      typeof window !== "undefined" &&
      window.location.pathname !== "/admin/login"
    ) {
      router.replace("/admin/login");
    }
  }, [user, router]);

  // Fetch lists
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then(setCategories);
    fetch("/api/package?detailed=true")
      .then((res) => res.json())
      .then(setPackages);
    fetch("/api/blog?includeContent=true")
      .then((res) => res.json())
      .then(setBlogs);
    fetch("/api/things-to-do?includeContent=true")
      .then((res) => res.json())
      .then(setThings);
    fetchBookings();
  }, []);

  // Things to Do CRUD handlers
  async function handleThingsSubmit(e: React.FormEvent) {
    e.preventDefault();
    let imageUrl = thingsForm.image;
    if (imageUrl && typeof imageUrl !== "string") {
      imageUrl = await uploadImage(imageUrl);
    }
    const payload = { ...thingsForm, image: imageUrl };
    const method = editingThings ? "PUT" : "POST";
    const res = await fetch("/api/things-to-do", {
      method,
      body: JSON.stringify(
        editingThings ? { id: editingThings, ...payload } : payload
      ),
    });
    if (res.ok) {
      setThingsForm({ title: "", slug: "", excerpt: "", content: "", image: "" });
      setEditingThings(null);
      fetch("/api/things-to-do")
        .then((res) => res.json())
        .then(setThings);
    }
  }
  function handleThingsEdit(item: any) {
    setThingsForm({
      title: item.title,
      slug: item.slug || "",
      excerpt: item.excerpt,
      content: item.content,
      image: item.image || "",
    });
    setEditingThings(item.id);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }
  async function handleThingsDelete(id: string) {
    if (confirm("Delete this item?")) {
      await fetch("/api/things-to-do", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      fetch("/api/things-to-do")
        .then((res) => res.json())
        .then(setThings);
    }
  }

  // Only render admin panel if authenticated
  if (!user) return null;

  // Cloudinary upload helper
  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
    const data = await res.json();
    return data.secure_url;
  }

  // Category CRUD handlers
  async function handleCategorySubmit(e: React.FormEvent) {
    e.preventDefault();
    let imageUrl = categoryForm.image;
    if (imageUrl && typeof imageUrl !== "string") {
      imageUrl = await uploadImage(imageUrl);
    }
    const payload = { ...categoryForm, image: imageUrl };
    const method = editingCategory ? "PUT" : "POST";
    const res = await fetch("/api/category", {
      method,
      body: JSON.stringify(
        editingCategory ? { id: editingCategory, ...payload } : payload
      ),
    });
    if (res.ok) {
      setCategoryForm({
        name: "",
        slug: "",
        description: "",
        image: "",
      });
      setEditingCategory(null);
      fetch("/api/category")
        .then((res) => res.json())
        .then(setCategories);
    }
  }
  function handleCategoryEdit(cat: any) {
    setCategoryForm({
      name: cat.name,
      slug: cat.slug || "",
      description: cat.description,
      image: cat.image || "",
    });
    setEditingCategory(cat.id);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }
  async function handleCategoryDelete(id: string) {
    if (confirm("Delete this category?")) {
      await fetch("/api/category", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      fetch("/api/category")
        .then((res) => res.json())
        .then(setCategories);
    }
  }

  // Package CRUD handlers
  async function handlePackageSubmit(e: React.FormEvent) {
    e.preventDefault();
    let imageUrl = packageForm.image;
    if (imageUrl && typeof imageUrl !== "string") {
      imageUrl = await uploadImage(imageUrl);
    }

    const pt = packageForm.pricingTiers || ({} as any);
    const rawTiers = pt.adultTiers || {};
    const cleanAdultTiers: Record<string, string> = {};
    for (const [k, v] of Object.entries(rawTiers)) {
      if (typeof v === "string" && v.trim() !== "") {
        cleanAdultTiers[k] = v.trim();
      }
    }
    const hasAnyPricing = Boolean(
      pt.adultPrice ||
      pt.kidPrice ||
      pt.infantPrice ||
      pt.couplePrice ||
      Object.keys(cleanAdultTiers).length > 0 ||
      (packageForm.oldPrice && packageForm.oldPrice.trim())
    );
    const cleanTiers = hasAnyPricing ? {
      ...(pt.adultPrice ? { adultPrice: pt.adultPrice } : {}),
      ...(pt.kidPrice ? { kidPrice: pt.kidPrice } : {}),
      ...(pt.infantPrice ? { infantPrice: pt.infantPrice } : {}),
      ...(pt.couplePrice ? { couplePrice: pt.couplePrice } : {}),
      ...(Object.keys(cleanAdultTiers).length > 0 ? { adultTiers: cleanAdultTiers } : {}),
      ...(packageForm.oldPrice && packageForm.oldPrice.trim() ? { oldPrice: packageForm.oldPrice.trim() } : {}),
    } : null;

    const { oldPrice: _unusedOldPrice, ...basePayload } = packageForm;
    const payload = {
      ...basePayload,
      pricingTiers: cleanTiers,
      image: imageUrl,
    };
    const method = editingPackage ? "PUT" : "POST";
    const res = await fetch("/api/package", {
      method,
      body: JSON.stringify(
        editingPackage ? { id: editingPackage, ...payload } : payload
      ),
    });
    if (res.ok) {
      setPackageForm({
        title: "",
        slug: "",
        categoryId: "",
        days: "",
        price: "",
        oldPrice: "",
        pricingTiers: {
          adultPrice: "",
          kidPrice: "",
          infantPrice: "",
          couplePrice: "",
          adultTiers: {
            "1": "",
            "2": "",
            "3": "",
            "4-5": "",
            "6-8": "",
            "9-15": "",
            "16-30": "",
            "31-45": "",
          },
        },
        shortDescription: "",
        detailedDescription: "",
        image: "",
      });
      setEditingPackage(null);
      fetch("/api/package?detailed=true")
        .then((res) => res.json())
        .then(setPackages);
    }
  }
  function handlePackageEdit(pkg: any) {
    const pt = pkg.pricingTiers || {};
    const existingTiers = pt.adultTiers || {};
    setPackageForm({
      title: pkg.title,
      slug: pkg.slug || "",
      categoryId: pkg.categoryId,
      days: pkg.days,
      price: pkg.price || "",
      oldPrice: pkg.oldPrice || pt.oldPrice || "",
      pricingTiers: {
        adultPrice: pt.adultPrice !== undefined ? String(pt.adultPrice) : (pt.adultPrices?.["1"] ? String(pt.adultPrices["1"]) : ""),
        kidPrice: pt.kidPrice !== undefined ? String(pt.kidPrice) : (pt.kidPrices?.["1"] ? String(pt.kidPrices["1"]) : ""),
        infantPrice: pt.infantPrice !== undefined ? String(pt.infantPrice) : (pt.infantPrices?.["1"] ? String(pt.infantPrices["1"]) : ""),
        couplePrice: pt.couplePrice !== undefined ? String(pt.couplePrice) : (pt.adultPrices?.["2"] ? String(pt.adultPrices["2"]) : ""),
        adultTiers: {
          "1": existingTiers["1"] !== undefined ? String(existingTiers["1"]) : (pt.adultPrices?.["1"] ? String(pt.adultPrices["1"]) : ""),
          "2": existingTiers["2"] !== undefined ? String(existingTiers["2"]) : (pt.adultPrices?.["2"] ? String(pt.adultPrices["2"]) : ""),
          "3": existingTiers["3"] !== undefined ? String(existingTiers["3"]) : (pt.adultPrices?.["3"] ? String(pt.adultPrices["3"]) : ""),
          "4-5": existingTiers["4-5"] !== undefined ? String(existingTiers["4-5"]) : (pt.adultPrices?.["4"] ? String(pt.adultPrices["4"]) : ""),
          "6-8": existingTiers["6-8"] !== undefined ? String(existingTiers["6-8"]) : "",
          "9-15": existingTiers["9-15"] !== undefined ? String(existingTiers["9-15"]) : "",
          "16-30": existingTiers["16-30"] !== undefined ? String(existingTiers["16-30"]) : "",
          "31-45": existingTiers["31-45"] !== undefined ? String(existingTiers["31-45"]) : "",
        },
      },
      shortDescription: pkg.shortDescription,
      detailedDescription: pkg.detailedDescription,
      image: pkg.image || "",
    });
    setEditingPackage(pkg.id);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }
  async function handlePackageDelete(id: string) {
    if (confirm("Delete this package?")) {
      await fetch("/api/package", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      fetch("/api/package")
        .then((res) => res.json())
        .then(setPackages);
    }
  }

  // Blog CRUD handlers
  async function handleBlogSubmit(e: React.FormEvent) {
    e.preventDefault();
    let imageUrl = blogForm.image;
    if (imageUrl && typeof imageUrl !== "string") {
      imageUrl = await uploadImage(imageUrl);
    }
    const payload = { ...blogForm, image: imageUrl };
    const method = editingBlog ? "PUT" : "POST";
    const res = await fetch("/api/blog", {
      method,
      body: JSON.stringify(
        editingBlog ? { id: editingBlog, ...payload } : payload
      ),
    });
    if (res.ok) {
      setBlogForm({ title: "", slug: "", excerpt: "", content: "", image: "" });
      setEditingBlog(null);
      fetch("/api/blog")
        .then((res) => res.json())
        .then(setBlogs);
    }
  }
  function handleBlogEdit(blog: any) {
    setBlogForm({
      title: blog.title,
      slug: blog.slug || "",
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image || "",
    });
    setEditingBlog(blog.id);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }
  async function handleBlogDelete(id: string) {
    if (confirm("Delete this blog post?")) {
      await fetch("/api/blog", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      fetch("/api/blog")
        .then((res) => res.json())
        .then(setBlogs);
    }
  }

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus =
      bookingStatusFilter === "ALL" || b.status === bookingStatusFilter;
    const query = bookingSearch.toLowerCase().trim();
    const matchesSearch =
      !query ||
      b.bookingRef?.toLowerCase().includes(query) ||
      b.customerName?.toLowerCase().includes(query) ||
      b.customerEmail?.toLowerCase().includes(query) ||
      b.customerPhone?.toLowerCase().includes(query) ||
      b.packageName?.toLowerCase().includes(query) ||
      b.country?.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const totalBookingsCount = bookings.length;
  const pendingBookingsCount = bookings.filter((b) => b.status === "PENDING").length;
  const confirmedBookingsCount = bookings.filter((b) => b.status === "CONFIRMED").length;
  const totalEstimatedRevenue = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 lg:px-24 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-600">
              Manage your travel packages, tour bookings, and blog content
            </p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="flex flex-wrap gap-2">
            <TabsTrigger value="bookings">
              <Calendar className="inline mr-1" size={16} />
              Bookings
              {pendingBookingsCount > 0 ? (
                <span className="ml-1.5 px-1.5 py-0.5 text-[11px] font-bold bg-amber-500 text-white rounded-full">
                  {pendingBookingsCount}
                </span>
              ) : totalBookingsCount > 0 ? (
                <span className="ml-1.5 px-1.5 py-0.5 text-[11px] font-medium bg-gray-200 text-gray-700 rounded-full">
                  {totalBookingsCount}
                </span>
              ) : null}
            </TabsTrigger>
            <TabsTrigger value="categories">
              <FolderPlus className="inline mr-1" size={16} />
              Categories
            </TabsTrigger>
            <TabsTrigger value="packages">
              <Package className="inline mr-1" size={16} />
              Packages
            </TabsTrigger>
            <TabsTrigger value="blogs">
              <FileText className="inline mr-1" size={16} />
              Blog
            </TabsTrigger>
            <TabsTrigger value="things">
              <BarChart3 className="inline mr-1" size={16} />
              Things to Do
            </TabsTrigger>
          </TabsList>
          {/* Things to Do Tab */}
          <TabsContent value="things">
            <Card>
              <CardHeader>
                <CardTitle>Things to Do</CardTitle>
                <CardDescription>Manage things to do posts</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleThingsSubmit} className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={thingsForm.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setThingsForm((f) => ({
                          ...f,
                          title,
                          slug: editingThings
                            ? f.slug
                            : title
                                .toLowerCase()
                                .trim()
                                .replace(/[^\w\s-]/g, "")
                                .replace(/[\s_-]+/g, "-")
                                .replace(/^-+|-+$/g, ""),
                        }));
                      }}
                      required
                    />
                  </div>
                  <div>
                    <Label>URL Slug (Optional - auto-generated if left blank)</Label>
                    <Input
                      value={thingsForm.slug}
                      onChange={(e) =>
                        setThingsForm((f) => ({ ...f, slug: e.target.value }))
                      }
                      placeholder="e.g. things-to-do-in-colombo"
                    />
                  </div>
                  <div>
                    <Label>Excerpt</Label>
                    <Input
                      value={thingsForm.excerpt}
                      onChange={(e) =>
                        setThingsForm((f) => ({
                          ...f,
                          excerpt: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <RichTextEditor
                      value={thingsForm.content}
                      onChange={(val) =>
                        setThingsForm((f) => ({ ...f, content: val }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={thingsForm.image}
                      onChange={(e) =>
                        setThingsForm((f) => ({ ...f, image: e.target.value }))
                      }
                    />
                  </div>
                  <Button type="submit" variant="default">
                    {editingThings ? "Update" : "Add"} Things to Do
                  </Button>
                  {editingThings && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setEditingThings(null);
                        setThingsForm({
                          title: "",
                          slug: "",
                          excerpt: "",
                          content: "",
                          image: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </form>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Existing Things to Do</h3>
                  <table className="min-w-full bg-white border rounded">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Slug</th>
                        <th className="px-4 py-2 border">Excerpt</th>
                        <th className="px-4 py-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {things.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-2 border">{item.title}</td>
                          <td className="px-4 py-2 border font-mono text-xs text-blue-600">
                            {item.slug || "-"}
                          </td>
                          <td className="px-4 py-2 border">
                            {item.excerpt?.length > 50
                              ? item.excerpt.slice(0, 50) + "..."
                              : item.excerpt}
                          </td>
                          <td className="px-4 py-2 border flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleThingsEdit(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleThingsDelete(item.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Manage travel categories</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={categoryForm.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setCategoryForm((f) => ({
                          ...f,
                          name,
                          slug: editingCategory ? f.slug : name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
                        }));
                      }}
                      required
                    />
                  </div>
                  <div>
                    <Label>URL Slug (Optional - auto-generated if left blank)</Label>
                    <Input
                      value={categoryForm.slug}
                      onChange={(e) =>
                        setCategoryForm((f) => ({ ...f, slug: e.target.value }))
                      }
                      placeholder="e.g. day-tours"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      value={categoryForm.description}
                      onChange={(e) =>
                        setCategoryForm((f) => ({
                          ...f,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={categoryForm.image}
                      onChange={(e) =>
                        setCategoryForm((f) => ({
                          ...f,
                          image: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Button type="submit" variant="default">
                    {editingCategory ? "Update" : "Add"} Category
                  </Button>
                  {editingCategory && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setEditingCategory(null);
                        setCategoryForm({
                          name: "",
                          slug: "",
                          description: "",
                          image: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </form>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Existing Categories</h3>
                  <table className="min-w-full bg-white border rounded">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Image</th>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Slug</th>
                        <th className="px-4 py-2 border">Description</th>
                        <th className="px-4 py-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((cat) => (
                        <tr key={cat.id}>
                          <td className="px-4 py-2 border">
                            {cat.image ? (
                              <img
                                src={cat.image}
                                alt={cat.name}
                                className="h-12 w-12 object-cover rounded"
                              />
                            ) : (
                              <span className="text-gray-400">No image</span>
                            )}
                          </td>
                          <td className="px-4 py-2 border">{cat.name}</td>
                          <td className="px-4 py-2 border font-mono text-xs text-blue-600">{cat.slug || "-"}</td>
                          <td className="px-4 py-2 border">
                            {cat.description?.length > 50
                              ? cat.description.slice(0, 50) + "..."
                              : cat.description}
                          </td>
                          <td className="px-4 py-2 border flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCategoryEdit(cat)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleCategoryDelete(cat.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Packages Tab */}
          <TabsContent value="packages">
            <Card>
              <CardHeader>
                <CardTitle>Packages</CardTitle>
                <CardDescription>Manage travel packages</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePackageSubmit} className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={packageForm.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setPackageForm((f) => ({
                          ...f,
                          title,
                          slug: editingPackage ? f.slug : title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
                        }));
                      }}
                      required
                    />
                  </div>
                  <div>
                    <Label>URL Slug (Optional - auto-generated if left blank)</Label>
                    <Input
                      value={packageForm.slug}
                      onChange={(e) =>
                        setPackageForm((f) => ({ ...f, slug: e.target.value }))
                      }
                      placeholder="e.g. 7-days-cultural-triangle"
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={packageForm.categoryId}
                      onValueChange={(val) =>
                        setPackageForm((f) => ({ ...f, categoryId: val }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Days</Label>
                    <Input
                      value={packageForm.days}
                      onChange={(e) =>
                        setPackageForm((f) => ({ ...f, days: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Price (Display / Starting)</Label>
                      <Input
                        value={packageForm.price}
                        onChange={(e) =>
                          setPackageForm((f) => ({ ...f, price: e.target.value }))
                        }
                        placeholder="e.g. USD $ 119"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <Label>Old Price (Optional)</Label>
                        <span className="text-[11px] text-gray-500 font-normal">Crossed out with line</span>
                      </div>
                      <Input
                        value={packageForm.oldPrice}
                        onChange={(e) =>
                          setPackageForm((f) => ({ ...f, oldPrice: e.target.value }))
                        }
                        placeholder="e.g. USD $ 199"
                      />
                    </div>
                  </div>

                  {/* Per-Person Dynamic Pricing */}
                  {isHoneymoonCategory ? (
                    <div className="p-4 border rounded-xl bg-pink-50/70 border-pink-200 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">💍</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">
                            Honeymoon Package Pricing (Couple - 2 Adults)
                          </h4>
                          <p className="text-xs text-gray-600">
                            Honeymoon packages are exclusively for couples. Enter the total tour price for the couple below:
                          </p>
                        </div>
                      </div>
                      <div className="max-w-xs flex items-center gap-2 bg-white p-2.5 rounded-lg border border-pink-200">
                        <span className="text-xs font-semibold text-gray-700 w-32">Price per Couple:</span>
                        <span className="text-gray-400 font-semibold">$</span>
                        <Input
                          type="number"
                          className="h-8 text-sm"
                          placeholder="e.g. 850"
                          value={packageForm.pricingTiers?.couplePrice ?? ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPackageForm((f) => ({
                              ...f,
                              pricingTiers: {
                                ...f.pricingTiers,
                                couplePrice: val,
                              },
                            }));
                          }}
                        />
                        <span className="text-xs text-gray-400">USD</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border rounded-xl bg-slate-50 border-slate-200 space-y-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold text-gray-900 text-sm">
                            Group Size Tiered Pricing ($ USD / Person)
                          </h4>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Set the per-person rate for each group range. If a customer enters 4 or 5 adults, the 4-5 tier price will be applied automatically.
                        </p>
                      </div>

                      {/* 8 Group Range Inputs */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {GROUP_TIERS.map((tier) => (
                          <div
                            key={tier.key}
                            className="bg-white p-2.5 rounded-lg border border-primary/20 space-y-1 shadow-sm hover:border-primary/40 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <Label className="text-xs font-bold text-gray-800">
                                {tier.label}
                              </Label>
                              <span className="text-[10px] font-semibold text-primary/70 bg-primary/10 px-1.5 py-0.5 rounded">
                                {tier.key}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400 font-bold text-xs">$</span>
                              <Input
                                type="number"
                                className="h-7 text-xs font-medium"
                                placeholder="e.g. 80"
                                value={packageForm.pricingTiers?.adultTiers?.[tier.key] ?? ""}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setPackageForm((f) => ({
                                    ...f,
                                    pricingTiers: {
                                      ...f.pricingTiers,
                                      adultTiers: {
                                        ...(f.pricingTiers?.adultTiers || {}),
                                        [tier.key]: val,
                                      },
                                    },
                                  }));
                                }}
                              />
                              <span className="text-[10px] text-gray-400 font-semibold">PP</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Children & Infants Pricing */}
                      <div className="pt-2 border-t border-slate-200">
                        <h5 className="text-xs font-semibold text-gray-700 mb-2">
                          Child & Infant Rates (Optional)
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Child Price */}
                          <div className="bg-white p-2.5 rounded-lg border border-secondary/20 space-y-1 shadow-sm">
                            <Label className="text-xs font-semibold text-secondary block">
                              Child Price (Age 3-12)
                            </Label>
                            <div className="flex items-center gap-1.5">
                              <span className="text-gray-400 font-bold text-xs">$</span>
                              <Input
                                type="number"
                                className="h-8 text-xs"
                                placeholder="e.g. 75"
                                value={packageForm.pricingTiers?.kidPrice ?? ""}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setPackageForm((f) => ({
                                    ...f,
                                    pricingTiers: {
                                      ...f.pricingTiers,
                                      kidPrice: val,
                                    },
                                  }));
                                }}
                              />
                              <span className="text-xs text-gray-400">USD</span>
                            </div>
                            <p className="text-[10px] text-gray-400">
                              {packageForm.pricingTiers?.kidPrice
                                ? `$${packageForm.pricingTiers.kidPrice} / child`
                                : "0 or empty if free"}
                            </p>
                          </div>

                          {/* Infant Price */}
                          <div className="bg-white p-2.5 rounded-lg border border-emerald-200 space-y-1 shadow-sm">
                            <Label className="text-xs font-semibold text-emerald-700 block">
                              Infant Price (Age 0-2)
                            </Label>
                            <div className="flex items-center gap-1.5">
                              <span className="text-gray-400 font-bold text-xs">$</span>
                              <Input
                                type="number"
                                className="h-8 text-xs"
                                placeholder="0"
                                value={packageForm.pricingTiers?.infantPrice ?? ""}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setPackageForm((f) => ({
                                    ...f,
                                    pricingTiers: {
                                      ...f.pricingTiers,
                                      infantPrice: val,
                                    },
                                  }));
                                }}
                              />
                              <span className="text-xs text-gray-400">USD</span>
                            </div>
                            <p className="text-[10px] text-gray-400">
                              {packageForm.pricingTiers?.infantPrice
                                ? `$${packageForm.pricingTiers.infantPrice} / infant`
                                : "0 or empty if free"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div>
                    <Label>Short Description</Label>
                    <Input
                      value={packageForm.shortDescription}
                      onChange={(e) =>
                        setPackageForm((f) => ({
                          ...f,
                          shortDescription: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Detailed Description</Label>
                    <RichTextEditor
                      value={packageForm.detailedDescription}
                      onChange={(val) =>
                        setPackageForm((f) => ({
                          ...f,
                          detailedDescription: val,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={packageForm.image}
                      onChange={(e) =>
                        setPackageForm((f) => ({ ...f, image: e.target.value }))
                      }
                    />
                  </div>
                  <Button type="submit" variant="default">
                    {editingPackage ? "Update" : "Add"} Package
                  </Button>
                  {editingPackage && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setEditingPackage(null);
                        setPackageForm({
                          title: "",
                          slug: "",
                          categoryId: "",
                          days: "",
                          price: "",
                          oldPrice: "",
                          pricingTiers: {
                            adultPrice: "",
                            kidPrice: "",
                            infantPrice: "",
                            couplePrice: "",
                            adultTiers: {
                              "1": "",
                              "2": "",
                              "3": "",
                              "4-5": "",
                              "6-8": "",
                              "9-15": "",
                              "16-30": "",
                              "31-45": "",
                            },
                          },
                          shortDescription: "",
                          detailedDescription: "",
                          image: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </form>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Existing Packages</h3>
                  <table className="min-w-full bg-white border rounded">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Image</th>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Slug</th>
                        <th className="px-4 py-2 border">Price</th>
                        <th className="px-4 py-2 border">Short Description</th>
                        <th className="px-4 py-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map((pkg) => (
                        <tr key={pkg.id}>
                          <td className="px-4 py-2 border">
                            {pkg.image ? (
                              <img
                                src={pkg.image}
                                alt={pkg.title}
                                className="h-12 w-12 object-cover rounded"
                              />
                            ) : (
                              <span className="text-gray-400">No image</span>
                            )}
                          </td>
                          <td className="px-4 py-2 border">{pkg.title}</td>
                          <td className="px-4 py-2 border font-mono text-xs text-blue-600">{pkg.slug || "-"}</td>
                          <td className="px-4 py-2 border">
                            <div className="flex flex-col">
                              {(pkg.oldPrice || pkg.pricingTiers?.oldPrice) && (
                                <span className="text-xs text-red-500 line-through">
                                  {pkg.oldPrice || pkg.pricingTiers?.oldPrice}
                                </span>
                              )}
                              <span className="font-medium text-gray-900">{pkg.price || "N/A"}</span>
                            </div>
                          </td>
                          <td className="px-4 py-2 border">
                            {pkg.shortDescription?.length > 50
                              ? pkg.shortDescription.slice(0, 50) + "..."
                              : pkg.shortDescription}
                          </td>
                          <td className="px-4 py-2 border flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePackageEdit(pkg)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handlePackageDelete(pkg.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Blog Tab */}
          <TabsContent value="blogs">
            <Card>
              <CardHeader>
                <CardTitle>Blog</CardTitle>
                <CardDescription>Manage blog posts</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={blogForm.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setBlogForm((f) => ({
                          ...f,
                          title,
                          slug: editingBlog
                            ? f.slug
                            : title
                                .toLowerCase()
                                .trim()
                                .replace(/[^\w\s-]/g, "")
                                .replace(/[\s_-]+/g, "-")
                                .replace(/^-+|-+$/g, ""),
                        }));
                      }}
                      required
                    />
                  </div>
                  <div>
                    <Label>URL Slug (Optional - auto-generated if left blank)</Label>
                    <Input
                      value={blogForm.slug}
                      onChange={(e) =>
                        setBlogForm((f) => ({ ...f, slug: e.target.value }))
                      }
                      placeholder="e.g. travel-guide-sri-lanka"
                    />
                  </div>
                  <div>
                    <Label>Excerpt</Label>
                    <Input
                      value={blogForm.excerpt}
                      onChange={(e) =>
                        setBlogForm((f) => ({ ...f, excerpt: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <RichTextEditor
                      value={blogForm.content}
                      onChange={(val) =>
                        setBlogForm((f) => ({ ...f, content: val }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={blogForm.image}
                      onChange={(e) =>
                        setBlogForm((f) => ({ ...f, image: e.target.value }))
                      }
                    />
                  </div>
                  <Button type="submit" variant="default">
                    {editingBlog ? "Update" : "Add"} Blog Post
                  </Button>
                  {editingBlog && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setEditingBlog(null);
                        setBlogForm({
                          title: "",
                          slug: "",
                          excerpt: "",
                          content: "",
                          image: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </form>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Existing Blog Posts</h3>
                  <table className="min-w-full bg-white border rounded">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Slug</th>
                        <th className="px-4 py-2 border">Excerpt</th>
                        <th className="px-4 py-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((blog) => (
                        <tr key={blog.id}>
                          <td className="px-4 py-2 border">{blog.title}</td>
                          <td className="px-4 py-2 border font-mono text-xs text-blue-600">
                            {blog.slug || "-"}
                          </td>
                          <td className="px-4 py-2 border">
                            {blog.excerpt?.length > 50
                              ? blog.excerpt.slice(0, 50) + "..."
                              : blog.excerpt}
                          </td>
                          <td className="px-4 py-2 border flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleBlogEdit(blog)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleBlogDelete(blog.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-primary shadow-xs py-0">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total Inquiries
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {totalBookingsCount}
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <Calendar size={22} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500 shadow-xs py-0">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                      Pending Review
                    </p>
                    <p className="text-2xl font-bold text-amber-900 mt-1">
                      {pendingBookingsCount}
                    </p>
                  </div>
                  <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
                    <Clock size={22} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-emerald-500 shadow-xs py-0">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                      Confirmed Tours
                    </p>
                    <p className="text-2xl font-bold text-emerald-900 mt-1">
                      {confirmedBookingsCount}
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
                    <CheckCircle2 size={22} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-400 shadow-xs py-0">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Est. Total Value
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      ${totalEstimatedRevenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 text-yellow-800 rounded-xl">
                    <DollarSign size={22} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Bookings Management Card */}
            <Card>
              <CardHeader className="pb-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Tour Inquiries & Bookings
                    </CardTitle>
                    <CardDescription>
                      Review, manage, and confirm customer booking requests submitted across your website.
                    </CardDescription>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchBookings}
                    disabled={bookingsLoading}
                    className="flex items-center gap-2 self-start md:self-auto cursor-pointer"
                  >
                    <RefreshCw
                      size={15}
                      className={bookingsLoading ? "animate-spin" : ""}
                    />
                    <span>{bookingsLoading ? "Refreshing..." : "Refresh"}</span>
                  </Button>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <div className="relative flex-1">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      placeholder="Search ref, customer, email, phone, package, country..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="pl-9 bg-white"
                    />
                  </div>

                  <div className="w-full sm:w-48">
                    <Select
                      value={bookingStatusFilter}
                      onValueChange={setBookingStatusFilter}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">All Statuses ({totalBookingsCount})</SelectItem>
                        <SelectItem value="PENDING">Pending ({pendingBookingsCount})</SelectItem>
                        <SelectItem value="CONFIRMED">Confirmed ({confirmedBookingsCount})</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {bookingsLoading && bookings.length === 0 ? (
                  <div className="py-16 text-center text-gray-500">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-3 text-primary" />
                    <p className="text-sm font-medium">Loading bookings...</p>
                  </div>
                ) : filteredBookings.length === 0 ? (
                  <div className="py-16 text-center text-gray-500 px-4">
                    <Calendar className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                    <h3 className="text-base font-semibold text-gray-800">
                      No bookings found
                    </h3>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto mt-1">
                      {bookingSearch || bookingStatusFilter !== "ALL"
                        ? "No bookings match your current search or filter criteria."
                        : "No tour bookings or inquiries have been received yet."}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-50/80 border-b text-xs uppercase font-semibold text-gray-500 tracking-wider">
                          <th className="px-4 py-3">Reference / Date</th>
                          <th className="px-4 py-3">Customer</th>
                          <th className="px-4 py-3">Tour Package</th>
                          <th className="px-4 py-3">Travelers & Dates</th>
                          <th className="px-4 py-3">Total Price</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredBookings.map((b) => {
                          const cleanPhone = (b.customerPhone || "").replace(/[^0-9]/g, "");
                          const waText = encodeURIComponent(
                            `Hello ${b.customerName}, thank you for contacting Fly To Lanka Tours regarding your inquiry (${b.bookingRef || "Tour"}). We'd love to help you plan your trip!`
                          );

                          return (
                            <tr
                              key={b.id}
                              className="hover:bg-slate-50/60 transition-colors"
                            >
                              {/* Ref & Date */}
                              <td className="px-4 py-3 align-top whitespace-nowrap">
                                <div className="font-mono font-bold text-primary text-xs bg-primary/5 px-2 py-0.5 rounded inline-block">
                                  {b.bookingRef || `FTL-${b.id.slice(-6).toUpperCase()}`}
                                </div>
                                <div className="text-[11px] text-gray-500 mt-1">
                                  {new Date(b.createdAt).toLocaleDateString()}
                                </div>
                              </td>

                              {/* Customer */}
                              <td className="px-4 py-3 align-top">
                                <div className="font-semibold text-gray-900">
                                  {b.customerName}
                                </div>
                                <div className="text-xs text-gray-600 truncate max-w-[200px]">
                                  <a
                                    href={`mailto:${b.customerEmail}`}
                                    className="hover:text-primary hover:underline flex items-center gap-1 mt-0.5"
                                  >
                                    <Mail size={12} className="shrink-0 text-gray-400" />
                                    <span>{b.customerEmail}</span>
                                  </a>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <a
                                    href={`tel:${b.customerPhone}`}
                                    className="text-xs text-gray-700 hover:text-primary flex items-center gap-1"
                                  >
                                    <Phone size={12} className="shrink-0 text-gray-400" />
                                    <span>{b.customerPhone}</span>
                                  </a>
                                  {cleanPhone && (
                                    <a
                                      href={`https://wa.me/${cleanPhone}?text=${waText}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title="Open WhatsApp chat"
                                      className="inline-flex items-center text-[10px] bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-1.5 py-0.5 rounded font-medium border border-emerald-200 transition-colors"
                                    >
                                      WhatsApp
                                    </a>
                                  )}
                                </div>
                                {b.country && (
                                  <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                                    <MapPin size={11} className="text-gray-400" />
                                    <span>{b.country}</span>
                                  </div>
                                )}
                              </td>

                              {/* Tour Package */}
                              <td className="px-4 py-3 align-top">
                                <div className="font-medium text-gray-900 max-w-[220px]">
                                  {b.packageName}
                                </div>
                                {b.specialNotes && (
                                  <div className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded p-1.5 mt-1 max-w-[220px] line-clamp-2">
                                    <strong>Note:</strong> {b.specialNotes}
                                  </div>
                                )}
                              </td>

                              {/* Travelers & Dates */}
                              <td className="px-4 py-3 align-top text-xs text-gray-700 whitespace-nowrap">
                                <div>
                                  <strong>Arrival:</strong> {b.arrivalDate || "Not set"}
                                </div>
                                {b.departureDate && (
                                  <div>
                                    <strong>Depart:</strong> {b.departureDate}
                                  </div>
                                )}
                                <div className="text-gray-500 mt-1">
                                  {b.adults} Adults
                                  {b.children > 0 && `, ${b.children} Kids`}
                                  {b.infants > 0 && `, ${b.infants} Inf`}
                                </div>
                              </td>

                              {/* Total Price */}
                              <td className="px-4 py-3 align-top whitespace-nowrap">
                                <div className="font-bold text-gray-900 text-sm">
                                  {b.totalPrice ? `$${Number(b.totalPrice).toFixed(0)}` : "—"}
                                </div>
                                {b.adultTotal && (
                                  <div className="text-[11px] text-gray-500">
                                    ${b.adultTotal} adults
                                  </div>
                                )}
                              </td>

                              {/* Status Dropdown */}
                              <td className="px-4 py-3 align-top whitespace-nowrap">
                                <Select
                                  value={b.status || "PENDING"}
                                  onValueChange={(val) => handleUpdateBookingStatus(b.id, val)}
                                >
                                  <SelectTrigger
                                    className={`h-8 text-xs font-semibold rounded-full border px-2.5 ${
                                      b.status === "CONFIRMED"
                                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                        : b.status === "CANCELLED"
                                        ? "bg-red-50 text-red-800 border-red-300"
                                        : "bg-amber-50 text-amber-800 border-amber-300"
                                    }`}
                                  >
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="PENDING">● Pending</SelectItem>
                                    <SelectItem value="CONFIRMED">● Confirmed</SelectItem>
                                    <SelectItem value="CANCELLED">● Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>

                              {/* Actions */}
                              <td className="px-4 py-3 align-top text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedBooking(b);
                                      setIsDetailsOpen(true);
                                    }}
                                    className="h-8 px-2.5 text-xs flex items-center gap-1 cursor-pointer"
                                  >
                                    <Eye size={13} />
                                    <span>View</span>
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDeleteBooking(b.id)}
                                    className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                                    title="Delete booking"
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Detailed Booking Modal */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                {selectedBooking && (
                  <>
                    <DialogHeader>
                      <div className="flex items-center justify-between gap-2 pr-6">
                        <div>
                          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <span>Booking Details</span>
                            <span className="font-mono text-sm bg-primary/10 text-primary px-2.5 py-0.5 rounded">
                              {selectedBooking.bookingRef || `FTL-${selectedBooking.id.slice(-6).toUpperCase()}`}
                            </span>
                          </DialogTitle>
                          <DialogDescription className="text-xs text-gray-500 mt-1">
                            Received on {new Date(selectedBooking.createdAt).toLocaleString()}
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>

                    <div className="space-y-5 pt-2">
                      {/* Customer Details Box */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <h4 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2">
                          Customer Information
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500 block text-xs">Name:</span>
                            <span className="font-bold text-gray-900">{selectedBooking.customerName}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-xs">Country:</span>
                            <span className="font-medium text-gray-900">{selectedBooking.country || "Not specified"}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-xs">Email:</span>
                            <a
                              href={`mailto:${selectedBooking.customerEmail}`}
                              className="text-primary hover:underline font-medium"
                            >
                              {selectedBooking.customerEmail}
                            </a>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-xs">Phone / WhatsApp:</span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <a
                                href={`tel:${selectedBooking.customerPhone}`}
                                className="font-medium text-gray-900 hover:text-primary"
                              >
                                {selectedBooking.customerPhone}
                              </a>
                              {selectedBooking.customerPhone && (
                                <a
                                  href={`https://wa.me/${selectedBooking.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                    `Hello ${selectedBooking.customerName}, thank you for your Fly To Lanka Tours inquiry (${selectedBooking.bookingRef}). We are ready to assist you!`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs bg-emerald-600 text-white hover:bg-emerald-700 px-2 py-0.5 rounded font-medium transition-colors"
                                >
                                  Chat on WhatsApp
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tour Details */}
                      <div className="p-4 rounded-xl bg-white border border-slate-200">
                        <h4 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2">
                          Tour & Travel Schedule
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="sm:col-span-2">
                            <span className="text-gray-500 block text-xs">Package Selected:</span>
                            <span className="font-bold text-gray-900 text-base">{selectedBooking.packageName}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-xs">Arrival Date:</span>
                            <span className="font-medium text-gray-800">{selectedBooking.arrivalDate || "Not set"}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-xs">Departure Date:</span>
                            <span className="font-medium text-gray-800">{selectedBooking.departureDate || "Not set"}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-xs">Travelers Breakdown:</span>
                            <span className="font-medium text-gray-800">
                              {selectedBooking.adults} Adults, {selectedBooking.children || 0} Children, {selectedBooking.infants || 0} Infants
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-xs">Account Status:</span>
                            <span className="text-xs text-gray-700 font-medium">
                              {selectedBooking.clerkUserId ? "Registered Member" : "Guest Inquiry"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price Breakdown */}
                      <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                        <h4 className="text-xs uppercase font-semibold text-amber-800 tracking-wider mb-2">
                          Pricing Breakdown
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                          <div>
                            <span className="text-xs text-gray-500 block">Adults:</span>
                            <span className="font-semibold text-gray-800">
                              ${selectedBooking.adultTotal || 0}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 block">Children:</span>
                            <span className="font-semibold text-gray-800">
                              ${selectedBooking.kidTotal || 0}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 block">Infants:</span>
                            <span className="font-semibold text-gray-800">
                              ${selectedBooking.infantTotal || 0}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-amber-900 font-bold block">Total Est.:</span>
                            <span className="font-bold text-lg text-primary">
                              ${selectedBooking.totalPrice || 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Special Notes */}
                      {selectedBooking.specialNotes && (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <h4 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-1 flex items-center gap-1.5">
                            <MessageSquare size={14} className="text-primary" />
                            Special Requests / Customer Notes
                          </h4>
                          <p className="text-sm text-gray-800 whitespace-pre-wrap italic mt-1 bg-white p-3 rounded-lg border border-slate-100">
                            "{selectedBooking.specialNotes}"
                          </p>
                        </div>
                      )}

                      {/* Status Selector in Modal */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <span className="text-xs font-semibold text-gray-600">Booking Status:</span>
                          <Select
                            value={selectedBooking.status || "PENDING"}
                            onValueChange={(val) => handleUpdateBookingStatus(selectedBooking.id, val)}
                          >
                            <SelectTrigger className="w-40 h-9 bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PENDING">● Pending</SelectItem>
                              <SelectItem value="CONFIRMED">● Confirmed</SelectItem>
                              <SelectItem value="CANCELLED">● Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteBooking(selectedBooking.id)}
                            className="cursor-pointer"
                          >
                            Delete Booking
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsDetailsOpen(false)}
                            className="cursor-pointer"
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
// ...existing code...
