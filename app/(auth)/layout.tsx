import GuestRoute from "@/components/auth/GuestRoute";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <GuestRoute>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 sm:p-0">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </GuestRoute>
    );
}
