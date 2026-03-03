"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchReportByIdThunk } from "@/redux/feature/report/report.thunk";
import { generateInsightThunk, getInsightThunk, askAiThunk } from "@/redux/feature/aiInsught/aiINsight.thunk";
import {
    Plus,
    FileText,
    ArrowLeft,
    ArrowRight,
    BrainCircuit,
    Languages,
    AlertTriangle,
    Stethoscope,
    Sparkles,
    ChevronRight,
    Download,
    MessageSquare,
    Send,
    Loader2,
    CheckCircle2,
    Edit3
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ReportDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedReport, loading: reportLoading } = useSelector((state: RootState) => state.report);
    const { insight, loading: aiLoading, chatHistory, chatLoading } = useSelector((state: RootState) => state.ai || { insight: null, loading: false, chatHistory: [], chatLoading: false });

    const [activeTab, setActiveTab] = useState<'urdu' | 'english'>('english');
    const [question, setQuestion] = useState("");

    useEffect(() => {
        if (id) {
            dispatch(fetchReportByIdThunk(id as string));
            dispatch(getInsightThunk(id as string));
        }
    }, [id, dispatch]);

    const handleAnalyse = () => {
        if (id) dispatch(generateInsightThunk(id as string));
    };

    const handleAskAi = (e: React.FormEvent) => {
        e.preventDefault();
        if (question.trim() && id) {
            dispatch(askAiThunk({ reportId: id as string, userQuestion: question }));
            setQuestion("");
        }
    };

    if (reportLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Fetching Report Details...</p>
            </div>
        );
    }

    if (!selectedReport) {
        return (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
                <p className="text-gray-400 font-bold">Report not found.</p>
                <Link href="/reports" className="text-blue-600 font-bold hover:underline mt-4 inline-block">Back to Reports</Link>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Back & Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/reports" className="p-2 sm:p-3 bg-white border border-gray-100 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-all text-gray-500 hover:text-blue-600 shadow-sm">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight line-clamp-1">{selectedReport.fileName}</h1>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-50 text-blue-600 text-[8px] sm:text-[10px] font-black uppercase rounded-lg border border-blue-100/50">{selectedReport.category}</span>
                            <span className="text-gray-400 text-[10px] sm:text-xs font-medium">{new Date(selectedReport.reportDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href={`/reports/edit/${selectedReport._id}`}
                        className="w-full md:w-auto px-6 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm sm:text-base border border-blue-500"
                    >
                        <Edit3 size={18} />
                        Edit Report
                    </Link>
                    <a
                        href={selectedReport.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto px-6 py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2 active:scale-95 text-sm sm:text-base"
                    >
                        <Download size={18} />
                        View Original File
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
                {/* Main AI Section */}
                <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                    {insight ? (
                        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] border border-gray-100 shadow-2xl shadow-blue-50/20 overflow-hidden flex flex-col h-full">
                            {/* AI Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 sm:p-8 text-white">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center">
                                            <BrainCircuit size={28} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl sm:text-2xl font-black">Smart AI Insight</h2>
                                        </div>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl flex">
                                        <button
                                            onClick={() => setActiveTab('urdu')}
                                            className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'urdu' ? 'bg-white text-blue-600 shadow-lg' : 'text-white/60 hover:text-white'}`}
                                        >
                                            Urdu
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('english')}
                                            className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'english' ? 'bg-white text-blue-600 shadow-lg' : 'text-white/60 hover:text-white'}`}
                                        >
                                            English
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Analysis Content */}
                            <div className="p-6 sm:p-8 space-y-8 sm:space-y-10 flex-grow">
                                {/* Summary Section */}
                                <section className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-gray-900 font-extrabold uppercase tracking-widest text-[10px]">
                                        <Languages size={14} className="text-blue-600" />
                                        Medical Summary
                                    </h3>
                                    <div className="bg-blue-50/50 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-blue-50 relative">
                                        <p className={`text-lg sm:text-xl leading-relaxed text-gray-800 font-semibold ${activeTab === 'urdu' ? 'text-right leading-loose' : 'text-left'}`}>
                                            {activeTab === 'urdu' ? insight.summaryUrdu : insight.summaryEnglish}
                                        </p>
                                        <Sparkles className="absolute -top-3 -right-3 text-blue-400 hidden sm:block" size={32} />
                                    </div>
                                </section>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                    {/* Abnormal Values */}
                                    <section className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-red-600 font-extrabold uppercase tracking-widest text-[10px]">
                                            <AlertTriangle size={14} />
                                            At Risk / Abnormal
                                        </h3>
                                        <div className="space-y-3">
                                            {insight.abnormalValues?.map((item: string, i: number) => (
                                                <div key={i} className="flex items-start gap-3 bg-red-50 p-4 rounded-xl sm:rounded-2xl border border-red-100">
                                                    <CheckCircle2 size={16} className="text-red-500 mt-0.5 shrink-0" />
                                                    <p className="text-red-900 font-bold text-xs sm:text-sm">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Doctor Questions */}
                                    <section className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-purple-600 font-extrabold uppercase tracking-widest text-[10px]">
                                            <Stethoscope size={14} />
                                            Questions for the Doctor
                                        </h3>
                                        <div className="space-y-3">
                                            {insight.doctorQuestions?.map((item: string, i: number) => (
                                                <div key={i} className="flex items-start gap-3 bg-purple-50 p-4 rounded-xl sm:rounded-2xl border border-purple-100">
                                                    <MessageSquare size={16} className="text-purple-500 mt-0.5 shrink-0" />
                                                    <p className="text-purple-900 font-bold text-xs sm:text-sm">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                {/* Suggestions */}
                                <section className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-green-600 font-extrabold uppercase tracking-widest text-[10px]">
                                        <Sparkles size={14} />
                                        Lifestyle Suggestions
                                    </h3>
                                    <div className="p-6 sm:p-8 bg-green-50 rounded-[1.5rem] sm:rounded-[2rem] border border-green-100">
                                        <p className="text-green-900 font-bold text-sm sm:text-base leading-relaxed">{insight.suggestions}</p>
                                    </div>
                                </section>
                            </div>

                            {/* Disclaimer */}
                            <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                    <AlertTriangle size={12} className="text-red-400" />
                                    AI is for understanding only. Not medical advice.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-20 text-center space-y-6">
                            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto transition-all group hover:scale-110">
                                {aiLoading ? (
                                    <Loader2 size={48} className="animate-spin" />
                                ) : (
                                    <BrainCircuit size={48} />
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Start AI Analysis</h2>
                                <p className="text-gray-500 font-medium max-w-sm mx-auto mt-2">
                                    Gemini AI will explain your report in simple terms. This may take 30-40 seconds.
                                </p>
                            </div>
                            <button
                                onClick={handleAnalyse}
                                disabled={aiLoading}
                                className={`px-10 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center gap-3 mx-auto ${aiLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                            >
                                {aiLoading ? (
                                    <>SYSTEM ANALYSING...</>
                                ) : (
                                    <>START AI ANALYSIS <ArrowRight size={20} /></>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Sidebar: Chat & Preview */}
                <div className="lg:col-span-2 space-y-10">
                    {/* AI Follow-up Chat */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[600px]">
                        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                                <MessageSquare size={20} />
                            </div>
                            <h3 className="font-black text-gray-800">Smart Health AI Assistant</h3>
                        </div>

                        <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-gray-50/30">
                            <div className="bg-purple-600 text-white p-4 rounded-2xl rounded-tl-none font-bold text-sm max-w-[85%] shadow-md">
                                Hello! I am HealthMate AI. Do you have any specific questions about this report?
                            </div>

                            {chatHistory.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-4 rounded-2xl font-bold text-sm max-w-[85%] shadow-sm ${msg.role === 'user'
                                        ? 'bg-white text-gray-900 rounded-tr-none border border-gray-100'
                                        : 'bg-purple-600 text-white rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {chatLoading && (
                                <div className="flex justify-start">
                                    <div className="p-4 bg-purple-600 text-white rounded-2xl rounded-tl-none font-bold text-sm flex gap-2">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleAskAi} className="p-4 bg-white border-t border-gray-100 flex gap-3 animate-in fade-in duration-700">
                            <input
                                type="text"
                                placeholder="Have a question about your report?"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="flex-grow bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-purple-100 font-bold outline-none text-black placeholder:text-slate-400 text-sm transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!question.trim() || chatLoading || !insight}
                                className="px-6 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-all disabled:opacity-30 flex items-center justify-center shadow-xl shadow-purple-50 active:scale-95"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </div>

                    {/* File Preview Thumbnail */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <h3 className="font-black text-gray-800 flex items-center gap-2">
                            <FileText size={20} className="text-blue-600" />
                            Report Preview
                        </h3>
                        <div className="aspect-[4/5] bg-gray-50 rounded-[2rem] overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center relative group">
                            {selectedReport.fileType === 'pdf' ? (
                                <iframe
                                    src={`${selectedReport.fileUrl}#toolbar=0`}
                                    className="w-full h-full border-none"
                                    title="PDF Preview"
                                />
                            ) : (
                                <img src={selectedReport.fileUrl} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                            )}
                            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all flex items-center justify-center">
                                <a
                                    href={selectedReport.fileUrl}
                                    target="_blank"
                                    className="px-6 py-3 bg-white text-blue-600 font-black rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0"
                                >
                                    VIEW FULL IMAGE
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
