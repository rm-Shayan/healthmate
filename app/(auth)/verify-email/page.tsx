"use client";

import { useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { verifyEmailThunk } from "@/redux/feature/auth/auth.thunk";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ShieldCheck,
    ArrowRight,
    Loader2,
    AlertCircle,
    Sparkles,
    Mail
} from "lucide-react";
import Link from "next/link";

function VerifyEmailForm() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const searchParams = useSearchParams();

    const [otp, setOtp] = useState("");
    const email = searchParams.get("email") || "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        const resultAction = await dispatch(verifyEmailThunk({ email, otp }));
        if (verifyEmailThunk.fulfilled.match(resultAction)) {
            router.push("/login");
        }
    };

    return (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-10">
                <div className="w-20 h-20 bg-primary text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/10">
                    <ShieldCheck size={40} />
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Verify Account</h1>
                <p className="text-slate-500 font-medium mt-2">We have sent a 6-digit OTP to your email address.</p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-100">
                    <Mail size={12} /> {email}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 text-center block">
                        Enter 6-Digit Code
                    </label>
                    <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary font-bold tracking-[1em] text-center text-2xl text-slate-900 placeholder:text-slate-300 outline-none transition-all"
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
                    disabled={loading || otp.length < 6}
                    className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            VERIFYING...
                        </>
                    ) : (
                        <>
                            VERIFY & CONTINUE
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-10 text-center">
                <p className="text-slate-500 font-medium text-sm">
                    Didn't receive the OTP? {" "}
                    <button className="text-primary font-black hover:text-blue-900 transition-colors disabled:opacity-30">
                        Resend
                    </button>
                </p>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center p-20">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        }>
            <VerifyEmailForm />
        </Suspense>
    );
}
