"use client";

import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { uploadReportThunk } from "@/redux/feature/report/report.thunk";
import {
    Upload,
    X,
    FileText,
    Calendar,
    Tag,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CATEGORIES = ["General", "Blood Test", "X-Ray", "Prescription", "Ultrasound", "MRI", "CT Scan"];

export default function UploadReportPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.report);
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [category, setCategory] = useState("General");
    const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                alert("File size 10MB se kum honi chahiye.");
                return;
            }
            setFile(selectedFile);
            if (selectedFile.type.startsWith('image/')) {
                setPreview(URL.createObjectURL(selectedFile));
            } else {
                setPreview(null);
            }
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", category);
        formData.append("reportDate", reportDate);

        const resultAction = await dispatch(uploadReportThunk(formData));
        if (uploadReportThunk.fulfilled.match(resultAction)) {
            setUploadSuccess(true);
            toast.success("Medical report uploaded successfully!");
            setTimeout(() => {
                router.push("/reports");
            }, 2000);
        } else {
            toast.error(resultAction.payload as string || "Failed to upload report.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Nayi Report Upload Karein</h1>
                <p className="text-gray-500 font-medium mt-3 text-lg">Aapki report Gemini AI ke zariye mahfooz tareeqay se analyse ki jayegi.</p>
            </div>

            <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-50 border border-gray-100 overflow-hidden">
                <div className="lg:flex">
                    {/* Form Side */}
                    <div className="lg:w-1/2 p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-50">
                        <form onSubmit={handleUpload} className="space-y-8">
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
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={!file || loading || uploadSuccess}
                                    className={`w-full py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl ${!file || loading || uploadSuccess
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100"
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            UPLOADING...
                                        </>
                                    ) : uploadSuccess ? (
                                        <>
                                            <CheckCircle2 size={20} />
                                            SUCCESS!
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={20} />
                                            REPORT SAVE KAREIN
                                        </>
                                    )}
                                </button>
                                {error && <p className="text-red-500 text-xs font-bold mt-4 text-center flex items-center justify-center gap-1">
                                    <AlertCircle size={14} /> {error}
                                </p>}
                            </div>
                        </form>
                    </div>

                    {/* Upload Side */}
                    <div className="lg:w-1/2 bg-gray-50/50 p-10 lg:p-12">
                        <div className="h-full flex flex-col">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-4 block">Report File Select Karein</label>

                            <div className={`flex-grow border-4 border-dashed rounded-[2.5rem] transition-all flex flex-col items-center justify-center p-8 text-center relative ${file
                                ? "border-blue-200 bg-white"
                                : "border-gray-100 hover:border-blue-100 hover:bg-white cursor-pointer group"
                                }`}>
                                {!file ? (
                                    <>
                                        <input
                                            type="file"
                                            accept=".pdf,image/*"
                                            onChange={onFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <Upload size={32} />
                                        </div>
                                        <p className="font-bold text-gray-900">Drag & Drop or Click</p>
                                        <p className="text-gray-400 text-sm mt-2 font-medium">PDF ya Image (Max 10MB)</p>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center">
                                        {preview ? (
                                            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-4 border-white mb-4">
                                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    onClick={() => { setFile(null); setPreview(null); }}
                                                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="w-full py-16 flex flex-col items-center">
                                                <div className="w-24 h-24 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mb-6">
                                                    <FileText size={40} />
                                                </div>
                                                <p className="font-black text-gray-900 truncate max-w-xs">{file.name}</p>
                                                <p className="text-red-500 font-bold text-xs uppercase mt-2 tracking-widest">PDF DOCUMENT</p>
                                                <button
                                                    onClick={() => setFile(null)}
                                                    className="mt-6 text-gray-400 hover:text-red-500 font-bold text-sm underline"
                                                >
                                                    File Remove Karein
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {uploadSuccess && (
                                <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-100 animate-in slide-in-from-top-4 duration-500">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-green-100 shrink-0">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <div>
                                            <p className="text-green-900 font-black">Mubarak Ho!</p>
                                            <p className="text-green-700 font-medium text-sm mt-1">Aapki report upload ho gayi hai. Hum dashboard par wapas ja rahe hain...</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Tip */}
            <div className="mt-12 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-blue-50 shrink-0">
                    🔐
                </div>
                <p className="text-blue-800 font-medium leading-relaxed">
                    Aapka data end-to-end encrypted hai aur Gemini AI sirf analysis ke liye use hota hai. Hum aapki privacy ka mukammal khyal rakhte hain.
                </p>
            </div>
        </div>
    );
}
