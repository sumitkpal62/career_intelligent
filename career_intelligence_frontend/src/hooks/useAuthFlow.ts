import { useState } from "react";
import {loginUser, signupUser} from "@/services/authServices";
import { LoginPayload, SignupPayload } from "@/types/auth";

export function useAuthFlow(onLoginSuccess: (token: string) => void) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signup = async (payload: SignupPayload) => {
        setLoading(true);
        setError(null);

        try {
            await signupUser(payload);
            return true;
        } catch (err:any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const login = async (payload: LoginPayload) => {
        setLoading(true);
        setError(null);

        try {
            const data = await loginUser(payload);
            onLoginSuccess(data.access_token);
            return true;
        } catch (err:any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        signup,
        login,
        loading,
        error,
    }
}