"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-context";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
	const { user, login } = useAuth();
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	// Redirect to /admin if already logged in
	useEffect(() => {
		if (user) {
			router.replace("/admin");
		}
	}, [user, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		const success = await login(username, password);
		setLoading(false);
		if (success) {
			router.push("/admin");
		} else {
			setError("Invalid credentials");
		}
	};

	// Don't render login form if already logged in
	if (user) return null;

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
				<h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
				<div className="mb-4">
					<Input
						type="text"
						placeholder="Username"
						value={username}
						onChange={e => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className="mb-4 relative">
					<Input
						type={showPassword ? "text" : "password"}
						placeholder="Password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
						className="pr-10"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
					>
						{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
					</button>
				</div>
				{error && <div className="text-red-500 mb-4 text-center">{error}</div>}
				<Button type="submit" disabled={loading} className="w-full">
					{loading ? "Logging in..." : "Login"}
				</Button>
			</form>
		</div>
	);
}
