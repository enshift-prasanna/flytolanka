"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Plus, Trash2, Save, Eye, Package, FileText, Users, Car, BarChart3, FolderPlus } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    image: "",
    defaultText: "",
  })

  // Package form state
  const [packageForm, setPackageForm] = useState({
    title: "",
    categoryId: "",
    days: "", // Changed from number to string
    shortDescription: "",
    detailedDescription: "",
    image: "",
  })

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    author: "",
    image: "",
    tags: [] as string[],
    featured: false,
  })

  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag.trim()) {
      setBlogForm((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (index: number) => {
    setBlogForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }))
  }

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Category submitted:", categoryForm)
    alert("Category saved successfully!")
  }

  const handlePackageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Package submitted:", packageForm)
    alert("Package saved successfully!")
  }

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Blog submitted:", blogForm)
    alert("Blog post saved successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your travel packages and blog content</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
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
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+4 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">All operational</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Bookings</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm">New package "Cultural Triangle" added</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Blog post "Top 10 Places" published</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Vehicle "Toyota Camry" updated</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Package
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Blog Post
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    View Website
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
                      <Label htmlFor="category-image">Category Image URL</Label>
                      <Input
                        id="category-image"
                        value={categoryForm.image}
                        onChange={(e) => setCategoryForm((prev) => ({ ...prev, image: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                      />
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
                    Save Category
                  </Button>
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
                          <SelectItem value="1">Cultural Tours</SelectItem>
                          <SelectItem value="2">Adventure Tours</SelectItem>
                          <SelectItem value="3">Beach & Coastal Tours</SelectItem>
                          <SelectItem value="4">Wildlife Safari Tours</SelectItem>
                          <SelectItem value="5">Wellness & Ayurveda</SelectItem>
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
                      <Label htmlFor="package-image">Image URL</Label>
                      <Input
                        id="package-image"
                        value={packageForm.image}
                        onChange={(e) => setPackageForm((prev) => ({ ...prev, image: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                      />
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
                    Save Package
                  </Button>
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
                      <Label htmlFor="blog-category">Category</Label>
                      <Select
                        value={blogForm.category}
                        onValueChange={(value) => setBlogForm((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Travel Guide">Travel Guide</SelectItem>
                          <SelectItem value="Food & Culture">Food & Culture</SelectItem>
                          <SelectItem value="Wildlife">Wildlife</SelectItem>
                          <SelectItem value="Culture">Culture</SelectItem>
                          <SelectItem value="Beaches">Beaches</SelectItem>
                          <SelectItem value="Adventure">Adventure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blog-author">Author</Label>
                      <Input
                        id="blog-author"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm((prev) => ({ ...prev, author: e.target.value }))}
                        placeholder="Author name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blog-image">Featured Image URL</Label>
                      <Input
                        id="blog-image"
                        value={blogForm.image}
                        onChange={(e) => setBlogForm((prev) => ({ ...prev, image: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                      />
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

                  {/* Tags */}
                  <div className="space-y-3">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {blogForm.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          #{tag}
                          <button type="button" onClick={() => removeTag(index)}>
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={blogForm.featured}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, featured: e.target.checked }))}
                      className="rounded"
                    />
                    <Label htmlFor="featured">Mark as featured post</Label>
                  </div>

                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="mr-2 h-4 w-4" />
                    Publish Blog Post
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Packages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Cultural Triangle Explorer</span>
                    <Badge>45 bookings</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Southern Coast Paradise</span>
                    <Badge>38 bookings</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Hill Country Adventure</span>
                    <Badge>32 bookings</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Blog Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Top 10 Must-Visit Places</span>
                    <Badge>2.5k views</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sri Lankan Cuisine Guide</span>
                    <Badge>1.8k views</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Wildlife Safari Guide</span>
                    <Badge>1.6k views</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
