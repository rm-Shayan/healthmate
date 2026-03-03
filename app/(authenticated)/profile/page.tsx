"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateAccountThunk, updateAvatarThunk, changePasswordThunk } from "@/redux/feature/user/user.thunk";
import {
    User,
    Mail,
    Lock,
    Camera,
    Save,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ShieldCheck
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { toast } from "sonner";

export default function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.auth);

    // Profile State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Password State
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // UI State
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(updateAccountThunk({ name, email }));
        if (updateAccountThunk.fulfilled.match(result)) {
            toast.success("Profile updated successfully!");
        } else {
            toast.error(result.payload as string || "Failed to update profile.");
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }
        const result = await dispatch(changePasswordThunk({ oldPassword, newPassword }));
        if (changePasswordThunk.fulfilled.match(result)) {
            toast.success("Password changed successfully!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } else {
            toast.error(result.payload as string || "Failed to change password.");
        }
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
            const result = await dispatch(updateAvatarThunk(file));
            if (updateAvatarThunk.fulfilled.match(result)) {
                toast.success("Avatar updated successfully!");
                setAvatarPreview(null);
            } else {
                toast.error("Failed to upload avatar.");
                setAvatarPreview(null);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                title="Account Settings"
                description="Manage your profile information, security, and account preferences."
            />


            {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 font-bold">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Avatar & Bio Quick View */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm flex flex-col items-center">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white ring-8 ring-slate-50 shadow-xl relative transition-transform group-hover:scale-105 duration-300">
                                <img
                                    src={avatarPreview || user?.avatar || "https://ui-avatars.com/api/?name=" + (user?.name || "User")}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                                {loading && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                                        <Loader2 className="animate-spin text-primary" size={24} />
                                    </div>
                                )}
                            </div>
                            <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-xl shadow-lg flex items-center justify-center cursor-pointer hover:bg-blue-800 transition-colors border-4 border-white">
                                <Camera size={18} />
                                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                            </label>
                        </div>

                        <div className="text-center mt-6">
                            <h2 className="text-xl font-black text-slate-900">{user?.name}</h2>
                            <p className="text-slate-400 text-sm font-medium">{user?.email}</p>
                        </div>

                        <div className="w-full pt-8 mt-8 border-t border-slate-50 flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-xs font-black text-primary uppercase tracking-widest bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <ShieldCheck size={16} />
                                Verified Member
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Forms */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info Form */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 sm:p-10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <User className="text-slate-900" size={80} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3 relative">
                            <span className="w-8 h-8 bg-slate-50 text-primary rounded-lg flex items-center justify-center"><User size={16} /></span>
                            Basic Information
                        </h3>

                        <form onSubmit={handleUpdateProfile} className="space-y-6 relative">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-slate-900"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-slate-900"
                                        placeholder="Your Email"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-blue-900/10 hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                Update Profile
                            </button>
                        </form>
                    </div>

                    {/* Change Password Form */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 sm:p-10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Lock className="text-slate-900" size={80} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3 relative">
                            <span className="w-8 h-8 bg-slate-50 text-primary rounded-lg flex items-center justify-center"><Lock size={16} /></span>
                            Security & Password
                        </h3>

                        <form onSubmit={handleChangePassword} className="space-y-6 relative">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Old Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                    <input
                                        type="password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-slate-900"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                                    <div className="relative group">
                                        <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-slate-900"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                                    <div className="relative group">
                                        <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-slate-900"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-blue-900/10 hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                Change Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
