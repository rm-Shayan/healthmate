"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchReportsThunk } from "@/redux/feature/report/report.thunk";
import { fetchVitalsThunk } from "@/redux/feature/vitals/vitals.thunk";
import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import DashboardVitals from "@/components/dashboard/DashboardVitals";
import DashboardReports from "@/components/dashboard/DashboardReports";
import HealthTip from "@/components/dashboard/HealthTip";
import AiInsightsPromo from "@/components/dashboard/AiInsightsPromo";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { reports, loading: reportsLoading } = useSelector((state: RootState) => state.report || { reports: [] });
  const { vitals, loading: vitalsLoading } = useSelector((state: RootState) => state.vitals || { vitals: [] });

  useEffect(() => {
    setMounted(true);
    dispatch(fetchReportsThunk({ page: 1, limit: 5 }));
    dispatch(fetchVitalsThunk());
  }, [dispatch]);

  const userName = user?.name?.split(' ')[0] || "Friend";

  if (!mounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <DashboardGreeting userName={userName} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
        <div className="lg:col-span-2 space-y-10">
          <DashboardVitals vitals={vitals} />
          <DashboardReports reports={reports} />
        </div>

        <div className="space-y-8">
          <HealthTip />
          <AiInsightsPromo />
        </div>
      </div>
    </div>
  );
}
