"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { API_BASE_URL } from "@/lib/config"

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const emailRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        setLoading(false);

        if (!res.ok) {
            const err = await res.json();
            setError(err.detail || "Unable to create account");
            setPassword("");
            setEmail("");
            emailRef.current?.focus();
            return;
        }

        router.push("/login?signup=success");
    }


    return (
        <main className="max-w-md mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-6">Create Account</h2>

            {error && (
                <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 text-gray-600 dark:text-gray-200 rounded-md"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailRef}
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
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>
            </form>
        </main>
    )


}