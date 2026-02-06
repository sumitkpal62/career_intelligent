"use client"

import { useState } from "react"

type Props = {
    onSubmit: (email: string, password: string) => void;
    loading: boolean;
    error: string | null;
    emailRef: React.RefObject<HTMLInputElement | null>;
};

export default function LoginForm({onSubmit, loading, error, emailRef}: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(email, password)
        }} className="space-y-4">
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
    )
}