"use client";

import { useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { resetPasswordThunk } from "@/redux/feature/auth/auth.thunk";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Lock,
    ArrowRight,
    Loader2,
    AlertCircle,
    Eye,
    EyeOff,
    Sparkles,
    Key,
    Mail
} from "lucide-react";
import Link from "next/link";

function ResetPasswordForm() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const searchParams = useSearchParams();

    const [formData, setFormData] = useState({
        email: searchParams.get("email") || "",
        otp: "",
        newPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(resetPasswordThunk(formData));
        if (resetPasswordThunk.fulfilled.match(resultAction)) {
            router.push("/login");
        }
    };

    return (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-10">
                <div className="w-20 h-20 bg-primary text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/10">
                    <Key size={40} />
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reset Password</h1>
                <p className="text-slate-500 font-medium mt-2">Set your new password below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Mail size={12} /> Email Address
                    </label>
                    <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary font-semibold text-slate-900 placeholder:text-slate-300 outline-none transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Key size={12} /> OTP Code
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="123456"
                        value={formData.otp}
                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary font-black tracking-widest text-center text-slate-900 placeholder:text-slate-300 outline-none transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Lock size={12} /> New Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="••••••••"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary font-semibold text-slate-900 placeholder:text-slate-300 outline-none transition-all pr-14"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            RESETTING...
                        </>
                    ) : (
                        <>
                            UPDATE PASSWORD
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <Link href="/login" className="text-sm font-bold text-slate-400 hover:text-primary transition-colors">
                    Back to Login
                </Link>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center p-20">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
