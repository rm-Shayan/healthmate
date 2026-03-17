import GuestRoute from "@/components/auth/GuestRoute";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <GuestRoute>
            <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white flex flex-col justify-center items-center p-6 sm:p-0 overflow-hidden relative">
                {/* Decorative Elements */}
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-3xl" />
                
                <div className="w-full max-w-md relative z-10 transition-all duration-500">
                    {children}
                </div>
            </div>
        </GuestRoute>
    );
}
