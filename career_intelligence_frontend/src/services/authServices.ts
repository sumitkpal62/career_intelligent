import { API_BASE_URL } from "@/lib/config";

import {
    SignupPayload,
    LoginPayload,
    LoginResponse,
} from "@/types/auth";

export async function signupUser(payload: SignupPayload) {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });

    if(!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Signup failed");
    }
}

export async function loginUser(
    payload: LoginPayload
): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });

    if(!res.ok) {
        throw new Error("Invalid email or password");
    }

    return res.json();
}