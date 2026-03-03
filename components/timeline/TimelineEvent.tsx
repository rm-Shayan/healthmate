import { FileText, Heart, Droplets, Weight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface TimelineEventProps {
    item: any;
    index: number;
}

export default function TimelineEvent({ item, index }: TimelineEventProps) {
    const isReport = item.timelineType === 'report';
    const date = new Date(isReport ? item.reportDate : item.readingDate);
    const isEven = index % 2 === 0;

    return (
        <div className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-0 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
            {/* Content Card */}
            <div className={`w-full lg:w-[45%] ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
                <div className={`bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group relative ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className={`flex items-center gap-3 mb-4 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                        {isReport ? (
                            <span className="px-3 py-1 bg-slate-50 text-primary text-[10px] font-black uppercase rounded-lg border border-slate-100/50">Report Analysed</span>
                        ) : (
                            <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg border ${item.type === 'BP' ? 'bg-red-50 text-red-500 border-red-100' :
                                item.type === 'Sugar' ? 'bg-orange-50 text-orange-500 border-orange-100' :
                                    'bg-green-50 text-green-500 border-green-100'
                                }`}>Vitals Entry</span>
                        )}
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 truncate group-hover:text-primary transition-colors">
                        {isReport ? item.fileName : `${item.type}: ${item.value} ${item.unit || ''}`}
                    </h3>

                    {isReport && (
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-4">{item.category}</p>
                    )}

                    {item.note && (
                        <p className="text-slate-500 text-sm italic mb-4 line-clamp-2">"{item.note}"</p>
                    )}

                    <div className={`flex items-center ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                        {isReport ? (
                            <Link
                                href={`/reports/${item._id}`}
                                className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest hover:text-blue-800 transition-all"
                            >
                                View AI Summary <ArrowUpRight size={16} />
                            </Link>
                        ) : (
                            <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">
                                Manual Tracking
                            </span>
                        )}
                    </div>

                    {/* Decorative Pointer */}
                    <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-slate-100 rotate-45 ${isEven ? '-right-2 border-l-0 border-b-0' : '-left-2 border-r-0 border-t-0'}`}></div>
                </div>
            </div>

            {/* Date/Icon Circle */}
            <div className="z-10 flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full border-4 border-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 ${isReport ? 'bg-primary text-white shadow-blue-900/20' :
                    item.type === 'BP' ? 'bg-red-500 text-white' :
                        item.type === 'Sugar' ? 'bg-orange-500 text-white' :
                            'bg-green-500 text-white'
                    }`}>
                    {isReport ? <FileText size={24} /> :
                        item.type === 'BP' ? <Heart size={24} /> :
                            item.type === 'Sugar' ? <Droplets size={24} /> :
                                <Weight size={24} />}
                </div>
                <div className="mt-4 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                    <p className="text-xs font-black text-slate-900 whitespace-nowrap">
                        {date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Spacer for other side */}
            <div className="hidden lg:block w-[45%]"></div>
        </div>
    );
}
