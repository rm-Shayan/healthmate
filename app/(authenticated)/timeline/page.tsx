"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchReportsThunk } from "@/redux/feature/report/report.thunk";
import { fetchVitalsThunk } from "@/redux/feature/vitals/vitals.thunk";
import { Stethoscope, Calendar } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import LoadingState from "@/components/shared/LoadingState";
import TimelineList from "@/components/timeline/TimelineList";

export default function TimelinePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { reports, loading: reportsLoading } = useSelector((state: RootState) => state.report || { reports: [] });
    const { vitals, loading: vitalsLoading } = useSelector((state: RootState) => state.vitals || { vitals: [] });

    useEffect(() => {
        dispatch(fetchReportsThunk({ page: 1, limit: 50 }));
        dispatch(fetchVitalsThunk());
    }, [dispatch]);

    const timelineItems = useMemo(() => {
        const items = [
            ...(Array.isArray(reports) ? reports.map(r => ({ ...r, timelineType: 'report' })) : []),
            ...(Array.isArray(vitals) ? vitals.map(v => ({ ...v, timelineType: 'vital' })) : [])
        ];

        return items.sort((a, b) => {
            const dateA = new Date(a.timelineType === 'report' ? a.reportDate : a.readingDate).getTime();
            const dateB = new Date(b.timelineType === 'report' ? b.reportDate : b.readingDate).getTime();
            return dateB - dateA;
        });
    }, [reports, vitals]);

    const loading = reportsLoading || vitalsLoading;

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="text-center">
                <PageHeader
                    title="Medical Timeline"
                    description="A complete chronological record of your reports and vitals."
                />
            </div>

            {loading && timelineItems.length === 0 ? (
                <LoadingState message="Preparing your timeline..." />
            ) : timelineItems.length > 0 ? (
                <TimelineList items={timelineItems} />
            ) : (
                <EmptyState
                    icon={Calendar}
                    title="Timeline is empty"
                    description="Upload reports or add vitals to build your health timeline."
                />
            )}

            {/* Footer Decoration */}
            <div className="text-center pb-20 pt-10">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-blue-800 font-bold flex items-center gap-2">
                        <Stethoscope size={18} />
                        HealthMate Timeline – Your Continuous Health Record
                    </p>
                </div>
            </div>
        </div>
    );
}
