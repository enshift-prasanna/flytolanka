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

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("categories")

  // Category CRUD
  const [categoryForm, setCategoryForm] = useState<{ name: string; description: string; image: string | File; defaultText: string }>({ name: "", description: "", image: "", defaultText: "" })
  const [categories, setCategories] = useState<any[]>([])
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 lg:px-24 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage your travel packages and blog content</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <FolderPlus className="h-4 w-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Packages
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Blogs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Package Category</CardTitle>
                <CardDescription>Create a new category for organizing travel packages</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCategorySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category-name">Category Name</Label>
                      <Input
                        id="category-name"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Cultural Tours"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category-image">Category Image</Label>
                      <Input
                        id="category-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCategoryForm((prev) => ({ ...prev, image: e.target.files?.[0] ?? "" }))}
                      />
                      {typeof categoryForm.image === "string" && categoryForm.image && (
                        <img src={categoryForm.image} alt="Category" className="h-16 mt-2" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category-description">Category Description</Label>
                    <Input
                      id="category-description"
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of this category"
                      required
                    />
                  </div>

                  <RichTextEditor
                    label="Default Text (appears in all packages of this category)"
                    value={categoryForm.defaultText}
                    onChange={(value) => setCategoryForm((prev) => ({ ...prev, defaultText: value }))}
                    placeholder="Enter default text that will appear at the bottom of every package in this category..."
                  />

                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="mr-2 h-4 w-4" />
                    {editingCategory ? "Update" : "Save"} Category
                  </Button>
                  {editingCategory && (
                    <Button type="button" variant="outline" onClick={() => { setEditingCategory(null); setCategoryForm({ name: "", description: "", image: "", defaultText: "" }); }}>Cancel Edit</Button>
                  )}
                {/* Category List */}
                <div className="mt-8">
                  <h2 className="font-semibold mb-2">Categories</h2>
                  <ul className="space-y-2">
                    {categories.map(cat => (
                      <li key={cat.id} className="flex items-center gap-2">
                        {cat.image && <img src={cat.image} alt="" className="h-8 w-8 object-cover rounded" />}
                        <span className="font-medium">{cat.name}</span>
                        <Button size="sm" variant="outline" onClick={() => handleCategoryEdit(cat)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleCategoryDelete(cat.id)}><Trash2 className="h-4 w-4" /></Button>
                      </li>
                    ))}
                  </ul>
                </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Package</CardTitle>
                <CardDescription>Create a new travel package with detailed information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePackageSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="package-title">Package Title</Label>
                      <Input
                        id="package-title"
                        value={packageForm.title}
                        onChange={(e) => setPackageForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Cultural Triangle Explorer"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="package-category">Category</Label>
                      <Select
                        value={packageForm.categoryId}
                        onValueChange={(value) => setPackageForm((prev) => ({ ...prev, categoryId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="package-days">Number of Days</Label>
                      <Input
                        id="package-days"
                        type="text" // Changed from number to text input
                        value={packageForm.days}
                        onChange={(e) => setPackageForm((prev) => ({ ...prev, days: e.target.value }))}
                        placeholder="5 Days / 4 Nights" // Updated placeholder to show string format
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="package-image">Image</Label>
                      <Input
                        id="package-image"
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Option 1: Show preview using URL.createObjectURL
                            setPackageForm((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
                            // Option 2: Upload immediately and set URL (uncomment if you want to upload on select)
                            // const imageUrl = await uploadImage(file);
                            // setPackageForm((prev) => ({ ...prev, image: imageUrl }));
                          } else {
                            setPackageForm((prev) => ({ ...prev, image: "" }));
                          }
                        }}
                      />
                      {typeof packageForm.image === "string" && packageForm.image && (
                        <img src={packageForm.image} alt="Package" className="h-16 mt-2" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="package-short-desc">Short Description</Label>
                    <Input
                      id="package-short-desc"
                      value={packageForm.shortDescription}
                      onChange={(e) => setPackageForm((prev) => ({ ...prev, shortDescription: e.target.value }))}
                      placeholder="Brief description of the package"
                      required
                    />
                  </div>

                  <RichTextEditor
                    label="Detailed Description"
                    value={packageForm.detailedDescription}
                    onChange={(value) => setPackageForm((prev) => ({ ...prev, detailedDescription: value }))}
                    placeholder="Enter detailed package description with itinerary, what to expect, etc."
                  />

                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="mr-2 h-4 w-4" />
                    {editingPackage ? "Update" : "Save"} Package
                  </Button>
                  {editingPackage && (
                    <Button type="button" variant="outline" onClick={() => { setEditingPackage(null); setPackageForm({ title: "", categoryId: "", days: "", shortDescription: "", detailedDescription: "", image: "" }); }}>Cancel Edit</Button>
                  )}
                {/* Package List */}
                <div className="mt-8">
                  <h2 className="font-semibold mb-2">Packages</h2>
                  <ul className="space-y-2">
                    {packages.map(pkg => (
                      <li key={pkg.id} className="flex items-center gap-2">
                        {pkg.image && <img src={pkg.image} alt="" className="h-8 w-8 object-cover rounded" />}
                        <span className="font-medium">{pkg.title}</span>
                        <Button size="sm" variant="outline" onClick={() => handlePackageEdit(pkg)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handlePackageDelete(pkg.id)}><Trash2 className="h-4 w-4" /></Button>
                      </li>
                    ))}
                  </ul>
                </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blogs Tab */}
          <TabsContent value="blogs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Blog Post</CardTitle>
                <CardDescription>Create a new blog post about Sri Lanka</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBlogSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="blog-title">Blog Title</Label>
                      <Input
                        id="blog-title"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Top 10 Must-Visit Places in Sri Lanka"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blog-image">Featured Image</Label>
                      <Input
                        id="blog-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          setBlogForm((prev) => ({
                            ...prev,
                            image: file ? URL.createObjectURL(file) : ""
                          }));
                        }}
                      />
                      {typeof blogForm.image === "string" && blogForm.image && (
                        <img src={blogForm.image} alt="Blog" className="h-16 mt-2" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blog-excerpt">Excerpt</Label>
                    <Input
                      id="blog-excerpt"
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief description of the blog post"
                      required
                    />
                  </div>

                  <RichTextEditor
                    label="Blog Content"
                    value={blogForm.content}
                    onChange={(value) => setBlogForm((prev) => ({ ...prev, content: value }))}
                    placeholder="Write your blog post content here. Use the toolbar to format text, add headings, lists, and more."
                  />


                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="mr-2 h-4 w-4" />
                    {editingBlog ? "Update" : "Publish"} Blog Post
                  </Button>
                  {editingBlog && (
                    <Button type="button" variant="outline" onClick={() => { setEditingBlog(null); setBlogForm({ title: "", excerpt: "", content: "", image: "" }); }}>Cancel Edit</Button>
                  )}
                {/* Blog List */}
                <div className="mt-8">
                  <h2 className="font-semibold mb-2">Blog Posts</h2>
                  <ul className="space-y-2">
                    {blogs.map(blog => (
                      <li key={blog.id} className="flex items-center gap-2">
                        {blog.image && <img src={blog.image} alt="" className="h-8 w-8 object-cover rounded" />}
                        <span className="font-medium">{blog.title}</span>
                        <Button size="sm" variant="outline" onClick={() => handleBlogEdit(blog)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleBlogDelete(blog.id)}><Trash2 className="h-4 w-4" /></Button>
                      </li>
                    ))}
                  </ul>
                </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminPage
// ...existing code...
