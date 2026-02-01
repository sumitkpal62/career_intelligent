"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"
import { API_BASE_URL } from "@/lib/config";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            alert("Invalid credentials");
            return;
        }

        const data = await res.json();
        login(data.access_token);
        router.push("/analyze")
    };

    return (
        <main className="max-w-md mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-6">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 text-gray-600 dark:text-gray-400 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 text-gray-600 dark:text-gray-400 rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-black text-white py-2 text-gray-600 dark:text-gray-400 rounded-md">
                    Login
                </button>
            </form>
        </main>
    );
}