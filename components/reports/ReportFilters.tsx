import { Search, Filter, ChevronDown } from "lucide-react";

interface ReportFiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    categoryFilter: string;
    setCategoryFilter: (value: string) => void;
}

export default function ReportFilters({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter }: ReportFiltersProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="relative lg:col-span-2 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                    type="text"
                    placeholder="Search your records (e.g. Blood Test, Dr. Smith)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-blue-900/5 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-400"
                />
            </div>

            <div className="relative group min-w-[240px]">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none">
                    <Filter size={18} />
                </div>
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full pl-16 pr-12 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-blue-900/5 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-black text-slate-900 appearance-none cursor-pointer uppercase tracking-tight text-xs"
                >
                    <option value="All">All Classifications</option>
                    <option value="Blood Test">Blood Analysis</option>
                    <option value="X-Ray">Radiology / X-Ray</option>
                    <option value="Prescription">Prescriptions</option>
                    <option value="Ultrasound">Sonography</option>
                    <option value="General">General Records</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary transition-all pointer-events-none" size={18} />
            </div>
        </div>
    );
}
