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
  const [activeTab, setActiveTab] = useState("categories")
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "", image: "", defaultText: "" });
  const [editingCategory, setEditingCategory] = useState<string|null>(null)
  const [packageForm, setPackageForm] = useState({ title: "", categoryId: "", days: "", shortDescription: "", detailedDescription: "", image: "" })
  const [packages, setPackages] = useState<any[]>([])
  const [editingPackage, setEditingPackage] = useState<string|null>(null)
  const [blogForm, setBlogForm] = useState({ title: "", excerpt: "", content: "", image: "" })
  const [blogs, setBlogs] = useState<any[]>([])
  const [editingBlog, setEditingBlog] = useState<string|null>(null)
  // Cloudinary config
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dgyxftryr/upload";
  const CLOUDINARY_UPLOAD_PRESET = "ftl_main";

  // Redirect to login if not authenticated
  useEffect(() => {
    // Only redirect if not authenticated and not already on /admin/login
    if (!user && typeof window !== "undefined" && window.location.pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [user, router]);

  // Fetch lists
  useEffect(() => {
    fetch("/api/category").then(res => res.json()).then(setCategories)
    fetch("/api/package?detailed=true").then(res => res.json()).then(setPackages)
    fetch("/api/blog").then(res => res.json()).then(setBlogs)
  }, [])

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
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
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
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
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
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex gap-2">
            <TabsTrigger value="categories"><FolderPlus className="inline mr-1" size={16}/>Categories</TabsTrigger>
            <TabsTrigger value="packages"><Package className="inline mr-1" size={16}/>Packages</TabsTrigger>
            <TabsTrigger value="blogs"><FileText className="inline mr-1" size={16}/>Blog</TabsTrigger>
          </TabsList>
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
                    <Input value={categoryForm.name} onChange={e => setCategoryForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input value={categoryForm.description} onChange={e => setCategoryForm(f => ({ ...f, description: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input value={categoryForm.image} onChange={e => setCategoryForm(f => ({ ...f, image: e.target.value }))} />
                  </div>
                    <div>
                      <Label>Default Text</Label>
                      <RichTextEditor value={categoryForm.defaultText} onChange={val => setCategoryForm(f => ({ ...f, defaultText: val }))} />
                    </div>
                  <Button type="submit" variant="default">{editingCategory ? "Update" : "Add"} Category</Button>
                  {editingCategory && <Button type="button" variant="secondary" onClick={() => { setEditingCategory(null); setCategoryForm({ name: "", description: "", image: "", defaultText: "" }); }}>Cancel</Button>}
                </form>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Existing Categories</h3>
                  <table className="min-w-full bg-white border rounded">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Image</th>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Description</th>
                        <th className="px-4 py-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(cat => (
                        <tr key={cat.id}>
                          <td className="px-4 py-2 border">
                            {cat.image ? <img src={cat.image} alt={cat.name} className="h-12 w-12 object-cover rounded" /> : <span className="text-gray-400">No image</span>}
                          </td>
                          <td className="px-4 py-2 border">{cat.name}</td>
                          <td className="px-4 py-2 border">{cat.description?.length > 50 ? cat.description.slice(0, 50) + '...' : cat.description}</td>
                          <td className="px-4 py-2 border flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleCategoryEdit(cat)}>Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleCategoryDelete(cat.id)}>Delete</Button>
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
                    <Input value={packageForm.title} onChange={e => setPackageForm(f => ({ ...f, title: e.target.value }))} required />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select value={packageForm.categoryId} onValueChange={val => setPackageForm(f => ({ ...f, categoryId: val }))}>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Days</Label>
                    <Input value={packageForm.days} onChange={e => setPackageForm(f => ({ ...f, days: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Short Description</Label>
                    <Input value={packageForm.shortDescription} onChange={e => setPackageForm(f => ({ ...f, shortDescription: e.target.value }))} />
                  </div>
                    <div>
                      <Label>Detailed Description</Label>
                      <RichTextEditor value={packageForm.detailedDescription} onChange={val => setPackageForm(f => ({ ...f, detailedDescription: val }))} />
                    </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input value={packageForm.image} onChange={e => setPackageForm(f => ({ ...f, image: e.target.value }))} />
                  </div>
                  <Button type="submit" variant="default">{editingPackage ? "Update" : "Add"} Package</Button>
                  {editingPackage && <Button type="button" variant="secondary" onClick={() => { setEditingPackage(null); setPackageForm({ title: "", categoryId: "", days: "", shortDescription: "", detailedDescription: "", image: "" }); }}>Cancel</Button>}
                </form>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Existing Packages</h3>
                  <table className="min-w-full bg-white border rounded">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Image</th>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Short Description</th>
                        <th className="px-4 py-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map(pkg => (
                        <tr key={pkg.id}>
                          <td className="px-4 py-2 border">
                            {pkg.image ? <img src={pkg.image} alt={pkg.title} className="h-12 w-12 object-cover rounded" /> : <span className="text-gray-400">No image</span>}
                          </td>
                          <td className="px-4 py-2 border">{pkg.title}</td>
                          <td className="px-4 py-2 border">{pkg.shortDescription?.length > 50 ? pkg.shortDescription.slice(0, 50) + '...' : pkg.shortDescription}</td>
                          <td className="px-4 py-2 border flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handlePackageEdit(pkg)}>Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => handlePackageDelete(pkg.id)}>Delete</Button>
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
                    <Input value={blogForm.title} onChange={e => setBlogForm(f => ({ ...f, title: e.target.value }))} required />
                  </div>
                  <div>
                    <Label>Excerpt</Label>
                    <Input value={blogForm.excerpt} onChange={e => setBlogForm(f => ({ ...f, excerpt: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <RichTextEditor value={blogForm.content} onChange={val => setBlogForm(f => ({ ...f, content: val }))} />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input value={blogForm.image} onChange={e => setBlogForm(f => ({ ...f, image: e.target.value }))} />
                  </div>
                  <Button type="submit" variant="default">{editingBlog ? "Update" : "Add"} Blog Post</Button>
                  {editingBlog && <Button type="button" variant="secondary" onClick={() => { setEditingBlog(null); setBlogForm({ title: "", excerpt: "", content: "", image: "" }); }}>Cancel</Button>}
                </form>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Existing Blog Posts</h3>
                  <table className="min-w-full bg-white border rounded">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Excerpt</th>
                        <th className="px-4 py-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map(blog => (
                        <tr key={blog.id}>
                          <td className="px-4 py-2 border">{blog.title}</td>
                          <td className="px-4 py-2 border">{blog.excerpt?.length > 50 ? blog.excerpt.slice(0, 50) + '...' : blog.excerpt}</td>
                          <td className="px-4 py-2 border flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleBlogEdit(blog)}>Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleBlogDelete(blog.id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminPage
// ...existing code...
