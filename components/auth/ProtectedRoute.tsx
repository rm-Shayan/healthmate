"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { refreshTokenThunk } from "@/redux/feature/auth/auth.thunk";
import { getCurrentUserThunk } from "@/redux/feature/user/user.thunk";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            // Agar user state mein nahi hai tu refresh token attempt karo
            if (!user) {
                try {
                    const refreshResult = await dispatch(refreshTokenThunk()).unwrap();

                    if (refreshResult) {
                        // Agar refresh success ho gaya tu user profile fetch karo
                        await dispatch(getCurrentUserThunk()).unwrap();
                    } else {
                        router.push("/login");
                    }
                } catch (error) {
                    console.error("Auth check failed:", error);
                    router.push("/login");
                }
            }
            setIsInitializing(false);
        };

        checkAuth();
    }, [user, dispatch, router]);

    // Loading state show karo jab tak initialize ho raha ho ya fetch ho raha ho
    if (isInitializing || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium font-outfit">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Agar authenticated hai tu children render karo
    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
