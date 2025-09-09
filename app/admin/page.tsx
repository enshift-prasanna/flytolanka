"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Plus, Trash2, Save, Eye, Package, FileText, Users, Car, BarChart3, FolderPlus } from "lucide-react"

import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";

const AdminPage: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    // Only redirect if not authenticated and not already on /admin/login
    if (!user && typeof window !== "undefined" && window.location.pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [user, router]);
  const [activeTab, setActiveTab] = useState("categories")

  // Only render admin panel if authenticated
  if (!user) return null;

  // Category CRUD
  // Return early before any hooks if not authenticated
  if (!user) {
    if (typeof window !== "undefined" && window.location.pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
    return null;
  }
  const [editingCategory, setEditingCategory] = useState<string|null>(null)

  // Package CRUD
  const [packageForm, setPackageForm] = useState({ title: "", categoryId: "", days: "", shortDescription: "", detailedDescription: "", image: "" })
  const [packages, setPackages] = useState<any[]>([])
  const [editingPackage, setEditingPackage] = useState<string|null>(null)

  // Blog CRUD
  const [blogForm, setBlogForm] = useState({ title: "", excerpt: "", content: "", image: "" })
  const [blogs, setBlogs] = useState<any[]>([])
  const [editingBlog, setEditingBlog] = useState<string|null>(null)

  // Cloudinary config
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dgyxftryr/upload";
  const CLOUDINARY_UPLOAD_PRESET = "ftl_main";

  // Fetch lists
  useEffect(() => {
    fetch("/api/category").then(res => res.json()).then(setCategories)
    fetch("/api/package").then(res => res.json()).then(setPackages)
    fetch("/api/blog").then(res => res.json()).then(setBlogs)
  }, [])

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
    if (imageUrl && typeof imageUrl !== 'string') {
      imageUrl = await uploadImage(imageUrl);
    }
    const payload = { ...categoryForm, image: imageUrl };
    const method = editingCategory ? "PUT" : "POST";
    const res = await fetch("/api/category", { method, body: JSON.stringify(editingCategory ? { id: editingCategory, ...payload } : payload) });
    if (res.ok) {
      setCategoryForm({ name: "", description: "", image: "", defaultText: "" });
      setEditingCategory(null);
      fetch("/api/category").then(res => res.json()).then(setCategories);
    }
  }
  function handleCategoryEdit(cat: any) {
    setCategoryForm({ name: cat.name, description: cat.description, image: cat.image || "", defaultText: cat.defaultText || "" });
    setEditingCategory(cat.id);
  }
  async function handleCategoryDelete(id: string) {
    if (confirm("Delete this category?")) {
      await fetch("/api/category", { method: "DELETE", body: JSON.stringify({ id }) });
      fetch("/api/category").then(res => res.json()).then(setCategories);
    }
  }

  // Package CRUD handlers
  async function handlePackageSubmit(e: React.FormEvent) {
    e.preventDefault();
    let imageUrl = packageForm.image;
    if (imageUrl && typeof imageUrl !== 'string') {
      imageUrl = await uploadImage(imageUrl);
    }
    const payload = { ...packageForm, image: imageUrl };
    const method = editingPackage ? "PUT" : "POST";
    const res = await fetch("/api/package", { method, body: JSON.stringify(editingPackage ? { id: editingPackage, ...payload } : payload) });
    if (res.ok) {
      setPackageForm({ title: "", categoryId: "", days: "", shortDescription: "", detailedDescription: "", image: "" });
      setEditingPackage(null);
      fetch("/api/package").then(res => res.json()).then(setPackages);
    }
  }
  function handlePackageEdit(pkg: any) {
    setPackageForm({ title: pkg.title, categoryId: pkg.categoryId, days: pkg.days, shortDescription: pkg.shortDescription, detailedDescription: pkg.detailedDescription, image: pkg.image || "" });
    setEditingPackage(pkg.id);
  }
  async function handlePackageDelete(id: string) {
    if (confirm("Delete this package?")) {
      await fetch("/api/package", { method: "DELETE", body: JSON.stringify({ id }) });
      fetch("/api/package").then(res => res.json()).then(setPackages);
    }
  }

  // Blog CRUD handlers
  async function handleBlogSubmit(e: React.FormEvent) {
    e.preventDefault();
    let imageUrl = blogForm.image;
    if (imageUrl && typeof imageUrl !== 'string') {
      imageUrl = await uploadImage(imageUrl);
    }
    const payload = { ...blogForm, image: imageUrl };
    const method = editingBlog ? "PUT" : "POST";
    const res = await fetch("/api/blog", { method, body: JSON.stringify(editingBlog ? { id: editingBlog, ...payload } : payload) });
    if (res.ok) {
      setBlogForm({ title: "", excerpt: "", content: "", image: "" });
      setEditingBlog(null);
      fetch("/api/blog").then(res => res.json()).then(setBlogs);
    }
  }
  function handleBlogEdit(blog: any) {
    setBlogForm({ title: blog.title, excerpt: blog.excerpt, content: blog.content, image: blog.image || "" });
    setEditingBlog(blog.id);
  }
  async function handleBlogDelete(id: string) {
    if (confirm("Delete this blog post?")) {
      await fetch("/api/blog", { method: "DELETE", body: JSON.stringify({ id }) });
      fetch("/api/blog").then(res => res.json()).then(setBlogs);
    }
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 lg:px-24 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage your travel packages and blog content</p>
          </div>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>
        {/* ...existing code... (Tabs, CRUD forms, etc.) */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* ...existing code... */}
        </Tabs>
      </div>
    </div>
  );
}

export default AdminPage
// ...existing code...
