import { Heart, Droplets, Weight, Clock } from "lucide-react";
import VitalsChart from "./VitalsChart";

interface VitalsStatsOverviewProps {
    vitals: any[];
}

const VITAL_TYPES = [
    { id: 'BP', label: 'Blood Pressure', icon: Heart, color: '#ef4444', textColor: 'text-red-500', bg: 'bg-red-50', unit: 'mmHg' },
    { id: 'Sugar', label: 'Blood Sugar', icon: Droplets, color: '#f97316', textColor: 'text-orange-500', bg: 'bg-orange-50', unit: 'mg/dL' },
    { id: 'Weight', label: 'Body Weight', icon: Weight, color: '#22c55e', textColor: 'text-green-500', bg: 'bg-green-50', unit: 'kg' },
];

export default function VitalsStatsOverview({ vitals }: VitalsStatsOverviewProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VITAL_TYPES.map((vType: any) => {
                const latest = vitals.find((v: any) => v.type === vType.id);
                return (
                    <div key={vType.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group overflow-hidden flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-14 h-14 ${vType.bg} ${vType.textColor} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <vType.icon size={28} />
                            </div>
                            {latest && (
                                <p className="text-[10px] text-slate-400 font-black flex items-center gap-1 uppercase bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                    <Clock size={12} className="text-slate-300" />
                                    {new Date(latest.readingDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                                </p>
                            )}
                        </div>

                        <p className="text-slate-400 font-black text-xs uppercase tracking-widest mb-1">{vType.label}</p>
                        <h3 className="text-4xl font-black text-slate-900 mb-6">
                            {latest ? `${latest.value}` : '--'}
                            <span className="text-sm font-bold text-slate-400 ml-2 uppercase tracking-tighter">{vType.unit}</span>
                        </h3>

                        <div className="mt-auto h-[120px] -mx-4">
                            <VitalsChart data={vitals} type={vType.id} color={vType.color} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
