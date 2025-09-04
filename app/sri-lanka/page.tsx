import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Must-Visit Places in Sri Lanka",
    excerpt:
      "Discover the most breathtaking destinations that showcase Sri Lanka's natural beauty, rich culture, and ancient heritage.",
    content: "From pristine beaches to ancient temples...",
    author: "Travel Team",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    category: "Travel Guide",
    image: "/placeholder.svg?height=400&width=600&text=Top+10+Places",
    featured: true,
    tags: ["destinations", "culture", "heritage"],
  },
  {
    id: 2,
    title: "Sri Lankan Cuisine: A Culinary Journey",
    excerpt:
      "Explore the rich flavors and spices that make Sri Lankan cuisine one of the world's most distinctive and delicious.",
    content: "Sri Lankan cuisine is a symphony of flavors...",
    author: "Food Explorer",
    publishedAt: "2024-01-12",
    readTime: "6 min read",
    category: "Food & Culture",
    image: "/placeholder.svg?height=400&width=600&text=Sri+Lankan+Cuisine",
    featured: false,
    tags: ["food", "spices", "culture"],
  },
  {
    id: 3,
    title: "Wildlife Safari Guide: Best National Parks",
    excerpt:
      "Your complete guide to Sri Lanka's incredible wildlife and the best national parks for unforgettable safari experiences.",
    content: "Sri Lanka is home to diverse wildlife...",
    author: "Wildlife Expert",
    publishedAt: "2024-01-10",
    readTime: "10 min read",
    category: "Wildlife",
    image: "/placeholder.svg?height=400&width=600&text=Wildlife+Safari",
    featured: true,
    tags: ["wildlife", "safari", "national parks"],
  },
  {
    id: 4,
    title: "Ancient Temples and Sacred Sites",
    excerpt: "Journey through Sri Lanka's spiritual heritage with visits to ancient temples and sacred Buddhist sites.",
    content: "The spiritual landscape of Sri Lanka...",
    author: "Cultural Guide",
    publishedAt: "2024-01-08",
    readTime: "7 min read",
    category: "Culture",
    image: "/placeholder.svg?height=400&width=600&text=Ancient+Temples",
    featured: false,
    tags: ["temples", "buddhism", "heritage"],
  },
  {
    id: 5,
    title: "Beach Paradise: Southern Coast Gems",
    excerpt: "Discover the pristine beaches and coastal attractions along Sri Lanka's stunning southern coastline.",
    content: "The southern coast of Sri Lanka...",
    author: "Beach Explorer",
    publishedAt: "2024-01-05",
    readTime: "5 min read",
    category: "Beaches",
    image: "/placeholder.svg?height=400&width=600&text=Southern+Beaches",
    featured: false,
    tags: ["beaches", "coast", "relaxation"],
  },
  {
    id: 6,
    title: "Hill Country Adventures: Tea and Trains",
    excerpt:
      "Experience the cool climate and scenic beauty of Sri Lanka's hill country, famous for tea plantations and train rides.",
    content: "The hill country of Sri Lanka...",
    author: "Adventure Guide",
    publishedAt: "2024-01-03",
    readTime: "9 min read",
    category: "Adventure",
    image: "/placeholder.svg?height=400&width=600&text=Hill+Country",
    featured: true,
    tags: ["hills", "tea", "trains"],
  },
]

const categories = ["All", "Travel Guide", "Food & Culture", "Wildlife", "Culture", "Beaches", "Adventure"]

export default function SriLankaPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">Discover Sri Lanka</h1>
            <p className="text-xl text-gray-600 mb-8 text-pretty">
              Explore the Pearl of the Indian Ocean through our comprehensive travel guides, cultural insights, and
              insider tips to make your Sri Lankan adventure unforgettable.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search articles..." className="pl-10 pr-4 py-3 text-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={category === "All" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Articles</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-emerald-600">{post.category}</Badge>
                  <Badge className="absolute top-4 right-4 bg-orange-500">Featured</Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>

                  <div className="flex items-center justify-between text-sm text-gray-600 pt-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/sri-lanka/${post.id}`}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-emerald-600">{post.category}</Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>

                  <div className="flex items-center justify-between text-sm text-gray-600 pt-2">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/sri-lanka/${post.id}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest travel tips, destination guides, and exclusive offers for Sri
            Lanka.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input placeholder="Enter your email" className="bg-white" />
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 whitespace-nowrap">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
