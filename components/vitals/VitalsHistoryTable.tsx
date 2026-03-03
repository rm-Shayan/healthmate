import { TrendingUp, Activity, Calendar, Trash2, Pencil } from "lucide-react";

interface VitalsHistoryTableProps {
    vitals: any[];
    loading: boolean;
    onDelete: (id: string) => void;
    onEdit: (vital: any) => void;
}

export default function VitalsHistoryTable({ vitals, loading, onDelete, onEdit }: VitalsHistoryTableProps) {
    return (
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden">
            <div className="p-6 sm:p-10 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
                        <TrendingUp className="text-primary" size={24} />
                        Historical Tracking
                    </h2>
                    <p className="text-slate-400 font-medium text-[10px] mt-1 uppercase tracking-widest leading-relaxed">Complete record of your health logs</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-widest bg-slate-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-100">
                        {vitals.length} ENTRIES
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left min-w-[800px] lg:min-w-0">
                    <thead>
                        <tr className="bg-slate-50/30">
                            <th className="px-6 sm:px-10 py-6 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">Measurement Type</th>
                            <th className="px-6 sm:px-10 py-6 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">Standard Reading</th>
                            <th className="px-6 sm:px-10 py-6 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">Recorded Date</th>
                            <th className="px-6 sm:px-10 py-6 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">Additional Notes</th>
                            <th className="px-6 sm:px-10 py-6 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50/50">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-10 py-24 text-center">
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="relative">
                                            <div className="w-12 h-12 border-4 border-slate-100 rounded-full"></div>
                                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                                        </div>
                                        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Retrieving Secure Data...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : vitals.length > 0 ? (
                            vitals.map((vital: any) => (
                                <tr key={vital._id} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="px-10 py-7">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${vital.type === 'BP' ? 'bg-red-50 text-red-500' :
                                                vital.type === 'Sugar' ? 'bg-orange-50 text-orange-500' :
                                                    vital.type === 'Weight' ? 'bg-green-50 text-green-500' :
                                                        'bg-slate-50 text-primary'
                                                }`}>
                                                <Activity size={18} />
                                            </div>
                                            <span className="font-black text-slate-900 uppercase tracking-tighter">{vital.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-black text-slate-900 tracking-tighter">{vital.value}</span>
                                            <span className="text-slate-400 text-[10px] font-black uppercase">{vital.unit}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7">
                                        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                            <Calendar size={14} className="text-slate-200" />
                                            {new Date(vital.readingDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 max-w-xs">
                                        <p className="text-slate-400 text-sm font-medium italic line-clamp-1">{vital.note || "--"}</p>
                                    </td>
                                    <td className="px-10 py-7 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button
                                                onClick={() => onEdit(vital)}
                                                className="p-3 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-2xl transition-all"
                                                title="Edit Entry"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(vital._id)}
                                                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                                title="Remove Entry"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-10 py-24 text-center">
                                    <div className="flex flex-col items-center gap-4 opacity-30">
                                        <Activity size={48} className="text-slate-300" />
                                        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">No health records available</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
