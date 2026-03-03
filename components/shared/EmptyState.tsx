import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
    icon: string | LucideIcon;
    title: string;
    description: string;
    action?: {
        label: string;
        href: string;
    };
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="py-32 bg-slate-50/30 rounded-[4rem] border-2 border-dashed border-slate-100 text-center animate-in fade-in zoom-in-95 duration-700">
            <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 flex items-center justify-center mx-auto mb-8 border border-slate-50 ring-12 ring-slate-50/50">
                {typeof Icon === 'string' ? (
                    <span className="text-5xl">{Icon}</span>
                ) : (
                    <Icon size={44} className="text-primary/20" strokeWidth={1.5} />
                )}
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                {title}
            </h3>
            <p className="text-slate-400 font-semibold max-w-md mx-auto leading-relaxed">
                {description}
            </p>
            {action && (
                <Link
                    href={action.href}
                    className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-white text-primary font-black rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-widest text-[10px]"
                >
                    {action.label}
                </Link>
            )}
        </div>
    );
}
