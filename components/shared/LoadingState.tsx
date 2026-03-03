interface LoadingStateProps {
    message?: string;
}

export default function LoadingState({ message = "Loading..." }: LoadingStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-32 gap-8 animate-in fade-in duration-1000">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-100 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] ml-1">
                {message}
            </p>
        </div>
    );
}
