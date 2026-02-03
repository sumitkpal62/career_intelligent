"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { API_BASE_URL } from "@/lib/config"

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        if (!res.ok) {
            const err = await res.json();
            alert(err.detail || "Signup Failed");
            return;
        }

        alert("Signup Successful");
        router.push("/login");
    }


    return (
        <main className="max-w-md mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-6">Create Account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 text-gray-600 dark:text-gray-200 rounded-md"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password (min 8 chars"
                    className="w-full border p-2 text-gray-600 dark:text-gray-200 rounded-md"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button disabled={loading} className="w-full bg-black text-white py-2 disabled:opacity-60 dark:bg-white dark:text-black rounded-md">
                    {loading ? "Creating..." : "Sign Up"}
                </button>
            </form>
        </main>
    )


}