"use client"

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext"
import { API_BASE_URL } from "@/lib/config";

export default function LoginClient() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const emailRef = useRef<HTMLInputElement>(null);

    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const signupSuccess = searchParams.get("signup") === "success";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            setError("Invalid email or password");
            setPassword("");
            setEmail("")
            setLoading(false);
            emailRef.current?.focus();
            return;
        }

        const data = await res.json();
        login(data.access_token);
        router.push("/analyze")
    };

    return (
        <main className="max-w-md mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-6">Login</h2>

            {signupSuccess && (
                <div className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-sm text-green-700">
                    Account created successfully. Please login.
                </div>
            )}

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailRef}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 text-gray-600 dark:text-gray-200 rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-black text-white py-2 disabled:opacity-60 dark:bg-white dark:text-black rounded-md">
                    Login
                </button>
                
                <p className="text-sm mt-4">
                    Don&apos;t have an account? {" "}
                    <a href="/signup" className="underline">
                        Sign up
                    </a>
                </p>
            </form>
        </main>
    );
}