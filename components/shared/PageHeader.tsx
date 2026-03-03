import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
        icon: LucideIcon;
    };
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-50/50 text-left">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-3">
                    {title}
                </h1>
                <p className="text-slate-400 font-semibold text-sm sm:text-lg max-w-2xl leading-relaxed">
                    {description}
                </p>
            </div>
            {action && (
                <button
                    onClick={action.onClick}
                    className="group px-8 py-5 bg-primary text-white font-black rounded-3xl shadow-2xl shadow-blue-900/10 hover:bg-blue-800 transition-all flex items-center justify-center gap-3 active:scale-95 animate-in fade-in slide-in-from-right-8 duration-1000"
                >
                    <action.icon size={22} className="group-hover:rotate-12 transition-transform" />
                    <span className="uppercase tracking-widest text-xs">{action.label}</span>
                </button>
            )}
        </div>
    );
}
