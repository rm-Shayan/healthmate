"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchReportsThunk, deleteReportThunk } from "@/redux/feature/report/report.thunk";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import LoadingState from "@/components/shared/LoadingState";
import ReportCard from "@/components/reports/ReportCard";
import ReportFilters from "@/components/reports/ReportFilters";

export default function ReportsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { reports, loading } = useSelector((state: RootState) => state.report);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");

    useEffect(() => {
        dispatch(fetchReportsThunk({ page: 1, limit: 12 }));
    }, [dispatch]);

    const filteredReports = reports.filter(report =>
        report.fileName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "All" || report.category === categoryFilter)
    );

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this report?")) {
            const resultAction = await dispatch(deleteReportThunk(id));
            if (deleteReportThunk.fulfilled.match(resultAction)) {
                toast.success("Report deleted successfully.");
            } else {
                toast.error("Failed to delete report.");
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                title="Medical Reports"
                description="All your medical records securely stored in one place."
                action={{
                    label: "Upload New Report",
                    onClick: () => window.location.href = "/reports/upload",
                    icon: Plus
                }}
            />

            <ReportFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
            />

            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-64 bg-gray-100 rounded-[2rem] animate-pulse"></div>
                    ))}
                </div>
            ) : filteredReports.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredReports.map((report) => (
                        <ReportCard
                            key={report._id}
                            report={report}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon="📭"
                    title="No reports found"
                    description="You haven't uploaded any medical reports yet."
                    action={{
                        label: "Upload your first report",
                        href: "/reports/upload"
                    }}
                />
            )}
        </div>
    );
}
