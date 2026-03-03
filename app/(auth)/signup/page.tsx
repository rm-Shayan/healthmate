"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { registerUserThunk } from "@/redux/feature/auth/auth.thunk";
import { useRouter } from "next/navigation";
import {
    User,
    Mail,
    Lock,
    ArrowRight,
    Loader2,
    AlertCircle,
    Eye,
    EyeOff,
    Sparkles
} from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(registerUserThunk(formData));
        if (registerUserThunk.fulfilled.match(resultAction)) {
            router.push("/dashboard");
        }
    };

    return (
        <div className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-10">
                <div className="w-20 h-20 bg-primary text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/10">
                    <Sparkles size={40} />
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create New Account</h1>
                <p className="text-slate-500 font-medium mt-2">Join HealthMate and take control of your health.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <User size={12} /> Full Name
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary font-semibold text-slate-900 placeholder:text-slate-300 outline-none transition-all"
                    />
                </div>

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
                        <Lock size={12} /> Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                            JOINING...
                        </>
                    ) : (
                        <>
                            SIGN UP
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-10 text-center">
                <p className="text-slate-500 font-medium">
                    Already have an account? {" "}
                    <Link href="/login" title="Login Page" className="text-primary font-black hover:text-blue-900 transition-colors">
                        Login now
                    </Link>
                </p>
            </div>
        </div>
    );
}
