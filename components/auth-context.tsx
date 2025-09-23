"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
	user: string | null;
	login: (username: string, password: string) => Promise<boolean>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<string | null>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("adminUser");
		if (storedUser) setUser(storedUser);
	}, []);

	const login = async (username: string, password: string) => {
		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (data.success) {
				localStorage.setItem("adminUser", username);
				setUser(username);
				return true;
			} else {
				console.error("Login failed:", data.message);
				return false;
			}
		} catch (error) {
			console.error("Login error:", error);
			return false;
		}
	};

	const logout = () => {
		localStorage.removeItem("adminUser");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
};
