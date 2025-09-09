"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-context";

export default function AdminLogin() {
	const { login } = useAuth();
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

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
				<div className="mb-4">
					<Input
						type="password"
						placeholder="Password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>
				{error && <div className="text-red-500 mb-4 text-center">{error}</div>}
				<Button type="submit" disabled={loading} className="w-full">
					{loading ? "Logging in..." : "Login"}
				</Button>
			</form>
		</div>
	);
}
