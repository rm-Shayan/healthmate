import { Calendar, Trash2, FileText, ExternalLink, Edit2 } from "lucide-react";
import Link from "next/link";

interface ReportCardProps {
    report: any;
    onDelete: (id: string) => void;
}

export default function ReportCard({ report, onDelete }: ReportCardProps) {
    return (
        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all group overflow-hidden flex flex-col min-h-[280px] sm:min-h-[320px] relative">

            {/* Top Pattern - Blur decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 opacity-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors"></div>

            <div className="p-5 sm:p-8 flex-grow relative z-10">
                {/* Icon Container */}
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-slate-50 text-primary rounded-xl sm:rounded-[1.2rem] flex items-center justify-center font-bold mb-4 sm:mb-6 border-2 sm:border-4 border-white ring-4 sm:ring-8 ring-slate-50 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-black text-slate-900 line-clamp-2 leading-tight tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {report.fileName}
                </h3>

                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-slate-50 text-slate-500 text-[9px] sm:text-[10px] font-black uppercase rounded-xl border border-slate-100 tracking-wider">
                        {report.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 text-[9px] sm:text-[10px] font-black uppercase tracking-tight">
                        <Calendar size={12} className="text-slate-200" />
                        {new Date(report.reportDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                    </span>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="p-4 px-5 sm:p-6 sm:px-8 bg-slate-50/50 backdrop-blur-sm border-t border-slate-100 flex items-center justify-between mt-auto">
                <Link
                    href={`/reports/${report._id}`}
                    className="flex items-center gap-1.5 text-primary font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:text-blue-800 active:scale-95 transition-all"
                >
                    Review Insights <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px]" />
                </Link>

                <div className="flex items-center gap-2">
                    <Link
                        href={`/reports/edit/${report._id}`}
                        className="p-2 sm:p-2.5 text-slate-300 hover:text-primary hover:bg-slate-100 rounded-xl transition-all"
                        title="Edit Report"
                    >
                        <Edit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </Link>

                    <button
                        onClick={() => onDelete(report._id)}
                        className="p-2 sm:p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Report"
                    >
                        <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                </div>
            </div>
        </div>
    );
}