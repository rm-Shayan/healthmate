import { Plus, Activity, Sparkles } from "lucide-react";
import Link from "next/link";

interface DashboardGreetingProps {
    userName: string;
}

export default function DashboardGreeting({ userName }: DashboardGreetingProps) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-[#1e40af] to-slate-900 p-6 sm:p-8 md:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] text-white shadow-2xl shadow-blue-500/10 animate-in fade-in slide-in-from-top-8 duration-1000">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-primary opacity-[0.05] rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-10">
                <div className="max-w-2xl text-left">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <div className="px-3 sm:px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                            <Sparkles size={12} className="text-blue-300" />
                            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/60">Health Intelligence Active</span>
                        </div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 tracking-tight leading-none">
                        Welcome back, <br className="hidden sm:block" />
                        <span className="text-blue-200 italic">{userName}</span>
                    </h2>
                    <p className="text-blue-100/60 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-lg">
                        You've stayed active for <span className="text-white font-bold">5 days</span> straight.
                        Let's check your latest insights and continue your wellness journey.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0">
                    <Link href="/reports/upload" className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-white text-blue-900 font-black rounded-2xl sm:rounded-3xl shadow-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95 group text-sm sm:text-base border border-white/20">
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                        UPLOAD REPORT
                    </Link>
                    <Link href="/vitals" className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-white/10 backdrop-blur-sm text-white font-black rounded-2xl sm:rounded-3xl border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest text-xs sm:text-sm">
                        <Activity size={18} />
                        Add Vitals
                    </Link>
                </div>
            </div>
        </section>
    );
}
