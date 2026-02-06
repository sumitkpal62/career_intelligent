"use client"

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "../auth/LoginForm";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { useAuth } from "@/context/AuthContext";

export default function LoginClient() {
    const router = useRouter();
    const {login: saveToken} = useAuth()
    const emailRef = useRef<HTMLInputElement>(null);


    const {login, loading, error} = useAuthFlow((token) => {
        if(emailRef.current) {
            emailRef.current.focus();
        }
        saveToken(token);
        router.push("/analyze")
    });

    const searchParams = useSearchParams();

    const signupSuccess = searchParams.get("signup") === "success";

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

            <LoginForm onSubmit={(email, password) => login({email, password})} loading={loading} error={error} emailRef={emailRef}/>
        </main>
    );
}