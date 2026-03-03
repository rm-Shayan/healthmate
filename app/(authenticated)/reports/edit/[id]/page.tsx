"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchReportByIdThunk, updateReportThunk } from "@/redux/feature/report/report.thunk";
import {
    Calendar,
    Tag,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ArrowLeft,
    Save
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const CATEGORIES = ["General", "Blood Test", "X-Ray", "Prescription", "Ultrasound", "MRI", "CT Scan"];

export default function EditReportPage() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedReport, loading, error } = useSelector((state: RootState) => state.report);
    const router = useRouter();

    const [fileName, setFileName] = useState("");
    const [category, setCategory] = useState("General");
    const [reportDate, setReportDate] = useState("");
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchReportByIdThunk(id as string));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (selectedReport) {
            setFileName(selectedReport.fileName);
            setCategory(selectedReport.category);
            setReportDate(new Date(selectedReport.reportDate).toISOString().split('T')[0]);
        }
    }, [selectedReport]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        const resultAction = await dispatch(updateReportThunk({
            id: id as string,
            data: { fileName, category, reportDate }
        }));

        if (updateReportThunk.fulfilled.match(resultAction)) {
            setUpdateSuccess(true);
            toast.success("Report details updated!");
            setTimeout(() => {
                router.push(`/reports/${id}`);
            }, 2000);
        } else {
            toast.error(resultAction.payload as string || "Failed to update report.");
        }
    };

    if (loading && !selectedReport) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Report...</p>
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
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex items-center gap-4 mb-8">
                <Link href={`/reports/${id}`} className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all text-gray-500 hover:text-blue-600 shadow-sm">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Report Edit Karein</h1>
                    <p className="text-gray-500 font-medium mt-1">Report ki details update karein.</p>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-50 border border-gray-100 overflow-hidden">
                <div className="p-10 lg:p-12">
                    <form onSubmit={handleUpdate} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                File Name
                            </label>
                            <input
                                type="text"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 font-bold text-gray-900 outline-none transition-all"
                                placeholder="Report ka naam"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Tag size={12} /> Category
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setCategory(cat)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${category === cat
                                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                                            : "bg-gray-50 text-gray-500 border-gray-100 hover:border-blue-200"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Calendar size={12} /> Test Ki Tareekh (Date)
                            </label>
                            <input
                                type="date"
                                value={reportDate}
                                onChange={(e) => setReportDate(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 font-black text-black outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading || updateSuccess}
                                className={`w-full py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl ${loading || updateSuccess
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100"
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        UPDATING...
                                    </>
                                ) : updateSuccess ? (
                                    <>
                                        <CheckCircle2 size={20} />
                                        UPDATED SUCCESSFULLY!
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        CHANGES SAVE KAREIN
                                    </>
                                )}
                            </button>
                            {error && <p className="text-red-500 text-xs font-bold mt-4 text-center flex items-center justify-center gap-1">
                                <AlertCircle size={14} /> {error}
                            </p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
