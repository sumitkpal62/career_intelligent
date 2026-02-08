import { API_BASE_URL } from "@/lib/config";
import { UserInfo, ProgressSummary } from "@/types/dashboard";

export async function fetchUserInfo(token: string | null): Promise<UserInfo> {
    const res = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    if(!res.ok) {
        throw new Error("Failed to load user info");
    }

    return res.json();
}

export async function fetchProgressSummary(token: string | null): Promise<ProgressSummary> {
    const res = await fetch(`${API_BASE_URL}/progress/summary`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    if(!res.ok) {
        throw new Error("Failed to load progress summary");
    }

    return res.json();
}