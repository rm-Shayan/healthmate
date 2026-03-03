import { Lightbulb, CheckCircle2 } from "lucide-react";

export default function HealthTip() {
    return (
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 p-10 rounded-[3rem] text-white shadow-xl shadow-emerald-500/10 relative overflow-hidden group border border-white/10">
            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                    <Lightbulb size={24} className="text-emerald-200" />
                </div>
                <h4 className="text-2xl font-black mb-4 leading-tight">Daily Wellness Insight</h4>
                <p className="text-emerald-50/80 text-base font-medium leading-relaxed mb-8 italic opacity-90">
                    "Consistent hydration improves cognitive function and maintains skin elasticity. Aim for 8 glasses today!"
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10">
                    <CheckCircle2 size={12} className="text-emerald-300" />
                    Verified by HealthMate AI
                </div>
            </div>

            {/* Abstract Background Shapes */}
            <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>
        </div>
    );
}
