import { TrendingUp, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import VitalsChart from "../vitals/VitalsChart";

interface DashboardVitalsProps {
    vitals: any[];
}

export default function DashboardVitals({ vitals }: DashboardVitalsProps) {
    const categories = [
        { id: 'BP', label: 'BP', color: '#ef4444', textColor: 'text-red-500', bg: 'bg-red-50', unit: 'mmHg' },
        { id: 'Sugar', label: 'Sugar', color: '#f97316', textColor: 'text-orange-500', bg: 'bg-orange-50', unit: 'mg/dL' },
        { id: 'Weight', label: 'Weight', color: '#22c55e', textColor: 'text-green-500', bg: 'bg-green-50', unit: 'kg' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <TrendingUp className="text-primary" size={28} />
                        Health Trends
                    </h3>
                    <p className="text-slate-500 font-medium text-sm mt-1">Your recent vitals at a glance</p>
                </div>
                <Link href="/vitals" className="px-6 py-2.5 bg-slate-50 text-slate-900 border border-slate-200 font-black rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2 group shadow-sm">
                    Full Analytics <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {categories.map((cat) => {
                    const latest = (vitals || []).find(v => v.type === cat.id);
                    return (
                        <div key={cat.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-50/50 transition-all flex flex-col h-[280px]">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 ${cat.bg} ${cat.textColor} rounded-2xl flex items-center justify-center`}>
                                    <TrendingUp size={22} />
                                </div>
                                {latest && (
                                    <span className="text-[10px] font-black uppercase text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                                        Last Reading
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">{cat.label}</p>
                            <h4 className="text-3xl font-black text-gray-900 mb-4">
                                {latest ? latest.value : '--'}
                                <span className="text-sm font-medium text-gray-400 ml-1 uppercase">{cat.unit}</span>
                            </h4>

                            <div className="mt-auto h-[100px] -mx-2">
                                <VitalsChart data={vitals || []} type={cat.id as any} color={cat.color} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
