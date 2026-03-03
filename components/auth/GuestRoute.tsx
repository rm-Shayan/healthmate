"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { refreshTokenThunk } from "@/redux/feature/auth/auth.thunk";

interface GuestRouteProps {
    children: React.ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, user, loading } = useSelector((state: RootState) => state.auth);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            // Agar user authenticated hai tu seedha dashboard bhej do
            if (isAuthenticated) {
                router.push("/dashboard");
                setIsInitializing(false);
                return;
            }

            // Agar user state mein nahi hai tu check karo kahin session exist tu nahi karta (refresh token logic)
            if (!user) {
                try {
                    const result = await dispatch(refreshTokenThunk()).unwrap();
                    if (result) {
                        router.push("/dashboard");
                        return; // Initializing true hi rehne do redirect tak
                    }
                } catch (error) {
                    // Refresh fail matlab waqai guest hai
                    console.log("No active session, staying on guest route.");
                }
            }
            setIsInitializing(false);
        };

        checkAuth();
    }, [isAuthenticated, user, dispatch, router]);

    if (loading || isInitializing) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return !isAuthenticated ? <>{children}</> : null;
};

export default GuestRoute;
