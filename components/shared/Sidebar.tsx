"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logoutUserThunk } from "@/redux/feature/auth/auth.thunk";
import {
    LayoutDashboard,
    FileText,
    Activity,
    History,
    LogOut,
    PlusCircle,
    Shield,
    X,
    User
} from "lucide-react";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Reports", href: "/reports", icon: FileText },
    { label: "Health Vitals", href: "/vitals", icon: Activity },
    { label: "Medical History", href: "/timeline", icon: History },
    { label: "Profile Settings", href: "/profile", icon: User },
];

interface SidebarProps {
    isOpen?: boolean;
    setIsOpen?: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to logout?")) {
            await dispatch(logoutUserThunk());
            router.push("/login");
        }
    };

    return (
        <aside className={`
            fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-slate-100 flex flex-col p-8 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
            {/* Close Button Mobile */}
            <button
                onClick={() => setIsOpen?.(false)}
                className="lg:hidden absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900"
            >
                <X size={24} />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/10">
                    <Shield size={24} />
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tighter">
                    Health<span className="text-primary">Mate</span>
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-grow space-y-2 overflow-y-auto pr-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-4">Main Menu</p>
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen?.(false)}
                            className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group font-bold ${isActive
                                ? "bg-primary text-white shadow-xl shadow-blue-900/10"
                                : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                                }`}
                        >
                            <item.icon size={22} className={isActive ? "" : "group-hover:scale-110 transition-transform"} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Action Card */}
            <div className="mt-auto pt-8">
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 relative overflow-hidden group hidden sm:block">
                    <div className="relative z-10">
                        <p className="text-slate-900 font-extrabold text-sm mb-2 italic lowercase tracking-tight">Got a new report?</p>
                        <Link
                            href="/reports/upload"
                            onClick={() => setIsOpen?.(false)}
                            className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white font-black rounded-xl shadow-md hover:bg-blue-800 transition-all text-xs"
                        >
                            <PlusCircle size={14} />
                            ADD RECORD
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-4 py-4 w-full mt-6 text-slate-400 font-bold hover:text-red-500 transition-colors uppercase text-xs tracking-widest"
                >
                    <LogOut size={18} />
                    <span>Logout Account</span>
                </button>
            </div>
        </aside>
    );
}
