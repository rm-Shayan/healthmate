import { AlertCircle, Zap, ShieldCheck } from "lucide-react";

export default function AiInsightsPromo() {
    return (
        <div className="space-y-6">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 text-primary rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                            <Zap size={24} fill="currentColor" />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 tracking-tight">Smart AI Analysis</h4>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed font-semibold pr-4">
                        Unlock deep insights from your medical records using our advanced Gemini 1.5 Pro engine.
                    </p>

                    <div className="space-y-2">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Processing Power</span>
                            <span className="text-[10px] font-black text-slate-400">98% Optimization</span>
                        </div>
                        <div className="h-3 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100">
                            <div className="h-full bg-gradient-to-r from-primary to-blue-400 w-[98%] rounded-full shadow-inner"></div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-tighter">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        End-to-end encrypted medical data
                    </div>
                </div>
            </div>

            <div className="bg-red-50/50 backdrop-blur-sm p-6 rounded-[2rem] border border-red-100 flex gap-4 ring-4 ring-white shadow-sm">
                <AlertCircle className="text-red-500 shrink-0" size={24} />
                <div>
                    <p className="text-red-900 font-black text-xs uppercase tracking-tight">Medical Disclaimer</p>
                    <p className="text-red-600/80 text-[11px] font-semibold leading-relaxed mt-1 italic">
                        All AI summaries are for informational purposes only. Please consult with a certified medical professional for diagnosis.
                    </p>
                </div>
            </div>
        </div>
    );
}
