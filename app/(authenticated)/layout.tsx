"use client";

import Sidebar from "@/components/shared/Sidebar";
import Navbar from "@/components/shared/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { refreshTokenThunk } from "@/redux/feature/auth/auth.thunk";
import { useRouter } from "next/navigation";
import LoadingState from "@/components/shared/LoadingState";

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated) {
                try {
                    // Try to refresh token if we're not authenticated in Redux
                    const result = await dispatch(refreshTokenThunk()).unwrap();
                    if (!result) {
                        router.push("/login");
                    }
                } catch (error) {
                    console.error("Session restoration failed:", error);
                    router.push("/login");
                }
            }
            setIsCheckingAuth(false);
        };

        checkAuth();
    }, [dispatch, isAuthenticated, router]);

    if (isCheckingAuth || (loading && !isAuthenticated)) {
        return <LoadingState />;
    }

    if (!isAuthenticated && !isCheckingAuth) {
        return null; // Will redirect via router.push
    }

    return (
        <div className="flex min-h-screen bg-white overflow-x-hidden">
            {/* Sidebar with mobile state */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-grow flex flex-col min-w-0">
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto w-full transition-all duration-300">
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}

