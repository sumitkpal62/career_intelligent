import { useEffect, useState } from "react";
import { fetchUserInfo, fetchProgressSummary } from "@/services/dashboardService";
import { UserInfo, ProgressSummary } from "@/types/dashboard";

export function useDashboard(token: string | null) {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [progress, setProgress] = useState<ProgressSummary | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if(!token) return;

        async function load() {
            try {
                const [userData, progressData] = await Promise.all([
                    fetchUserInfo(token),
                    fetchProgressSummary(token),
                ]);

                setUser(userData);
                setProgress(progressData);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [token]);

    return {user, progress, loading};
}