"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { forgotPasswordThunk } from "@/redux/feature/auth/auth.thunk";
import {
    Mail,
    ArrowRight,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Sparkles,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, forgotPassOtpSent } = useSelector((state: RootState) => state.auth);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(forgotPasswordThunk(email));
    };

    if (forgotPassOtpSent) {
        return (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700 text-center">
                <div className="w-20 h-20 bg-emerald-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-900/10">
                    <CheckCircle2 size={40} />
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">OTP Sent!</h1>
                <p className="text-slate-500 font-medium mt-4 leading-relaxed">
                    We have sent a password reset OTP to your email: <span className="text-primary font-bold">{email}</span>.
                </p>
                <Link
                    href={`/reset-password?email=${encodeURIComponent(email)}`}
                    className="mt-10 w-full py-5 bg-primary text-white font-black rounded-2xl shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                >
                    RESET PASSWORD
                    <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/login" className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-primary transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Forgot Password?</h1>
            </div>

            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-slate-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={32} />
                </div>
                <p className="text-slate-400 font-medium px-4">
                    Don't worry! Enter your email address and we'll send you an OTP to reset your password.
                </p>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary font-semibold text-slate-900 placeholder:text-slate-300 outline-none transition-all"
                    />
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
                            SENDING OTP...
                        </>
                    ) : (
                        <>
                            SEND OTP
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
