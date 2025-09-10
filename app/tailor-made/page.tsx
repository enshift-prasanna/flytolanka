"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
	const ref = useRef<HTMLDivElement | null>(null)
	const [visible, setVisible] = useState(false)
	useEffect(() => {
		if (!ref.current) return
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setVisible(true)
					observer.unobserve(entry.target)
				}
			})
		}, { threshold: 0.15 })
		observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])
	return <div ref={ref} className={`transition-all duration-700 ease-out will-change-transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}>{children}</div>
}

export default function TailorMadePage() {
	const [showScrollTop, setShowScrollTop] = useState(false)
	useEffect(() => {
		const onScroll = () => setShowScrollTop(window.scrollY > 600)
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [])
	const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
			{/* Hero Section */}
			<section className="relative overflow-hidden" id="top">
				<div className="relative h-[420px] lg:h-[500px]">
					<Image
						src="/modern-luxury-car-in-sri-lanka-with-palm-trees-and.png"
						alt="Tailor Made Sri Lanka Tours"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/70" />
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(255,255,255,0.18),transparent_60%)]" />
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(255,255,255,0.12),transparent_55%)]" />
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="container mx-auto px-4 lg:px-24 flex flex-col items-center">
							<Reveal>
								<div className="max-w-3xl text-center text-white mx-auto">
									<div className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm backdrop-blur-sm px-3 py-1.5 rounded-full bg-white/10 border border-white/10 transition-colors mb-5">
										✈️ Tailor-Made Sri Lanka Tours
									</div>
									<h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight tracking-tight text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
										Design Your <span className="text-yellow-300">Perfect Sri Lanka Journey</span>
									</h1>
									<p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
										Tell us your interests, travel style, and preferences—our experts will craft a unique itinerary just for you. No fixed packages, only your dream trip.
									</p>
								</div>
							</Reveal>
						</div>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-white" />
			</section>

			{/* Tailor-Made Tour Request Form */}
			<section className="py-28 relative overflow-hidden">
				<div className="relative container mx-auto px-6">
					<div className="max-w-3xl mx-auto">
						<Reveal className="bg-secondary bg-opacity-95 backdrop-blur-md border border-white/20 rounded-2xl p-8 lg:p-10 shadow-xl">
							<form className="space-y-8">
								{/* Personal Details */}
								<h2 className="text-xl font-semibold text-white mb-2">🧑‍🤝‍🧑 Personal Details</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="name" className="text-white">Name *</Label>
										<Input id="name" type="text" required className="bg-white/80 focus-visible:ring-primary" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="nationality" className="text-white">Nationality</Label>
										<Input id="nationality" type="text" className="bg-white/80 focus-visible:ring-primary" />
									</div>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="email" className="text-white">Email *</Label>
										<Input id="email" type="email" required className="bg-white/80 focus-visible:ring-primary" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="phone" className="text-white">Phone / WhatsApp *</Label>
										<Input id="phone" type="tel" required className="bg-white/80 focus-visible:ring-primary" />
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="contact-method" className="text-white">Preferred Contact Method</Label>
									<Select>
										<SelectTrigger className="bg-white/80 focus:ring-primary">
											<SelectValue placeholder="Select Method" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="email">Email</SelectItem>
											<SelectItem value="whatsapp">WhatsApp</SelectItem>
											<SelectItem value="phone">Phone</SelectItem>
										</SelectContent>
									</Select>
								</div>

								{/* Travel Information */}
								<h2 className="text-xl font-semibold text-white mb-2">📅 Travel Information</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="arrival" className="text-white">Arrival Date *</Label>
										<Input id="arrival" type="date" required className="bg-white/80 focus-visible:ring-primary" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="departure" className="text-white">Departure Date</Label>
										<Input id="departure" type="date" className="bg-white/80 focus-visible:ring-primary" />
									</div>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div className="space-y-2">
										<Label htmlFor="days" className="text-white">Number of Days in Sri Lanka</Label>
										<Input id="days" type="number" min="1" className="bg-white/80 focus-visible:ring-primary" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="adults" className="text-white">Number of Adults</Label>
										<Input id="adults" type="number" min="0" className="bg-white/80 focus-visible:ring-primary" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="children" className="text-white">Number of Children (Age)</Label>
										<Input id="children" type="text" className="bg-white/80 focus-visible:ring-primary" placeholder="e.g. 2 (5, 8 yrs)" />
									</div>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="start" className="text-white">Starting Point</Label>
										<Select>
											<SelectTrigger className="bg-white/80 focus:ring-primary">
												<SelectValue placeholder="Select Starting Point" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="colombo">Colombo</SelectItem>
												<SelectItem value="negombo">Negombo</SelectItem>
												<SelectItem value="airport">Airport</SelectItem>
												<SelectItem value="other">Other</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="end" className="text-white">Ending Point</Label>
										<Select>
											<SelectTrigger className="bg-white/80 focus:ring-primary">
												<SelectValue placeholder="Select Ending Point" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="colombo">Colombo</SelectItem>
												<SelectItem value="negombo">Negombo</SelectItem>
												<SelectItem value="airport">Airport</SelectItem>
												<SelectItem value="other">Other</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								{/* Accommodation Preference */}
								<h2 className="text-xl font-semibold text-white mb-2">🏨 Accommodation Preference</h2>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{["Budget (Guesthouse / 2★)","Standard (3★ / Boutique)","Comfort (4★)","Luxury (5★ / Resorts / Villas)"].map((v,i) => (
										<label key={i} className="flex items-center gap-2 text-white">
											<input type="checkbox" name="accommodation" value={v} className="accent-primary" />
											{v}
										</label>
									))}
								</div>

								{/* Transportation */}
								<h2 className="text-xl font-semibold text-white mb-2">🚗 Transportation</h2>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{["Mini Car & Driver","Sedan Car & Driver","Luxury Car & Driver","SUV & Driver","Van & Driver","Luxury Van & Driver","Mini Coach & Driver","Luxury Coach & Driver"].map((v,i) => (
										<label key={i} className="flex items-center gap-2 text-white">
											<input type="checkbox" name="transport" value={v} className="accent-primary" />
											{v}
										</label>
									))}
								</div>

								{/* Interests & Experiences */}
								<h2 className="text-xl font-semibold text-white mb-2">🌍 Interests & Experiences</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{["Cultural Heritage (Anuradhapura, Polonnaruwa, Sigiriya, Kandy)","Nature & Wildlife (Yala, Wilpattu, Udawalawe, Minneriya)","Beaches (Mirissa, Bentota, Trincomalee, Passikudah)","Hill Country (Nuwara Eliya, Ella, Tea Plantations, Scenic Train)","Adventure (Hiking, Water Sports, White Water Rafting)","Spiritual / Pilgrimage (Buddhist, Hindu, Catholic, Multi-faith)","Ayurveda & Wellness (Yoga, Spa, Healing Retreats)","Photography & Birdwatching Tours","Food & Culinary Experiences","Festivals & Local Events"].map((v,i) => (
										<label key={i} className="flex items-center gap-2 text-white">
											<input type="checkbox" name="interests" value={v} className="accent-primary" />
											{v}
										</label>
									))}
									<div className="space-y-2">
										<Label htmlFor="special-interest" className="text-white">Other Special Interest</Label>
										<Input id="special-interest" type="text" className="bg-white/80 focus-visible:ring-primary" />
									</div>
								</div>

								{/* Meal Plan */}
								<h2 className="text-xl font-semibold text-white mb-2">🍴 Meal Plan</h2>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									{["Bed & Breakfast","Half Board (Breakfast + Dinner)","Full Board (Breakfast, Lunch & Dinner)"].map((v,i) => (
										<label key={i} className="flex items-center gap-2 text-white">
											<input type="checkbox" name="meal" value={v} className="accent-primary" />
											{v}
										</label>
									))}
								</div>

								{/* Budget Range */}
								<h2 className="text-xl font-semibold text-white mb-2">💰 Estimated Budget Range (per person)</h2>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{["USD 50–100 per day","USD 100–200 per day","USD 200–400 per day","USD 400+ per day"].map((v,i) => (
										<label key={i} className="flex items-center gap-2 text-white">
											<input type="checkbox" name="budget" value={v} className="accent-primary" />
											{v}
										</label>
									))}
								</div>

								{/* Special Requests */}
								<h2 className="text-xl font-semibold text-white mb-2">📝 Special Requests</h2>
								<div className="space-y-2">
									<Textarea id="special-requests" rows={4} className="bg-white/80 focus-visible:ring-primary" placeholder="Let us know any special requests, needs, or details..." />
								</div>

								{/* Submit */}
								<div className="pt-2">
									<Button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-6 rounded-full shadow-lg hover:shadow-2xl transition">Submit Your Tailor-Made Request</Button>
									<p className="text-center text-xs text-white/70 mt-3">No advance payment • Fast response • Secure & private</p>
								</div>
							</form>
						</Reveal>
					</div>
				</div>
			</section>
		</div>
	)
}
