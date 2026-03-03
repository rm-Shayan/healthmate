import { Heart, Droplets, Weight, Activity, X } from "lucide-react";

interface AddVitalModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    formData: any;
    setFormData: (data: any) => void;
    isEditing?: boolean;
}

const VITAL_TYPES = [
    { id: 'BP', label: 'Blood Pressure', icon: Heart, color: 'text-red-500', bg: 'bg-red-50', unit: 'mmHg' },
    { id: 'Sugar', label: 'Blood Sugar', icon: Droplets, color: 'text-orange-500', bg: 'bg-orange-50', unit: 'mg/dL' },
    { id: 'Weight', label: 'Body Weight', icon: Weight, color: 'text-green-500', bg: 'bg-green-50', unit: 'kg' },
];

export default function AddVitalModal({ show, onClose, onSubmit, formData, setFormData, isEditing }: AddVitalModalProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={onClose}></div>
            <div className="bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
                <div className="bg-gradient-to-br from-primary to-blue-900 p-10 text-white relative">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                            <Activity size={24} />
                        </div>
                        <h3 className="text-3xl font-black tracking-tight">{isEditing ? "Edit Health Log" : "Add Health Log"}</h3>
                    </div>
                    <p className="text-blue-100/80 font-bold text-sm ml-16 italic tracking-tight uppercase tracking-widest text-[10px]">Manual Vitals Entry System</p>
                    <button onClick={onClose} className="absolute top-10 right-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all group">
                        <X size={20} className="group-hover:rotate-90 transition-transform" />
                    </button>

                    {/* Decorative */}
                    <div className="absolute -bottom-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
                </div>

                <form onSubmit={onSubmit} className="p-10 space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Vital Category</label>
                            <select
                                value={formData.type}
                                onChange={(e) => {
                                    const vType = VITAL_TYPES.find(t => t.id === e.target.value);
                                    setFormData({ ...formData, type: e.target.value, unit: vType?.unit || '' });
                                }}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 font-black text-slate-900 outline-none transition-all appearance-none cursor-pointer uppercase tracking-tight"
                            >
                                {VITAL_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Reading Value ({formData.unit})</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. 120/80"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 font-black text-slate-900 placeholder:text-slate-300 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Measurement Date</label>
                        <input
                            type="date"
                            required
                            value={formData.readingDate}
                            onChange={(e) => setFormData({ ...formData, readingDate: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 font-black text-slate-900 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Observation Note (Optional)</label>
                        <textarea
                            rows={3}
                            placeholder="How are you feeling during this reading?"
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 focus:ring-4 focus:ring-primary/10 font-bold text-slate-900 placeholder:text-slate-300 outline-none transition-all resize-none shadow-inner"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-primary text-white font-black rounded-3xl shadow-2xl shadow-blue-900/10 hover:bg-blue-800 transition-all active:scale-95 uppercase tracking-widest text-sm"
                    >
                        {isEditing ? "Update Secure Entry" : "Save Secure Entry"}
                    </button>
                </form>
            </div>
        </div>
    );
}
