"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { UserAvatar } from "./UserAvatar";
import { Search, Menu } from "lucide-react";

interface NavbarProps {
    onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);

    // Navigate to profile page
    const handleProfileClick = () => {
        router.push("/profile"); // Change this path if your profile route is different
    };


    return (
        <header className="h-20 sm:h-24 glass border-b border-slate-100 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 md:px-10">

            {/* Mobile Menu & Logo */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-slate-400 hover:text-primary lg:hidden"
                >
                    <Menu size={24} />
                </button>

                {/* Search Bar - Hidden on Mobile */}
                <div className="relative w-64 lg:w-96 group hidden md:block">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-6 py-2.5 font-semibold text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    />
                </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 sm:gap-6 cursor-pointer" onClick={handleProfileClick}>

                <div className="text-right hidden sm:block">
                    <p className="text-sm font-black text-slate-900 leading-none mb-1 uppercase tracking-tight">
                        {user?.name || "Member"}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        HealthMate Pro
                    </p>
                </div>

                {/* Avatar */}
                <UserAvatar user={user} />
            </div>
        </header>
    );
}