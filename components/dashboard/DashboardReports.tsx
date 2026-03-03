import { FileText, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

interface DashboardReportsProps {
    reports: any[];
}

export default function DashboardReports({ reports }: DashboardReportsProps) {
    const recentReports = Array.isArray(reports) ? reports.slice(0, 3) : [];

    return (
        <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                    <FileText className="text-primary" size={24} />
                    Recent Reports
                </h3>
                <Link href="/reports" className="text-primary font-bold hover:text-blue-900 transition-colors flex items-center gap-1 group">
                    View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 divide-y divide-slate-50">
                {recentReports.length > 0 ? (
                    recentReports.map((report: any) => (
                        <Link href={`/reports/${report._id}`} key={report._id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-slate-50 text-primary rounded-2xl flex items-center justify-center font-bold text-xl ring-4 ring-white shadow-sm border border-slate-100">
                                    📄
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{report.fileName}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-lg tracking-wider">{report.category}</span>
                                        <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                                            <Clock size={12} className="text-slate-200" />
                                            {new Date(report.reportDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-2 bg-slate-50 text-primary text-xs font-bold rounded-xl hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 border border-slate-100">
                                    View Summary
                                </button>
                                <ArrowRight size={20} className="text-slate-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="p-10 text-center text-gray-400 font-bold">
                        No reports uploaded yet.
                    </div>
                )}
            </div>
        </div>
    );
}
