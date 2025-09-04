import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, Share2, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// This would typically come from a database or API
const getBlogPostById = (id: string) => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Must-Visit Places in Sri Lanka",
      excerpt:
        "Discover the most breathtaking destinations that showcase Sri Lanka's natural beauty, rich culture, and ancient heritage.",
      author: "Travel Team",
      publishedAt: "2024-01-15",
      readTime: "8 min read",
      category: "Travel Guide",
      image: "/placeholder.svg?height=500&width=800&text=Top+10+Places",
      featured: true,
      tags: ["destinations", "culture", "heritage"],
      content: `
        <h2>Discover the Pearl of the Indian Ocean</h2>
        <p>Sri Lanka, often called the <strong>"Pearl of the Indian Ocean"</strong>, is a tropical paradise that offers an incredible diversity of experiences within a relatively small area. From ancient temples to pristine beaches, misty mountains to wildlife-rich national parks, this island nation has something for every type of traveler.</p>
        
        <h3>1. Sigiriya Rock Fortress</h3>
        <p>Rising dramatically from the central plains, <em>Sigiriya</em> is perhaps Sri Lanka's most iconic landmark. This ancient rock fortress, built in the 5th century, offers:</p>
        <ul>
          <li><strong>Ancient frescoes</strong> depicting celestial maidens</li>
          <li>The famous <strong>Mirror Wall</strong> with ancient graffiti</li>
          <li>Spectacular panoramic views from the summit</li>
          <li>Well-preserved palace ruins and gardens</li>
        </ul>
        
        <h3>2. Temple of the Sacred Tooth Relic, Kandy</h3>
        <p>Located in the cultural capital of Kandy, this sacred Buddhist temple houses Sri Lanka's most important religious relic. The temple complex features:</p>
        <ul>
          <li>Intricate Kandyan architecture</li>
          <li>Daily prayer ceremonies (puja)</li>
          <li>Beautiful lakeside setting</li>
          <li>Rich cultural performances</li>
        </ul>
        
        <h3>3. Galle Fort</h3>
        <p>This <strong>UNESCO World Heritage Site</strong> is a perfectly preserved colonial fortification that showcases the island's Dutch and Portuguese heritage:</p>
        <ul>
          <li>Cobblestone streets lined with boutique shops</li>
          <li>Historic ramparts perfect for sunset walks</li>
          <li>Charming cafes and restaurants</li>
          <li>Art galleries and museums</li>
        </ul>
        
        <h3>4. Yala National Park</h3>
        <p>Sri Lanka's most famous national park offers the best chance to spot the elusive <em>Sri Lankan leopard</em>:</p>
        <ul>
          <li><strong>Highest leopard density</strong> in the world</li>
          <li>Over 200 bird species</li>
          <li>Elephants, sloth bears, and crocodiles</li>
          <li>Diverse ecosystems from grasslands to lagoons</li>
        </ul>
        
        <h3>5. Ella and the Hill Country</h3>
        <p>The cool, misty hills of central Sri Lanka offer a refreshing escape:</p>
        <ul>
          <li><strong>Nine Arch Bridge</strong> - an engineering marvel</li>
          <li>Little Adam's Peak hike with stunning views</li>
          <li>Tea plantation tours and tastings</li>
          <li>The famous train journey from Kandy to Ella</li>
        </ul>
        
        <h3>6. Polonnaruwa Ancient City</h3>
        <p>This medieval capital showcases some of Sri Lanka's finest ancient architecture:</p>
        <ul>
          <li>Gal Vihara rock sculptures</li>
          <li>Royal Palace complex ruins</li>
          <li>Ancient irrigation systems</li>
          <li>Well-preserved stupas and temples</li>
        </ul>
        
        <h3>7. Mirissa Beach</h3>
        <p>The southern coast's crown jewel offers:</p>
        <ul>
          <li><strong>World-class whale watching</strong> (blue whales and sperm whales)</li>
          <li>Golden sandy beaches with palm trees</li>
          <li>Vibrant nightlife and beach bars</li>
          <li>Fresh seafood and tropical fruits</li>
        </ul>
        
        <h3>8. Dambulla Cave Temple</h3>
        <p>This ancient monastery carved into a massive rock outcrop features:</p>
        <ul>
          <li>Five caves with over 150 Buddha statues</li>
          <li>Ancient murals covering 2,100 square meters</li>
          <li>2,000 years of continuous worship</li>
          <li>Panoramic views of the surrounding countryside</li>
        </ul>
        
        <h3>9. Nuwara Eliya</h3>
        <p>Known as <em>"Little England"</em>, this hill station offers:</p>
        <ul>
          <li>Cool climate year-round</li>
          <li>Colonial architecture and gardens</li>
          <li>World-famous Ceylon tea estates</li>
          <li>Lake Gregory for boating and relaxation</li>
        </ul>
        
        <h3>10. Anuradhapura</h3>
        <p>Sri Lanka's first capital and a sacred city for Buddhists worldwide:</p>
        <ul>
          <li>The sacred <strong>Sri Maha Bodhi tree</strong> - over 2,000 years old</li>
          <li>Massive ancient stupas (dagobas)</li>
          <li>Ruins of palaces and monasteries</li>
          <li>Ancient irrigation tanks and systems</li>
        </ul>
        
        <h2>Planning Your Visit</h2>
        <p>The best time to visit Sri Lanka depends on which coast you plan to explore:</p>
        <ul>
          <li><strong>West and South coasts:</strong> December to March</li>
          <li><strong>East coast:</strong> May to September</li>
          <li><strong>Hill country:</strong> Year-round, but avoid heavy monsoon periods</li>
        </ul>
        
        <h3>Getting Around</h3>
        <p>For the most comfortable and flexible experience, consider hiring a <em>professional driver</em> who can also serve as your local guide. This allows you to:</p>
        <ul>
          <li>Navigate safely on unfamiliar roads</li>
          <li>Learn about local culture and history</li>
          <li>Discover hidden gems off the beaten path</li>
          <li>Enjoy stress-free travel between destinations</li>
        </ul>
        
        <p><strong>Sri Lanka truly offers an incredible diversity of experiences</strong> that can satisfy any traveler's wanderlust. Whether you're seeking adventure, culture, relaxation, or spiritual enlightenment, this beautiful island nation delivers unforgettable memories that will last a lifetime.</p>
      `,
    },
    // Add more blog posts here...
  ]

  return blogPosts.find((post) => post.id === Number.parseInt(id))
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPostById(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-96 lg:h-[500px]">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl text-white">
                <Link href="/sri-lanka" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Articles
                </Link>
                <Badge className="bg-emerald-600 mb-4">{post.category}</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">{post.title}</h1>
                <p className="text-xl text-white/90 mb-6">{post.excerpt}</p>
                <div className="flex items-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>By {post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-lg prose-emerald max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} className="space-y-6" />
              </article>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="font-semibold mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Social Sharing */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-semibold mb-4">Share this article:</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Author Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>About the Author</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium">{post.author}</div>
                        <div className="text-sm text-gray-600">Travel Writer</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Passionate about exploring Sri Lanka's hidden gems and sharing travel experiences with fellow
                      adventurers.
                    </p>
                  </CardContent>
                </Card>

                {/* Related Articles */}
                <Card>
                  <CardHeader>
                    <CardTitle>Related Articles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-b pb-4">
                      <h4 className="font-medium text-sm mb-1">Wildlife Safari Guide</h4>
                      <p className="text-xs text-gray-600">Complete guide to Sri Lanka's national parks</p>
                    </div>
                    <div className="border-b pb-4">
                      <h4 className="font-medium text-sm mb-1">Sri Lankan Cuisine</h4>
                      <p className="text-xs text-gray-600">Explore the flavors of the island</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Ancient Temples</h4>
                      <p className="text-xs text-gray-600">Journey through spiritual heritage</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card>
                  <CardHeader>
                    <CardTitle>Stay Updated</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Get the latest travel tips and destination guides delivered to your inbox.
                    </p>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Subscribe</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
